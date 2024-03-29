import { Button } from '@nextui-org/react'
import React from 'react'

interface SendButtonProps {
  type: 'button' | 'reset' | 'submit'
  isLoading: boolean
  disabled: boolean
}

const SendButton: React.FC<SendButtonProps> = ({
  type,
  isLoading,
  disabled,
}) => {
  return (
    <Button
      type={type}
      isLoading={isLoading}
      disabled={disabled}
      className='flex h-[4em] w-[20em] justify-center rounded-2xl bg-mid-blue px-6 py-4 text-white-dis transition duration-300 hover:scale-[1.03] hover:bg-black-dis focus:scale-[1.03] focus:bg-black-dis'
    >
      <span className='text-center font-exo_2 text-xl font-bold'>Зберегти</span>
    </Button>
  )
}

export default SendButton
