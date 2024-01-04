import { serverClient } from '@admin/app/(utils)/trpc/serverClient'
import { useSortable } from '@dnd-kit/sortable'
import { GoGrabber } from 'react-icons/go'
import { IoIosRemoveCircle } from 'react-icons/io'

export function DraggableBenefitsItem({
  id,
  item,
  onRemove,
}: {
  id: string
  item: Awaited<ReturnType<(typeof serverClient)['benefits']['getById']>>
  onRemove: (
    item: Awaited<ReturnType<(typeof serverClient)['benefits']['getById']>>,
  ) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const scale = transform?.scaleX || 1

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${scale})`
      : '',
    transition,
  }
  return (
    <li
      key={item.id}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className='flex w-full cursor-grab items-center justify-between gap-2 border-b-[0.5px] border-dark-blue bg-white-dis opacity-60   first:rounded-t-xl last:rounded-b-xl '
    >
      <p className='p-4 font-exo_2 text-md font-semibold text-dark-blue max-md:text-lg'>
        {item?.title || 'No title'}
      </p>
      <div className='flex items-center gap-2'>
        <GoGrabber className='text-dark-blue' size={35} />
        <IoIosRemoveCircle
          onClick={() => {
            onRemove(item)
          }}
          className='mr-4 cursor-pointer text-dark-blue transition-colors hover:text-[red] focus:text-[red]'
          size={35}
        />
      </div>
    </li>
  )
}