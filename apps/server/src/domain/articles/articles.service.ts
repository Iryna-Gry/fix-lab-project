import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';

import { Article, Image } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import {
  createArticleSchema,
  outputArticleSchema,
  outputArticleWithPaginationSchema,
  paginationArticleSchema,
  updateArticleSchema
} from './schemas/article.schema';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  public async findAll(): Promise<outputArticleSchema[]> {
    return await this.prisma.article.findMany({
      include: {
        image: true
      }
    });
  }

  public async findWithPagination({
    page = 1,
    limit = 1000000
  }: paginationArticleSchema): Promise<outputArticleWithPaginationSchema> {
    const result = {
      itemsCount: 0,
      totalItems: 0,
      totalPages: 0,
      rangeStart: 0,
      rangeEnd: 0,
      items: [] as (Article & { image: Image })[]
    };

    const totalArticles = await this.prisma.article.findMany();

    result.totalItems = totalArticles.length;
    result.totalPages = Math.ceil(totalArticles.length / limit);

    const articles = await this.prisma.article.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: limit * (page - 1),
      include: {
        image: true
      }
    });

    result.items = articles;
    result.itemsCount = articles.length;
    result.rangeStart = articles.length ? limit * (page - 1) : 0;
    result.rangeEnd = articles.length ? result.rangeStart + result.itemsCount : 0;

    return result;
  }

  public async findBySlug(query: string): Promise<outputArticleSchema> {
    const article = await this.prisma.article.findUnique({
      where: {
        slug: query
      },
      include: {
        image: true
      }
    });
    if (!article) {
      throw new NotFoundException(`Article with slug "${query}" was not found`);
    }

    return article;
  }

  public async findById(id: string): Promise<outputArticleSchema> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const article = await this.prisma.article.findUnique({
      where: {
        id
      },
      include: {
        image: true
      }
    });

    if (!article) {
      throw new NotFoundException(`Article with ID "${id}" was not found`);
    }

    return article;
  }

  public async create(dto: createArticleSchema): Promise<outputArticleSchema> {
    const foundArticle = await this.prisma.article.findUnique({
      where: {
        slug: dto.slug
      }
    });

    if (foundArticle) {
      throw new BadRequestException(
        `Article with slug "${dto.slug}" already exists`
      );
    }

    const createdArticle = await this.prisma.article.create({
      data: dto
    });
    const article = await this.findById(createdArticle.id);

    return article;
  }

  public async update(dto: updateArticleSchema): Promise<outputArticleSchema> {
    const { id, ...newData } = dto;

    await this.findById(id as string);

    const article = await this.prisma.article.update({
      where: { id },
      data: newData,
      include: { image: true }
    });

    return article;
  }

  public async remove(id: string): Promise<string> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const article = await this.prisma.article.delete({ where: { id } });

    if (!article) {
      throw new NotFoundException(`Article with ID ${id} was not found`);
    }

    return id;
  }
}