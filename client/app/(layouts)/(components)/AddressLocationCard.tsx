import Image from 'next/image'
import Link from 'next/link'

import type { IContact } from '@/app/(server)/api/service/modules/contactService'

export interface IContactsProps {
  contactsData: IContact[]
}
export const AddressLocationCard: React.FC<IContactsProps> = ({
  contactsData,
}) => {
  return contactsData.map(item => (
    <li
      data-aos='zoom-in'
      data-aos-offset='50'
      key={item._id}
      className='group mb-8 flex h-[286px] w-full justify-between overflow-hidden rounded-xl bg-card-gradient-blue text-base transition-colors delay-75 duration-300 ease-in-out hover:bg-card-gradient-hover lg:mb-0 lg:h-[240px] xl:h-[265px]'
    >
      <div className='flex w-full flex-col py-[26px] pl-8 pr-3 text-white-dis transition-all delay-75 duration-300 ease-in-out group-hover:translate-x-6 group-hover:scale-110 lg:justify-between lg:pb-[30px] lg:pr-0 lg:pt-10 lg:group-hover:translate-x-0 xl:group-hover:translate-x-4'>
        <h3 className='mb-[23px] font-exo_2 text-xl font-semibold'>
          {item.area} р-н
        </h3>
        <div className='max-w-[210px]'>
          <p className='mb-2 font-medium leading-7 tracking-wider text-[#f8fcffe0]'>
            {item.address}
          </p>
          {item.phones.map(phone => (
            <a
              key={phone}
              href={`tel:${phone.replace(/\s/g, '')}`}
              className='cursor-pointer font-medium leading-7 tracking-wider text-[#01CC74]'
            >
              {phone}
            </a>
          ))}
        </div>
        <a
          href={item.googleMapLink}
          target='_blank'
          className='mt-auto w-fit cursor-pointer border-b-[2px] border-b-white-dis font-semibold tracking-wider lg:hidden'
        >
          Подивитися на мапі
        </a>
      </div>
      <Link
        className='hidden w-full cursor-pointer overflow-hidden rounded-xl md:block'
        href={item.googleMapLink}
        target='_blank'
      >
        <Image
          className='aspect-square bg-cover bg-center object-cover lg:aspect-[1/1.05]'
          src={item.image.src}
          alt={item.image.alt}
          width={600}
          height={546}
        />
      </Link>
    </li>
  ))
}
