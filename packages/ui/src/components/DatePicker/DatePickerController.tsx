'use client'
import { Controller, ControllerProps, useFormContext } from 'react-hook-form'

import { DatePicker, DatePickerProps } from './DatePicker'

export const DatePickerController = (
  props: DatePickerProps & Pick<ControllerProps, 'name' | 'rules' | 'defaultValue' | 'control'>,
): React.ReactNode => {
  const { name, rules, defaultValue, onBlur: onBlurProps, control: controlProp, ...rest } = props
  //const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={controlProp}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onBlur, onChange, value } }) => (
        <DatePicker
          onChange={val => onChange(val)}
          value={value}
          onBlur={e => {
            onBlur()
            onBlurProps?.(e)
          }}
          {...rest}
        />
      )}
    />
  )
}
