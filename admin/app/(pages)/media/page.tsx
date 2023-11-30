import Image from 'next/image'
import Link from 'next/link'

import getData from '@/app/(server)/api/service/admin/getData'

export const runtime = 'edge'
export const revalidate = 3600

const MediaPage = async () => {
  const iconsUrl = '/images/icons/all'
  const ImagesUrl = '/images/pictures/all'
  const iconsData = await getData(iconsUrl)
  const imagesData = await getData(ImagesUrl)

  return (
    <main className='flex flex-auto'>
      <section className='bg-footer-gradient-linear-blue flex h-[100vh] w-full items-center  justify-center py-[60px]'>
        <div className='container relative flex flex-col px-8 '>
          <ul className='flex w-full items-end justify-center gap-6 '>
            <li>
              <Link
                className='font-exo_2 text-white-dis mb-6  text-2xl font-bold max-lg:text-xl'
                href='/media/icons'
              >
                <div className='flex flex-col items-center  gap-2 py-2'>
                  <Image
                    className='border-white-dis h-[240px] w-[380px] border-[1px]  object-center opacity-100'
                    alt={iconsData[0].alt}
                    src={iconsData[0].src}
                    width={0}
                    height={0}
                    style={{
                      filter:
                        'brightness(0) saturate(100%) invert(95%) sepia(0%) saturate(7500%) hue-rotate(69deg) brightness(106%) contrast(98%)',
                    }}
                  />
                  <p>Іконки</p>
                </div>
              </Link>
            </li>
            <li>
              <Link
                className='font-exo_2 text-white-dis mb-6  text-2xl font-bold max-lg:text-xl'
                href='/media/images'
              >
                <div className='flex flex-col items-center gap-2 py-2'>
                  <Image
                    className='h-[240px] w-[380px] object-cover object-center opacity-100'
                    alt={imagesData[1].alt}
                    src={imagesData[1].src}
                    width={320}
                    height={240}
                  />
                  <p>Зображення</p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </main>
  )
}

export default MediaPage
