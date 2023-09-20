'use client'

import { AnimatePresence } from 'framer-motion'
import React, { useCallback, useState } from 'react'

import type { CategoriesSectionProps } from '../(pages)/repair/(components)/CategoriesSection'
import CategoriesSlider from '../(pages)/repair/(components)/slider'
import Button from './(components)/Button'
import InstantAdviceModal from './(components)/InstantAdviceModal'
import SuccessSubmitBanner from './(components)/SuccessSubmitBanner'

export const BrokenSection: React.FC<CategoriesSectionProps> = ({
  categoryData,
}) => {
  const [showInstantAdviceModal, setShowInstantAdviceModal] =
    useState<boolean>(false)
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)

  const toggleSuccessSubmitModal = useCallback(() => {
    setSubmitSuccess(prev => !prev)
  }, [])

  const toggleInstantAdviceModal = useCallback(() => {
    setShowInstantAdviceModal(prev => !prev)
  }, [setShowInstantAdviceModal])

  return (
    <section className='section pt-[100px] max-md:pt-[45px] xl:mb-[-150px]'>
      <div className='container flex flex-col gap-6 md:px-0'>
        <div className='flex gap-8 max-md:flex-col'>
          <div className='flex w-full flex-col gap-6 md:w-[300px]'>
            <h3 className='font-exo_2 text-xl font-bold leading-normal text-light-blue md:text-2xl'>
              Що зламалося?
            </h3>
            <div className='flex flex-col gap-4 text-base font-normal'>
              <p>
                У нас є багато варіантів, як подарувати друге життя вашому
                гаджету.
              </p>
              <p>
                Обирайте потрібний пристрій, що зламався, та дізнавайтесь ціни
                на ремонт.
              </p>
              <p>Або ж, економте час, залишайте заявку на консультацію.</p>
              <div />
            </div>
            <Button
              text='Миттєва консультація'
              toggleModal={toggleInstantAdviceModal}
              styles='group relative flex max-w-[256px] py-4 items-center justify-center rounded-2xl bg-mid-green transition-colors  hover:bg-mid-blue focus:bg-mid-blue  max-md:w-full'
              textHoverAnimation='text-base font-semibold tracking-wide text-dark-blue group-hover:animate-hoverBtnOut animate-hoverBtnIn'
            />
          </div>
          <CategoriesSlider categoryData={categoryData} />
        </div>
      </div>
      {showInstantAdviceModal && (
        <InstantAdviceModal
          toggleInstantAdviceModal={toggleInstantAdviceModal}
          setSubmitSuccess={setSubmitSuccess}
        />
      )}
      {submitSuccess && (
        <AnimatePresence>
          <SuccessSubmitBanner
            toggleSuccessSubmitModal={toggleSuccessSubmitModal}
          />
        </AnimatePresence>
      )}
    </section>
  )
}
