'use client'
import { Controller, ControllerProps, useFormContext } from 'react-hook-form'

import { Input, InputProps } from './Input'

export const InputController = (
  props: InputProps & Pick<ControllerProps, 'name' | 'rules' | 'defaultValue'>,
): React.ReactNode => {
  const { name, rules, defaultValue, onBlur: onBlurProps, onChange: onChangeProps, ...rest } = props
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onBlur, onChange, value } }) => (
        <Input
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
