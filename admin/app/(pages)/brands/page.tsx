/* eslint-disable import/no-extraneous-dependencies */
import { trpc } from 'admin/app/(utils)/trpc'
import type { IBrand } from 'admin/types/trpc'
import Image from 'next/image'
import Link from 'next/link'

export const runtime = 'edge'
export const revalidate = 3600

const BrandsPage = async () => {
  // const url = '/brands/all'
  // const brandsData = await getData(url)
  const brandsData = (await trpc.getBrandsQuery.query()) as IBrand[]

  return (
    <main className='flex flex-auto'>
      <section className='flex  w-full items-center bg-footer-gradient-linear-blue py-[60px]'>
        <div className=' relative flex flex-col px-12 '>
          <ul>
            {brandsData.map(
              (item: {
                _id: string
                title: string
                icon: {
                  alt: string
                  src: string
                }
              }) => (
                <li key={item._id}>
                  <Link
                    className='mb-6 font-exo_2 text-2xl  font-bold text-white-dis max-lg:text-xl'
                    href={`/brands/${item._id}`}
                  >
                    <div className='flex items-center gap-2 py-2'>
                      {item.icon && (
                        <Image
                          className='h-[40px] w-[40px] object-center opacity-100'
                          alt={item.icon.alt}
                          src={item.icon.src}
                          width={0}
                          height={0}
                        />
                      )}
                      <p>{item.title}</p>
                    </div>
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
      </section>
    </main>
  )
}

export default BrandsPage
