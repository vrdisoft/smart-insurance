'use client'
import { Controller, ControllerProps, useFormContext } from 'react-hook-form'

import { Radio, RadioProps } from './Radio'

export const RadioController = (
  props: RadioProps & Pick<ControllerProps, 'name' | 'rules' | 'defaultValue' | 'control'>,
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
        <Radio
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
