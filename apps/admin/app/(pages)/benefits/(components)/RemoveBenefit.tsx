'use client'

import { trpc } from '@admin/app/(utils)/trpc/client'
import { serverClient } from '@admin/app/(utils)/trpc/serverClient'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'

const RemoveBenefit = ({
  item,
}: {
  item: Awaited<ReturnType<(typeof serverClient)['benefits']['getById']>>
}) => {
  const [showRemoveContainers, setShowRemoveContainers] = useState<{
    [key: string]: boolean
  }>({})
  const router = useRouter()
  const containerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const toggleRemoveContainer = (itemId: string) => {
    setShowRemoveContainers(prevState => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }))
  }
  const deleteImage = trpc.images.remove.useMutation()
  const removeBenefit = trpc.benefits.remove.useMutation({
    onSuccess: async () => {
      deleteImage.mutate(item.icon_id)
      router.refresh()
      toast.success(`Послугу сервісного обслуговування видалено!`, {
        style: {
          borderRadius: '10px',
          background: 'grey',
          color: '#fff',
        },
      })
    },

    onError: () => {
      toast.error(`Сталася помилка під час видалення...`, {
        style: {
          borderRadius: '10px',
          background: 'red',
          color: '#fff',
        },
      })
    },
  })

  const handleDeleteArticle = async (articleId: string) => {
    removeBenefit.mutate(articleId)
    toggleRemoveContainer(articleId)
  }

  useEffect(() => {
    const handleClickOutside = (itemId: string, event: MouseEvent) => {
      const containerRef = containerRefs.current[itemId]
      if (containerRef && !containerRef.contains(event.target as Node)) {
        setShowRemoveContainers(prevState => ({
          ...prevState,
          [itemId]: false,
        }))
      }
    }

    const handleOutsideClick = (event: MouseEvent) => {
      Object.keys(showRemoveContainers).forEach(itemId => {
        handleClickOutside(itemId, event)
      })
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [showRemoveContainers])

  return (
    <>
      <button
        aria-label='Видалити'
        type='button'
        onClick={() => toggleRemoveContainer(item.id)}
      >
        <MdDelete
          className='transition-colors hover:fill-[red] focus:fill-[red]'
          size={30}
        />
      </button>
      {showRemoveContainers[item.id] && (
        <div
          ref={ref => {
            containerRefs.current[item.id] = ref
          }}
          className='z-1 bg-mid-green absolute bottom-[-21.5px] left-[-25px] flex gap-4 p-[21px]'
        >
          <button
            aria-label='Видалити'
            type='button'
            onClick={() => handleDeleteArticle(item.id)}
          >
            <AiOutlineCheckCircle
              className='hover:fill-white-dis focus:fill-white-dis transition-colors'
              size={30}
            />
          </button>
          <button
            aria-label='Закрити'
            type='button'
            onClick={() => toggleRemoveContainer(item.id)}
          >
            <AiOutlineCloseCircle
              className='transition-colors hover:fill-[red] focus:fill-[red]'
              size={30}
            />
          </button>
        </div>
      )}
    </>
  )
}

export default RemoveBenefit