import { useKeenSlider } from 'keen-slider/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { useWindowSize } from '@/app/(hooks)/useWindowResize'

import { CategoriesList } from './CategoriesList'
import type { CategoriesSectionProps, CategoryItem } from './CategoriesSection'

export const CategoriesSlider: React.FC<CategoriesSectionProps> = ({
  categoryData,
}) => {
  const [ref] = useKeenSlider<HTMLDivElement>({
    slides: { perView: 1.13, spacing: 16 },
  })
  const size = useWindowSize()

  return size.width > 767 ? (
    <CategoriesList categoryData={categoryData} />
  ) : (
    <div className='navigation-wrapper'>
      <div ref={ref} className='keen-slider'>
        {categoryData.data.map((item: CategoryItem) => {
          const categoryPath = item.attributes.slug
          const img = item.attributes.img.data.attributes.url
          const { width } = item.attributes.img.data.attributes
          const { height } = item.attributes.img.data.attributes
          return (
            <Link
              key={item.id}
              href={`/repair/${categoryPath}`}
              className='keen-slider__slide flex h-[261px] flex-col justify-between rounded-2xl bg-dark-blue p-8'
            >
              <Image
                className='ml-auto'
                src={img}
                width={width}
                height={height}
                alt={item.attributes.title}
              />
              <h3 className='mr-auto font-exo_2 text-xl font-semibold text-white-dis'>
                {item.attributes.title}
              </h3>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
