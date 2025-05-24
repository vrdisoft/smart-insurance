//Import { cva } from 'class-variance-authority'
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react'

import { cn } from '../../lib/utils'
//  Import { InputStyle } from './style'

type RadioProps = InputHTMLAttributes<HTMLInputElement> & {
  labelRequired?: boolean
  label?: string | ReactNode
  labelClass?: string
  type?: string
  placeholder?: string
  hasError?: boolean
  required?: boolean
  value?: string | number
  defaultValue?: number | string
  error?: string
  disabled?: boolean
  textAlign?: string
  direction?: string
  icon?: string
  height?: string
  backgroundColor?: string
  hint?: string
  hasBorder?: boolean
  autoFocus?: boolean
  inRow?: boolean
  gap?: string
  labelFont?: string
  checked?: boolean
  wrapperClassName?: string
  inputClassName?: string
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      labelRequired,
      label,
      labelClass = '',
      type = 'Radio',
      onChange,
      placeholder,
      hasError,
      required,
      value,
      defaultValue,
      checked,
      disabled,
      textAlign = 'right',
      direction = 'rtl',
      height = 'h-[20px]',
      backgroundColor = 'bg-white',
      hasBorder = true,
      autoFocus = false,
      inRow = false,
      gap = 'gap-2',
      labelFont = 'text-body-base',
      wrapperClassName,
      inputClassName,
      error,
      ...rest
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          `w-full h-full flex gap-2 md:${gap} ${inRow ? 'flex-row items-center' : 'flex-col justify-center'} ${wrapperClassName}`,
        )}
      >
        <div className={cn(`relative w-[20px] h-[20px] ${height} flex items-center`)}>
          <input
            type={type}
            onChange={e => {
              onChange?.(e)
            }}
            placeholder={placeholder}
            checked={checked}
            className={cn(`w-[20px] h-[20px]
            ${height}
            ${inputClassName}
            ${hasBorder ? 'border border-neutral-200' : 'border-0'}
            ${hasError ? 'border-red-500' : ''}
            ${disabled ? 'text-neutral-500 cursor-not-allowed' : ''}
            ${textAlign === 'left' ? 'text-left' : ''}
            ${textAlign === 'right' ? 'text-right' : ''}
            ${textAlign === 'center' ? 'text-center' : ''}
            ${direction}
            ${backgroundColor}
            `)}
            value={value}
            defaultValue={defaultValue}
            disabled={disabled}
            autoFocus={autoFocus}
            required={required}
            ref={ref}
            {...rest}
          />
        </div>
        {label && (
          <div className={`${labelFont} ${labelClass} `}>
            {label}
            {labelRequired && <span className="text-error-500 pr-[2px]">*</span>}
          </div>
        )}
        {error && (
          <div className={`md:absolute block h-4 text-red-500 mt-10 mr-2 text-body-xxs`}>{error ? error : ''}</div>
        )}
      </div>
    )
  },
)

Radio.displayName = 'Radio'

export { Radio, type RadioProps }
