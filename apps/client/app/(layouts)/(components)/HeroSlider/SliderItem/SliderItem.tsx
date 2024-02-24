import Image from 'next/image'
import Link from 'next/link'

import type { ISliderItem } from '../types'

const SliderItem: React.FC<ISliderItem> = ({
  link,
  src,
  alt,
  title,
  id = 0,
}) => (
  <li className={`keen-slider__slide number-slide${id}`} key={alt}>
    <Link
      href={link}
      className='flex h-[148px] w-full max-w-[120px] cursor-pointer flex-col items-center justify-between rounded-2xl bg-white-dis px-5 py-[18px] transition-colors hover:bg-light-grey focus:bg-light-grey md:max-lg:h-[120px]  md:max-lg:max-w-[100px] md:max-lg:py-2.5'
    >
      {src && (
        <Image
          src={src}
          height={60}
          className='w-auto md:max-lg:scale-75'
          alt={alt}
        />
      )}
      <h4 className='text-center font-inter text-base  md:max-lg:text-sm leading-5 text-dark-blue'>
        {title}
      </h4>
    </Link>
  </li>
)

export default SliderItem
