'use client'

import { AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { BiMap } from 'react-icons/bi'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { TbPhone } from 'react-icons/tb'

import RenderMarkdown from '@/app/(components)/RenderMarkdown'
import Button from '@/app/(layouts)/(components)/Button'
import InstantAdviceModal from '@/app/(layouts)/(components)/InstantAdviceModal'
import SuccessSubmitBanner from '@/app/(layouts)/(components)/SuccessSubmitBanner'
import type { IContact } from '@/app/(server)/api/service/modules/contactService'

export interface ISingleArticleProps {
  contactsData: IContact[]
}

const SingleArticlePage: React.FC<ISingleArticleProps> = ({ contactsData }) => {
  const [submitSuccessInstantAdviceModal, setSubmitSuccessInstantAdviceModal] =
    useState<boolean>(false)
  const [showInstantAdviceModal, setShowInstantAdviceModal] =
    useState<boolean>(false)

  const toggleSuccessSubmitInstantAdviceModal = useCallback(() => {
    setSubmitSuccessInstantAdviceModal(prev => !prev)
  }, [])

  const toggleInstantAdviceModal = useCallback(() => {
    setShowInstantAdviceModal(prev => !prev)
  }, [setShowInstantAdviceModal])
  const article =
    '<p><strong>Симптоми несправності материнської плати смартфона чи планшета</strong></p><ul><li><p>Смарфон / планшет самовільно перезавантажується;</p></li><li><p>Гаджет часто зависає;</p></li><li><p>Телефон не заряджається;</p></li><li><p>Смартфон не вмикається;</p></li><li><p>Швидко розряджається батарея;</p></li><li><p>Не бачить мережу чи sim-карту;</p></li><li><p>Не ловить Wi-Fi чи Bluetooth;</p></li><li><p>Смартфон / планшет гріється під час роботи або заряджання.</p></li></ul><p></p><p>Так само причиною некоректної роботи смартфона може бути потрапляння на нього рідини. Якщо Ви залили телефон – відразу ж несіть його на чистку і відновлення. Не намагайтесь висушити його в рисі чи на батареї. Чим пізніше залитий гаджет потрапить на робочий стіл майстра, тим дорожче буде ремонт. Адже за цей час там може утворитися багато іржі та корозії і як результат —менша ймовірність успішного ремонту телефону після потрапляння води.</p>'
  return (
    <section className=' overflow-hidden bg-white-dis  pb-[102px] pt-[159px] max-md:pb-14 max-md:pt-[117px]'>
      <div className='container relative flex flex-col xl:p-0'>
        <div className='z-[1] mb-[21px] flex items-center '>
          <Link
            className='flex items-center text-base font-[400] text-dark-blue transition-opacity  hover:opacity-70 focus:opacity-70'
            href='/'
          >
            <p> Головна</p> <MdKeyboardArrowRight size={25} />
          </Link>
          <Link
            className='flex items-center text-base font-[400] text-dark-blue transition-opacity  hover:opacity-70 focus:opacity-70'
            href='/blog'
          >
            <p> Блог</p> <MdKeyboardArrowRight size={25} />
          </Link>

          <p className='text-base font-[400]  text-dark-blue opacity-70'>
            article title
          </p>
        </div>
        <div className='flex max-w-[954px] flex-col '>
          <h2 className='mb-[56px] font-exo_2 text-2xl font-bold  max-lg:text-xl max-lg:font-semibold max-md:mb-[47px]  xl:leading-[57px]'>
            Title article
          </h2>
          <Image
            className='mb-[56px] min-h-[245px] w-full  object-cover md:max-h-[480px]'
            src='/images/for-business-table.png'
            width={924}
            height={480}
            alt='Kyiv metro logo'
          />
          <div className='mb-[104px] max-md:mb-[56px]'>
            <RenderMarkdown markdown={article} />
          </div>
          <div className='flex w-full justify-between gap-6 max-md:hidden'>
            <div className='w-[410px]'>
              <p className='mb-[32px] font-exo_2 text-2xl font-bold text-dark-blue  max-lg:text-xl max-lg:font-semibold max-md:mb-[47px]  xl:leading-[57px]'>
                Тут можна залишити заявку на ремонт у сервісному центрі FixLab
              </p>
              <p className='mb-[56px] tracking-[0.55px] text-dark-blue'>
                Майстри FixLab проводять попередню безкоштовну діагностику, яка
                триває від 15 хв
              </p>
              <Button
                text='Миттєва консультація'
                toggleModal={toggleInstantAdviceModal}
                styles='group relative max-md:hidden flex min-w-[256px] py-[17px] items-center justify-center rounded-2xl bg-mid-green transition-colors  hover:bg-mid-blue focus:bg-mid-blue  max-md:w-full'
                textHoverAnimation='text-base font-semibold tracking-wide text-dark-blue group-hover:animate-hoverBtnOut animate-hoverBtnIn'
              />
            </div>
            <div className='flex  max-w-[342px] flex-col'>
              <div className='mb-[45px] flex items-center gap-2 max-lg:mb-[26px]'>
                <BiMap color='#04268B' size={24} />
                <p className='font-exo_2 text-xl font-semibold tracking-[0.45px] text-dark-blue  max-lg:text-lg '>
                  Приїхати до нас
                </p>
              </div>
              <div className='flex flex-col gap-14 max-lg:gap-6'>
                {contactsData.map(item => {
                  return (
                    <div key={item._id} className='flex flex-col gap-[20px] '>
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
                            {item.subways.map(subway => (
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
                            <p className='tracking-[0.45px]'>
                              {item.subways[0]}
                            </p>
                          </>
                        )}
                      </div>
                      {item.phones.map(phone => (
                        <a
                          key={phone}
                          className='font-medium leading-none tracking-[1.7px] text-dark-blue transition-opacity  hover:opacity-70 focus:opacity-70'
                          href={`tel:${phone.replace(/\s/g, '')}`}
                        >
                          {phone}
                        </a>
                      ))}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className=' flex w-full flex-col items-start justify-center   md:hidden'>
            <div className='mb-[17px] flex items-center justify-center gap-2'>
              <TbPhone className='text-dark-blue' size={24} />
              <p className='relative font-exo_2 text-xl font-semibold text-dark-blue'>
                Подзвонити нам
              </p>
            </div>
            <ul className='mb-[30px] flex flex-col items-center gap-[13px]'>
              {contactsData.map(item => (
                <li key={item._id} className='flex flex-col items-center'>
                  <p className='font-[400] text-black-dis'>{item.area} р-н</p>
                  {item.phones.map(phone => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className=' font-[500] leading-7 tracking-[1.56px] text-dark-blue  transition-opacity hover:opacity-70  focus:opacity-70'
                    >
                      {phone}
                    </a>
                  ))}
                </li>
              ))}
            </ul>
            <Button
              text='Миттєва консультація'
              toggleModal={toggleInstantAdviceModal}
              styles='group relative md:hidden flex min-w-[256px] py-[17px] items-center justify-center rounded-2xl bg-mid-green transition-colors  hover:bg-mid-blue focus:bg-mid-blue  max-md:w-full'
              textHoverAnimation='text-base font-semibold tracking-wide text-dark-blue group-hover:animate-hoverBtnOut animate-hoverBtnIn'
            />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showInstantAdviceModal && (
          <InstantAdviceModal
            toggleInstantAdviceModal={toggleInstantAdviceModal}
            setSubmitSuccess={setSubmitSuccessInstantAdviceModal}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {submitSuccessInstantAdviceModal && (
          <SuccessSubmitBanner
            toggleSuccessSubmitModal={toggleSuccessSubmitInstantAdviceModal}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default SingleArticlePage
