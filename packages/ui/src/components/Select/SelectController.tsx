'use client'
import { Controller, ControllerProps, useFormContext } from 'react-hook-form'

import { Select, SelectProps } from './Select'

export const SelectController = (
  props: SelectProps & Pick<ControllerProps, 'name' | 'rules' | 'defaultValue' | 'control'>,
): React.ReactNode => {
  const {
    name,
    rules,
    defaultValue,
    onBlur: onBlurProps,
    onChange: onChangeProps,
    control: controlProp,
    ...rest
  } = props
  //const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={controlProp}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onBlur, onChange, value } }) => (
        <Select
          onChange={val => {
            onChangeProps?.(value)
            onChange(val)
          }}
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
