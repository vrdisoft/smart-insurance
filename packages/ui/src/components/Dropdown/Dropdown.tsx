'use client'
import { SelectHTMLAttributes, useEffect, useState } from 'react'

import { cn } from '../../lib/utils'

type OptionType = {
  label: string
  value: number
}
type DropdownPropsType = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
  placeholder?: string
  labelRequired?: boolean
  hasArrow?: boolean
  options: OptionType[]
  error?: string
}
const Dropdown = ({ label, labelRequired, hasArrow, options, onChange, error, value }: DropdownPropsType) => {
  const [selectedOption, setSelectedOption] = useState<OptionType>()
  const [activeId, setActiveId] = useState(0)

  const handleOptionClick = (option: string) => {
    setSelectedOption(options.find(item => item.value === Number(option)))
    setActiveId(Number(option))
  }

  useEffect(() => {
    setSelectedOption(options.find(item => item.value === value))
    setActiveId(Number(value) ?? 0)
  }, [value, options])

  return (
    <div className="relative inline-block w-full">
      {label && (
        <div className={`text-body-lg-1 md:mb-4 text-gsgray4`}>
          {label}
          {labelRequired && <span className="text-error-700 pr-1">*</span>}
        </div>
      )}
      <div className={cn(`border border-neutral-200 rounded-lg ${error ? 'border-error-500' : ''}`)}>
        <select
          className={`flex justify-between items-center gap-[2px] pr-4 pl-2 rounded-lg w-full focus:outline-none text-neutral-700 border border-l-8 border-white bg-white h-11 md:h-12 focus:bg-white text-body-sm-1 ${
            !hasArrow && 'py-2 appearance-none'
          }`}
          onChange={e => {
            handleOptionClick(e.target.value)
            onChange?.(e)
          }}
        >
          {options.map(option => (
            <option
              selected={activeId === option.value}
              key={option.value}
              value={option.value}
              className={`py-2 px-4 cursor-pointer hover:bg-neutral-100 ${
                selectedOption?.value === option?.value && 'bg-neutral-100'
              }`}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className={`absolute block h-4 ${error && 'text-error-500'} mt-2 mr-2 text-body-xxs`}>
        {error ? error : ''}
      </div>
    </div>
  )
}
export { Dropdown, type DropdownPropsType }
