'use client'
import { ReactNode, useEffect, useState } from 'react'

export interface CheckboxListProps {
  data: { value: string; label: ReactNode; checked?: boolean }[] | undefined
  onChange?: (value: string[]) => void
  checked?: boolean
  customClass?: string
  labelClass?: string
  inputClass?: string
  wrapperClass?: string
  required?: boolean
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void
  error?: string
  value?: string[]
  label?: string
}
export const CheckboxList = ({
  data,
  onChange,
  checked,
  customClass,
  labelClass = '',
  inputClass = 'w-4 h-4',
  wrapperClass,
  required,
  onBlur,
  error,
  label,
}: CheckboxListProps) => {
  const [selected, setSelected] = useState<string[]>([])

  const handleSelect = (id: string) => {
    let data = [...selected]
    if (!selected.find(item => item === id)) {
      data.push(id)
    } else {
      data = data.filter(item => item !== id)
    }
    setSelected([...data])
    onChange?.([...data])
  }

  useEffect(() => {
    setSelected(data?.filter(item => item.checked)?.map(item => item.value) ?? [])
  }, [data])

  return (
    <div className={`relative w-full gap-3 flex flex-col ${customClass}`}>
      {label && (
        <label className="block mb-2 text-sm font-medium">
          {label}
          {required && <span className="text-red-500 pr-[2px]">*</span>}
        </label>
      )}
      {data?.map(item => {
        return (
          <div className={`flex items-center gap-2 ${wrapperClass}`} key={item.value}>
            <input
              type="checkbox"
              className={`text-blue-600 bg-neutral-100 border-neutral-300 rounded ${inputClass}`}
              id={item.value}
              value={item.value}
              name={item.value}
              checked={item.checked || checked}
              onChange={() => {
                handleSelect(item.value)
              }}
            />
            <label className={` ${labelClass} w-full ml-2 `}>{item.label}</label>
          </div>
        )
      })}
      {error && (
        <div className={`md:absolute block h-4 text-red-500 md:-bottom-4 mr-2 text-body-xxs`}>{error ? error : ''}</div>
      )}
    </div>
  )
}
