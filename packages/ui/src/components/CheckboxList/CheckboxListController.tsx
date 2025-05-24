'use client'
import { Controller, ControllerProps, useFormContext } from 'react-hook-form'

import { CheckboxList, CheckboxListProps } from './CheckboxList'

export const CheckboxListController = (
  props: CheckboxListProps & Pick<ControllerProps, 'name' | 'rules' | 'defaultValue' | 'control'>,
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
        <CheckboxList
          onChange={val => {
            onChange(val)
            onChangeProps?.(val)
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
