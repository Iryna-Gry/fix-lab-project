'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { phoneParse } from '@/app/(utils)/phoneParse'
import { type Location } from '@/app/(utils)/types'

export const AddressLocationCard: React.FC<Location> = item => {
  return (
    <li
      key={item.id}
      className='group mb-8 flex h-[286px] w-full justify-between overflow-hidden rounded-xl bg-card-gradient-blue text-base hover:bg-card-gradient-hover lg:mb-0 lg:h-[240px] xl:h-[265px]'
    >
      <div className='flex w-full flex-col justify-between pb-9 pl-8 pr-3 pt-10 text-white-dis transition delay-75 duration-300 ease-in-out group-hover:translate-x-6 group-hover:scale-110 lg:group-hover:translate-x-0 xl:group-hover:translate-x-4'>
        <h3 className='font-exo_2 text-xl font-semibold'>{item.title}</h3>
        <div className='max-w-[210px]'>
          <p className='mb-2 font-medium leading-7 tracking-wider text-[#f8fcffe0]'>
            {item.address}
          </p>
          <a
            href={`tel:${item.phone}`}
            className='cursor-pointer font-medium leading-7 tracking-wider text-[#01CC74]'
          >
            {phoneParse(item.phone)}
          </a>
        </div>
        <a
          href={item.mapLink}
          className='w-fit cursor-pointer border-b-[2px] border-b-white-dis font-semibold tracking-wider lg:hidden'
        >
          Подивитися на мапі
        </a>
      </div>
      <Link
        className='hidden w-full cursor-pointer overflow-hidden rounded-xl md:block'
        href={item.mapLink}
        target='_blank'
      >
        <Image
          className='bg-cover bg-center aspect-square lg:aspect-[1/1.05]'
          src={item.imageLink}
          alt={item.title}
          width={600}
          height={546}
        />
      </Link>
    </li>
  )
}
