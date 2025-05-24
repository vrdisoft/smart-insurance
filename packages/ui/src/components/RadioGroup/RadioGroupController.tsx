'use client'
import { Controller, ControllerProps, useFormContext } from 'react-hook-form'

import { RadioGroup, RadioGroupProps } from './RadioGroup'

export const RadioGroupController = (
  props: RadioGroupProps & Pick<ControllerProps, 'name' | 'rules' | 'defaultValue' | 'control'>,
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
        <RadioGroup
          name={name}
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
