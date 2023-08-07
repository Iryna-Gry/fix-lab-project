import { useState } from 'react'

interface ModalButtonProps {
  validationArr: boolean[]
  textButton: string
}

const ModalButton: React.FC<ModalButtonProps> = ({
  textButton,
  validationArr,
}) => {
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const [isSubmitting, isValid, dirty, isValidating] = validationArr

  return (
    <button
      type='submit'
      disabled={isSubmitting || !isValid || !dirty || isValidating}
      onMouseEnter={() => setIsHovering(false)}
      onMouseLeave={() => setIsHovering(true)}
      className={`${
        !isValid || !dirty || isValidating
          ? 'pointer-events-none opacity-70'
          : ''
      } group mt-4 flex w-full items-center justify-center rounded-lg bg-dark-blue hover:bg-[#0B122F] focus:bg-[#0B122F]`}
    >
      <p
        className={`whitespace-nowrap pb-[20px] pt-[23px] text-base font-semibold tracking-[0.64] text-white-dis ${
          isHovering ? 'animate-hoverBtnOut' : ''
        } group-hover:animate-hoverBtnIn`}
      >
        {textButton}
      </p>
    </button>
  )
}

export default ModalButton
