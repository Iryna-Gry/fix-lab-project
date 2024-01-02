import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';

import { PrismaService } from '../prisma/prisma.service';

import {
  createBenefitSchema,
  outputBenefitSchema,
  updateBenefitSchema
} from './schemas/benefit.schema';

@Injectable()
export class BenefitsService {
  constructor(private prisma: PrismaService) {}

  public async findAll(): Promise<outputBenefitSchema[]> {
    return await this.prisma.benefit.findMany({
      include: { icon: true }
    });
  }

  public async findActive(): Promise<outputBenefitSchema[]> {
    return await this.prisma.benefit.findMany({
      where: { isActive: true },
      include: { icon: true }
    });
  }

  public async findById(id: string): Promise<outputBenefitSchema> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const benefit = await this.prisma.benefit.findUnique({
      where: { id },
      include: { icon: true }
    });

    if (!benefit) {
      throw new NotFoundException(`Brand with ID "${id}" was not found`);
    }

    return benefit;
  }

  public async create(data: createBenefitSchema): Promise<createBenefitSchema> {
    const foundBenefit = await this.prisma.benefit.findFirst({
      where: { title: data.title }
    });

    if (foundBenefit) {
      throw new BadRequestException(
        `Benefit with slug "${data.title}" already exists`
      );
    }
    const createdBenefit = await this.prisma.benefit.create({ data });
    const benefit = await this.findById(createdBenefit.id);

    return benefit;
  }

  public async update(data: updateBenefitSchema): Promise<updateBenefitSchema> {
    const { id, ...newData } = data;
    const benefit = await this.findById(id);

    if (!benefit) {
      throw new NotFoundException(`Benefit with ID ${id} was not found`);
    }

    const updatedBenefit = await this.prisma.benefit.update({
      where: { id },
      data: newData
    });

    return updatedBenefit;
  }

  public async remove(id: string): Promise<string> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const benefit = await this.prisma.benefit.delete({ where: { id } });

    if (!benefit) {
      throw new NotFoundException(`Benefit with ID ${id} was not found`);
    }

    return id;
  }
}
