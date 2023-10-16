/* eslint-disable no-underscore-dangle */
import Image from 'next/image'
import Link from 'next/link'

import type { IGadgetsProps } from '@/app/(layouts)'
import type { IGadget } from '@/app/(server)/api/service/modules/gadgetService'

export const GadgetsList: React.FC<IGadgetsProps> = ({ gadgetsData }) => {
  return (
    <ul className='z-10 flex w-[954px] flex-wrap gap-2 xl:gap-6'>
      {gadgetsData.map((item: IGadget) => {
        return (
          <li
            key={item._id}
            className='hover-gadget-link h-[261px] w-[302px] rounded-2xl bg-card-repair-gradient md:w-[calc((100%-32px)/3)] xl:w-[calc((100%-48px)/3)]'
          >
            <Link
              href={`/repair/${item.slug}`}
              className='flex w-full flex-col justify-between rounded-2xl p-8 hover:bg-dark-blue md:h-full xl:h-[261px]'
            >
              <div className='relative ml-auto h-[60px] w-[60px]'>
                {item.icon && (
                  <Image
                    src={`http://95.217.34.212:30000${item.icon}`}
                    fill
                    alt={item.title}
                  />
                )}
              </div>
              <div className='text-white-dis'>
                <h3 className='mr-auto font-semibold leading-tight md:text-base xl:text-xl'>
                  {item.title}
                </h3>
                <p className='hidden font-inter text-[12px] xl:text-sm'>
                  Подивитися поломки
                </p>
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}