import { AnimatePresence } from 'framer-motion'
import { useKeenSlider } from 'keen-slider/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import Button from '@/app/(layouts)/(components)/Button'
import CallUsCard from '@/app/(layouts)/(components)/CallUsCard'
import InstantAdviceModal from '@/app/(layouts)/(components)/InstantAdviceModal'
import SuccessSubmitBanner from '@/app/(layouts)/(components)/SuccessSubmitBanner'

import type { BrandsProps } from './BrandsSection'

export const BrandsSlider: React.FC<BrandsProps> = ({
  brandData,
  singleGadgetData,
  // sliderOption,
}) => {

  const pathname = usePathname()
  const brandPath = pathname.split('/').pop()
  const showTabs = brandPath === 'brands'

  // Modal window
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

  // Tabs
  const [selectedTab, setSelectedTab] = useState(0)
  const firstBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    firstBtnRef?.current?.focus()
  }, [])

  // Keen Slider
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLElement>({
    initial: 0,
    breakpoints: {
      '(min-width: 390px)': {
        slides: { perView: 2, spacing: 55 },
        mode: 'free',
      },
      '(min-width: 768px)': {
        slides: { perView: 5, spacing: 55 },
        mode: 'free',
      },
      '(min-width: 1100px)': {
        slides: { perView: 7, spacing: 25 },
        mode: 'free-snap',
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  const filled = instanceRef?.current?.track.details.maxIdx || 1

  const { slug } = singleGadgetData

  return (
    <>
      <div ref={sliderRef} className='keen-slider flex'>
        {brandData?.map((item, index) => {
          const { alt, src } = item.icon
          return (
            <button
              type='button'
              ref={index === 0 ? firstBtnRef : null}
              onClick={() => setSelectedTab(index)}
              key={item._id}
              className={`${
                selectedTab === index
                  ? 'keen-slider__slide bg-dark-grey flex h-[128px] w-[128px] items-center justify-center rounded-[50%] shadow-md'
                  : 'keen-slider__slide flex h-[128px] w-[128px] items-center justify-center rounded-[50%] bg-mid-green'
              }`}
            >
              <Link
                href={{
                  pathname: `/repair/${slug}/brands`,
                  query: {
                    name: item.slug,
                  },
                }}
              >
                <Image src={src} alt={alt} fill />
              </Link>
            </button>
          )
        })}
      </div>
      {loaded && instanceRef && (
        <div className='relative'>
          <div
            className='absolute left-0 top-0 z-10 h-[6px] rounded-full bg-mid-green transition-width'
            style={{
              width: `${(100 / filled) * currentSlide}%`,
            }}
          />
          <div className='absolute left-0 top-0 h-[6px] w-full rounded-full bg-dark-blue' />
        </div>
      )}
      {showTabs && (
        <div className='flex pt-[50px]'>
          <div className='flex max-w-[852px] gap-16  max-lg:flex-col lg:gap-32'>
            {brandData?.map((item, index) => (
              <div
                key={item._id}
                className={`${
                  selectedTab === index ? 'flex max-w-[852px]' : 'hidden'
                }`}
              >
                {item.article}
              </div>
            ))}
          </div>
          <div className='ml-auto flex flex-col gap-16'>
            <CallUsCard />
            <Button
              text='Миттєва консультація'
              toggleModal={toggleInstantAdviceModal}
              styles='group relative flex min-w-[256px] py-4 items-center justify-center rounded-2xl bg-mid-green transition-colors  hover:bg-mid-blue focus:bg-mid-blue  max-md:w-full'
              textHoverAnimation='text-base font-semibold tracking-wide text-dark-blue group-hover:animate-hoverBtnOut animate-hoverBtnIn'
            />
          </div>
        </div>
      )}
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
    </>
  )
}
