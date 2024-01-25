'use client'

import { SERVER_URL } from '@admin/app/(lib)/constants'
import { Avatar, Select, SelectItem } from '@nextui-org/react'
import type { imageSchema as IImage } from '@server/domain/images/schemas/image.schema'

const SelectImage = ({
  icons,
  setSelect,
  defaultSelectedKeys,
}: {
  icons: IImage[]
  setSelect: any
  defaultSelectedKeys: string[] | null
}) => {
  return (
    <div className='flex w-full max-w-xs items-center gap-2'>
      <Select
        items={icons}
        label='Виберіть завантажену іконку'
        variant='bordered'
        defaultSelectedKeys={
          defaultSelectedKeys ? defaultSelectedKeys : undefined
        }
        classNames={{
          label: 'group-data-[filled=true]:-translate-y-5',
          trigger: 'min-h-unit-16',
          listboxWrapper: 'max-h-[400px]',
        }}
        listboxProps={{
          itemClasses: {
            base: [
              'bg-red-900',
              'rounded-md',
              'text-default-500',
              'transition-opacity',
              'data-[hover=true]:text-foreground',
              'data-[hover=true]:bg-default-100',
              'dark:data-[hover=true]:bg-default-50',
              'data-[selectable=true]:focus:bg-default-50',
              'data-[pressed=true]:opacity-70',
              'data-[focus-visible=true]:ring-default-500',
            ],
          },
        }}
        popoverProps={{
          classNames: {
            base: 'before:bg-default-200',
            content: 'p-0 border-small border-divider bg-background',
          },
        }}
        onSelectionChange={(data: any) => {
          if (data.size) {
            setSelect(data.currentKey)
          } else {
            setSelect(null)
          }
        }}
        renderValue={items => {
          return items.map(item => (
            <div key={item.key} className='flex items-center gap-2'>
              <Avatar
                alt={item.data?.alt}
                className='flex-shrink-0'
                size='sm'
                src={`${SERVER_URL}/${item.data?.file.path}`}
              />
              <div className='flex flex-col'>
                <span>{item.data?.alt}</span>
              </div>
            </div>
          ))
        }}
      >
        {icon => (
          <SelectItem key={icon.id}>
            <div className='flex gap-2 items-center'>
              <Avatar
                alt={icon.alt}
                className='flex-shrink-0'
                size='sm'
                src={`${SERVER_URL}/${icon.file.path}`}
              />
              <div className='flex flex-col'>
                <span className='text-small'>{icon.alt}</span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
    </div>
  )
}

export default SelectImage
