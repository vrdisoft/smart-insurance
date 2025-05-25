import React from 'react'

type Option = {
  label: string
  value: string
}

export type RadioGroupProps = {
  name: string
  options: Option[]
  value?: string
  onChange?: (value: string) => void
  label?: string
  disabled?: boolean
  required?: boolean
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void
  error?: string
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value = '',
  onChange,
  label,
  disabled = false,
  onBlur,
  required,
  error,
}) => (
  <div className="relative">
    {label && (
      <label className="block mb-2 text-sm font-medium ">
        {label}
        {required && <span className="text-red-500 pr-[2px]">*</span>}
      </label>
    )}
    <div className="flex gap-6">
      {options.map(opt => (
        <label key={opt.value} className="inline-flex items-center cursor-pointer ">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange?.(opt.value)}
            disabled={disabled}
            className="form-radio text-blue-600 focus:ring-blue-500 disabled:opacity-50 w-[20px] h-[20px]"
            onBlur={onBlur}
          />
          <span className="ml-2 ">{opt.label}</span>
        </label>
      ))}
    </div>
    {error && <div className={`md:absolute block h-4 text-red-500  mr-2 text-body-xxs`}>{error ? error : ''}</div>}
  </div>
)
