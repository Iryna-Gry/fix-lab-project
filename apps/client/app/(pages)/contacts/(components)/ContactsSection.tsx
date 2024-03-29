import type { serverClient } from '@client/app/(utils)/trpc/serverClient'
import type { outputContactSchema as IContact } from '@server/domain/contacts/schemas/contact.schema'
import Image from 'next/image'
import Link from 'next/link'
import { BiMap } from 'react-icons/bi'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { TbClockHour9 } from 'react-icons/tb'

const ContactsSection = ({
  contactsData,
}: {
  contactsData: Awaited<
    ReturnType<(typeof serverClient)['contacts']['getAllPublishedContacts']>
  >
}) => {
  return (
    <section className=' overflow-hidden  bg-white-dis  pb-[102px] pt-[163px] max-md:pb-14 max-md:pt-[120px]'>
      <div className='container relative flex flex-col xl:p-0 '>
        <div className='z-[1] mb-[21px] flex items-center '>
          <Link
            className='flex items-center text-base font-[400] text-dark-blue transition-opacity  hover:opacity-70 focus:opacity-70'
            href='/'
          >
            <p> Головна</p> <MdKeyboardArrowRight size={25} />
          </Link>

          <p className='text-base font-[400]  text-dark-blue opacity-70'>
            Контакти
          </p>
        </div>
        <h2 className='mb-[40px] font-exo_2 text-2xl font-bold text-dark-blue max-lg:text-xl max-lg:font-semibold max-md:mb-[47px]  xl:leading-[57px]'>
          Контакти
        </h2>
        <div className='flex flex-col gap-12'>
          {contactsData.map((item: IContact) => {
            return (
              <div
                key={item.id}
                className='flex flex-col items-start justify-between lg:flex-row sm:gap-8'
              >
                <div className='flex flex-col w-[400px]'>
                  <div className='mb-[45px] flex items-center gap-2 max-lg:mb-[26px]'>
                    <BiMap color='#04268B' size={24} />
                    <p className='font-exo_2 text-xl font-semibold tracking-[0.45px] text-dark-blue  max-lg:text-lg '>
                      Приїхати до нас
                    </p>
                  </div>
                  <div key={item.id} className='flex flex-col gap-[20px] '>
                    <div className=''>
                      <p className='font-semibold text-black-dis '>
                        {item.address}
                      </p>
                      {item.comment && (
                        <p className='tracking-[0.45px]'>{item.comment}</p>
                      )}
                    </div>
                    <div className='flex items-center gap-4'>
                      {item.subways.length > 1 ? (
                        <ul className=' flex flex-col gap-[8px]'>
                          {item.subways.map((subway: string) => (
                            <li
                              key={subway}
                              className='flex items-center gap-[17px]'
                            >
                              <Image
                                src='/icons/kyiv_metro_logo_2015.svg'
                                width={24}
                                height={18}
                                alt='Kyiv metro logo'
                              />
                              <p className='tracking-[0.45px]'>{subway}</p>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <>
                          <Image
                            src='/icons/kyiv_metro_logo_2015.svg'
                            width={24}
                            height={16}
                            alt='Kyiv metro logo'
                          />
                          <p className='tracking-[0.45px]'>{item.subways}</p>
                        </>
                      )}
                    </div>
                    {item.phones.map((phone: string) => (
                      <a
                        key={phone}
                        className='font-medium leading-none tracking-[1.7px] text-dark-blue transition-opacity  hover:opacity-70 focus:opacity-70'
                        href={`tel:${phone.replace(/\s/g, '')}`}
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
                <div className='flex flex-col w-[400px]'>
                  <div className='mb-[45px] flex  items-center gap-2 max-lg:mb-8 max-md:mb-[30px]'>
                    <TbClockHour9 color='#04268B' size={24} />
                    <p className='font-exo_2 text-xl  font-semibold text-dark-blue max-lg:text-lg  max-md:tracking-[0.45px]'>
                      Режим роботи
                    </p>
                  </div>
                  <div className='flex flex-col gap-[18px]'>
                    <p className='tracking-[0.45px]'>{item?.workingTime}</p>
                    <p className='tracking-[0.45px]'>{item?.workingDate}</p>
                  </div>
                </div>
                <iframe
                  className='flex h-[300px] w-[400px] rounded-2xl object-cover max-xl:w-[400px] max-lg:w-full max-md:h-[228px] max-md:w-full'
                  src={item.googlePluginLink}
                  width='628'
                  height='400'
                  title='FixLab maps'
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
export default ContactsSection
