'use client'

import Button from '@client/app/(layouts)/(components)/Button'
import CallUsCard from '@client/app/(layouts)/(components)/CallUsCard'
import CostRepairModal from '@client/app/(layouts)/(components)/CostRepairModal'
import { SERVER_URL } from '@client/app/(lib)/constants'
import { trpc } from '@client/app/(utils)/trpc/client'
import type { serverClient } from '@client/app/(utils)/trpc/serverClient'
import { AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'

import { GadgetBrandsSlider } from './GadgetBrandsSlider'

const InstantAdviceModal = dynamic(
  () => import('@client/app/(layouts)/(components)/InstantAdviceModal'),
)
const SuccessSubmitBanner = dynamic(
  () => import('@client/app/(layouts)/(components)/SuccessSubmitBanner'),
)

const SingleGadgetSection = ({
  singleGadgetDataInit,
  contactsDataInit,
}: {
  singleGadgetDataInit: Awaited<
    ReturnType<(typeof serverClient)['gadgets']['getBySlugGadget']>
  >
  contactsDataInit: Awaited<
    ReturnType<(typeof serverClient)['contacts']['getAllPublishedContacts']>
  >
}) => {
  const { data: singleGadgetData } = trpc.gadgets.getBySlugGadget.useQuery(
    { slug: singleGadgetDataInit.slug },
    {
      initialData: singleGadgetDataInit,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  )

  const { data: contactsData } = trpc.contacts.getAllPublishedContacts.useQuery(
    undefined,
    {
      initialData: contactsDataInit,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  )

  const [submitSuccessCostRepair, setSubmitSuccessCostRepair] =
    useState<boolean>(false)
  const [submitSuccessInstantAdviceModal, setSubmitSuccessInstantAdviceModal] =
    useState<boolean>(false)
  const [showInstantAdviceModal, setShowInstantAdviceModal] =
    useState<boolean>(false)
  const [showCostRepair, setShowCostRepair] = useState<boolean>(false)

  const toggleSuccessSubmitInstantAdviceModal = useCallback(() => {
    setSubmitSuccessInstantAdviceModal((prev: boolean) => !prev)
  }, [])

  const toggleSuccessCostRepair = useCallback(() => {
    setSubmitSuccessCostRepair((prev: boolean) => !prev)
  }, [])

  const toggleInstantAdviceModal = useCallback(() => {
    setShowInstantAdviceModal((prev: boolean) => !prev)
  }, [])

  const toggleCostRepairModal = useCallback(() => {
    setShowCostRepair((prev: boolean) => !prev)
  }, [])

  const { title, icon, description, slug } = singleGadgetData

  return (
    <section className=' overflow-hidden  bg-gradient-linear-blue  pb-[102px] pt-[159px] max-md:pb-14 max-md:pt-[117px]'>
      <div className='container relative flex flex-col xl:p-0'>
        <div className=' absolute left-[335px] top-[175px] max-lg:hidden'>
          <Image
            src='/background-flicker-center.svg'
            width={327}
            height={1008}
            alt='flicker'
          />
        </div>
        <div className=' absolute left-[0] top-[468px] max-lg:hidden'>
          <Image
            src='/background-flicker-left.svg'
            width={328}
            height={1008}
            alt='flicker'
          />
        </div>
        <div className='z-[1] flex items-center gap-1'>
          <Link
            className='flex items-center gap-1 text-base font-[400] text-[#3EB9F0] transition-opacity  hover:opacity-70 focus:opacity-70'
            href='/'
          >
            <p> Головна</p> <MdKeyboardArrowRight size={30} />
          </Link>
          <Link
            className='flex items-center gap-1 text-base font-[400] text-[#3EB9F0] transition-opacity  hover:opacity-70 focus:opacity-70'
            href='/repair'
          >
            <p> Ремонт</p> <MdKeyboardArrowRight size={30} />
          </Link>

          <p className='text-base font-[400] text-[#3EB9F0] opacity-70'>
            {title}
          </p>
        </div>
        <div className='z-[1] flex justify-between pt-[29px] max-xl:gap-8 max-lg:flex-col max-lg:gap-0  max-md:gap-0 '>
          <div className='max-xl:w-[350px] max-lg:w-full xl:max-w-[411px] '>
            <div className='flex flex-col items-start justify-between  pb-[68px]  max-xl:gap-4 max-xl:pb-[56px]  max-md:gap-8'>
              <div className='flex items-center justify-center gap-[18px] xl:mb-14'>
                <div className='flex flex-col items-start justify-center '>
                  {icon && (
                    <Image
                      className='h-[80px]'
                      src={`${SERVER_URL}/${icon.file.path}`}
                      width={0}
                      height={80}
                      style={{
                        width: '100%',
                        height: 'auto',
                      }}
                      alt={icon.alt}
                    />
                  )}
                </div>
                <h2 className='font-exo_2 text-2xl  font-bold text-white-dis max-lg:text-xl '>
                  {title}
                </h2>
              </div>
              <p className='text-base font-[400] leading-6 tracking-[0.5px] text-white-dis xl:mb-14'>
                {description}
              </p>
              <Button
                text='Миттєва консультація'
                toggleModal={toggleInstantAdviceModal}
                styles='group relative flex min-w-[288px] py-4 items-center justify-center rounded-2xl bg-mid-green transition-colors  hover:bg-mid-blue focus:bg-mid-blue  max-md:w-full'
                textHoverAnimation='text-base font-semibold tracking-wide text-dark-blue group-hover:animate-hoverBtnOut animate-hoverBtnIn'
              />
            </div>
            <CallUsCard contactsDataInit={contactsData} />
          </div>
          <div className='flex flex-col gap-8 max-xl:w-[600px] max-lg:w-full lg:gap-14 xl:w-[737px]'>
            <div className='flex flex-col'>
              {singleGadgetData?.brands.length > 0 && (
                <>
                  <p className=' mb-[18px] font-exo_2 text-xl font-semibold leading-[0.7] text-white-dis'>
                    Бренди, які ремонтуємо
                  </p>
                  <div className='mb-[46px]'>
                    <GadgetBrandsSlider gadgetDataInit={singleGadgetData} />
                  </div>
                </>
              )}
              {singleGadgetData.issues.length > 0 && (
                <>
                  <p className='mb-8 font-exo_2 text-xl font-semibold leading-[0.7] text-white-dis'>
                    Послуги
                  </p>
                  <ul className='mb-14'>
                    {singleGadgetData.issues?.map(item => {
                      return (
                        <li
                          className='hover:op border-b-[0.5px] border-dark-blue bg-white-dis opacity-60 transition-opacity duration-300 first:rounded-t-xl last:rounded-b-xl hover:opacity-100 focus:opacity-100'
                          key={item.id}
                        >
                          <Link
                            className='flex items-center gap-[12px] max-md:flex-col max-md:items-start max-md:justify-center  max-md:px-[16px] max-md:py-[12px] md:h-[75px] md:justify-between md:px-6'
                            href={`/repair/${slug}/${item.slug}`}
                          >
                            <p className='font-exo_2 text-xl font-semibold text-dark-blue max-md:text-lg'>
                              {item.title}
                            </p>
                            <p className='text-md font-[400] text-black-dis'>
                              {item.price}
                            </p>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </>
              )}
              <Button
                text='Розрахувати вартість ремонту'
                toggleModal={toggleCostRepairModal}
                styles='group flex justify-between w-full px-6 py-4 rounded-2xl bg-mid-blue'
                textHoverAnimation='font-exo_2 text-xl font-semibold text-dark-blue transition-transform duration-300 group-hover:translate-x-1 origin-center group-hover:scale-105 max-md:font-inter max-md:text-base max-md:font-semibold max-[380px]:text-sm'
                icon='text-dark-blue text-3xl max-md:text-xl transition-transform duration-300 origin-center group-hover:scale-125'
              />
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showCostRepair && (
          <CostRepairModal
            toggleCostRepairModal={toggleCostRepairModal}
            setSubmitSuccess={setSubmitSuccessCostRepair}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showInstantAdviceModal && (
          <InstantAdviceModal
            toggleInstantAdviceModal={toggleInstantAdviceModal}
            setSubmitSuccess={setSubmitSuccessInstantAdviceModal}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {submitSuccessCostRepair && (
          <SuccessSubmitBanner
            text='Менеджер звʼяжеться з вами протягом години.'
            toggleSuccessSubmitModal={toggleSuccessCostRepair}
          />
        )}
        {submitSuccessInstantAdviceModal && (
          <SuccessSubmitBanner
            toggleSuccessSubmitModal={toggleSuccessSubmitInstantAdviceModal}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default SingleGadgetSection
