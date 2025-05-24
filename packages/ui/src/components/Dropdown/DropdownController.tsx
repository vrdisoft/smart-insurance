'use client'
import { Controller, ControllerProps, useFormContext } from 'react-hook-form'

import { Dropdown, DropdownPropsType } from './Dropdown'

export const DropdownController = (
  props: DropdownPropsType & Pick<ControllerProps, 'name' | 'rules' | 'defaultValue'>,
): React.ReactNode => {
  const { name, rules, defaultValue, onChange: onChangeProps, onBlur: onBlurProps, ...rest } = props
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onBlur, onChange, value } }) => (
        <Dropdown
          onChange={e => {
            onChange(e)
            onChangeProps?.(e)
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
