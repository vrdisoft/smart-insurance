import DatePickerComponent, { DateObject } from 'react-multi-date-picker'
import { cn } from '../../lib/utils'
export type DatePickerProps = {
  value?: string
  onChange?: (value: DateObject) => void
  label?: string
  disabled?: boolean
  required?: boolean
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void
  error?: string
}
export const DatePicker = ({
  value = '',
  onChange,
  label,
  disabled = false,
  onBlur,
  required,
  error,
}: DatePickerProps) => {
  return (
    <div className="relative w-full">
      {label && (
        <label className="block mb-2 text-sm font-medium ">
          {label}
          {required && <span className="text-red-500 pr-[2px]">*</span>}
        </label>
      )}
      <DatePickerComponent
        value={value}
        onChange={onChange}
        disabled={disabled}
        inputClass={cn(
          `w-full h-[48px] border border-neutral-200 rounded-[8px] px-2 py-2  ${error ? 'border border-red-500' : ''}`,
        )}
      />
      {error && (
        <div className={`md:absolute block h-4 text-red-500 mt-2 mr-2 text-body-xxs`}>{error ? error : ''}</div>
      )}
    </div>
  )
}
