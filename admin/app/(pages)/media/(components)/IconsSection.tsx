/* eslint-disable no-console */

'use client'

import deleteData from '@admin/app/(server)/api/service/admin/deleteData'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { MdDelete } from 'react-icons/md'

interface IIconsProps {
  iconsData: {
    _id: string
    src: string
    alt: string
    type: string
  }[]
}

const IconsSection: React.FC<IIconsProps> = ({ iconsData }) => {
  const router = useRouter()
  const handleDeleteIcon = async (id: string) => {
    try {
      const endpoint = `/images/${id}`
      await deleteData(endpoint)
      router.refresh()
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className='flex justify-between gap-[100px] '>
      <ul className='flex flex-wrap items-center justify-center gap-6'>
        {iconsData.map(item => (
          <li
            key={item._id}
            className='relative flex flex-col items-center gap-2 py-2 text-white-dis'
          >
            <Image
              className='h-[140px] w-[280px]  bg-pros-bg object-center opacity-100 '
              alt={item.alt}
              src={item.src}
              width={320}
              height={240}
            />
            <p>{item.alt}</p>
            <MdDelete
              onClick={() => handleDeleteIcon(item._id)}
              size={25}
              className='absolute right-3 top-3 transition-colors hover:fill-[red] focus:fill-[red]'
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default IconsSection
