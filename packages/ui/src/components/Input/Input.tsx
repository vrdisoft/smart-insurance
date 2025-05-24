//Import { cva } from 'class-variance-authority'

import { forwardRef, InputHTMLAttributes, ReactNode } from 'react'

import { cn } from '../../lib/utils'
//  Import { InputStyle } from './style'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  labelRequired?: boolean
  label?: string
  labelClass?: string
  type?: string
  placeholder?: string
  hasError?: boolean
  required?: boolean
  value?: string
  defaultValue?: number | string
  error?: string
  disabled?: boolean
  textAlign?: 'right' | 'left' | 'center'
  icon?: string
  height?: string
  backgroundColor?: string
  hint?: string
  hasBorder?: boolean
  autoFocus?: boolean
  inRow?: boolean
  labelWidth?: string
  gap?: string
  placeholderFont?: string
  labelFont?: string
  after?: ReactNode
  wrapperClassName?: string
  afterClassName?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      labelRequired,
      label,
      labelClass = '',
      type = 'text',
      onChange,
      placeholder,
      hasError,
      required,
      value = '',
      defaultValue,
      error,
      disabled,
      textAlign = 'left',
      height = 'h-11 md:h-12',
      backgroundColor = '',
      hint,
      hasBorder = true,
      autoFocus = false,
      inRow = false,
      placeholderFont = 'text-xxs',
      labelFont = 'text-md',
      className,
      wrapperClassName,
      after,
      afterClassName,
      ...rest
    },
    ref,
  ) => {
    return (
      <div
        className={`w-full h-full flex gap-2 ${inRow ? 'flex-col lg:flex-row lg:items-center' : 'flex-col justify-center md:gap-4'}
        ${wrapperClassName}
        `}
      >
        {label && (
          <div className={cn(`${labelFont} w-fit ${labelClass} `)}>
            {label}
            {labelRequired && <span className="text-red-500 pr-[2px]">*</span>}
          </div>
        )}

        <div className={`relative w-full `}>
          <div
            className={cn(
              `flex items-center  ${hasBorder ? 'border border-gray-200 rounded-lg' : 'border-0'} ${disabled ? ' cursor-not-allowed bg-gray-50' : backgroundColor} ${error ? 'border border-red-500' : ''}`,
            )}
          >
            <input
              type={type}
              onChange={e => {
                onChange?.(e)
              }}
              placeholder={placeholder}
              className={cn(`w-full p-2 rounded-lg h-full outline-none placeholder:text-gray-500 text-body-sm-1 placeholder:${placeholderFont}
            ${height}
            ${className}
            ${hasError ? 'border-red-500' : ''}
            ${disabled ? ' cursor-not-allowed bg-gray-50' : backgroundColor}
            ${textAlign === 'left' ? 'text-left' : ''}
            ${textAlign === 'right' ? 'text-right' : ''}
            ${textAlign === 'center' ? 'text-center' : ''}
            `)}
              value={value}
              defaultValue={defaultValue}
              disabled={disabled}
              autoFocus={autoFocus}
              required={required}
              ref={ref}
              {...rest}
            />
            {after && value && (
              <div
                className={cn(
                  `px-2 text-gray-700 text-body-base ${afterClassName} ${disabled ? ' cursor-not-allowed bg-gray-50' : backgroundColor}`,
                )}
              >
                {after}
              </div>
            )}
          </div>
          {error && (
            <div className={`md:absolute block h-4 text-red-500 mt-2 mr-2 text-body-xxs`}>{error ? error : ''}</div>
          )}
          {hint && (
            <div className={`md:absolute block h-4 text-green-700 mt-2 mr-2 text-body-xs`}>
              {hint && !error ? hint : ''}
            </div>
          )}
        </div>
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input, type InputProps }
