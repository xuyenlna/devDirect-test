import clsx from 'clsx'
import { MouseEventHandler } from 'react'

type ButtonType = 'primary' | 'text'
interface CustomButtonProps {
  type: ButtonType
  className?: string
  children?: React.ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}
export default function Button({ type, className, children, onClick: handleClick }: CustomButtonProps) {
  return (
    <button
      className={clsx(
        `rounded-[10px] cursor-pointer border-none text-center px-4 py-2 p1  ${className}`,
        {
          'bg-[#00c58e] hover:bg-[#00c58e99] ': type == 'primary'
        },

        {
          'hover:text-[#00c58e] text-[#2f495e] ': type == 'text'
        }
      )}
      onClick={handleClick && handleClick}
    >
      {children}
    </button>
  )
}
