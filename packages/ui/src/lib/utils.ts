import ctl from '@netlify/classnames-template-literals'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return ctl(twMerge(clsx(inputs)))
}

export const numberChecker = (number: string) => {
  const regex = /^\d+$/
  return regex.test(number)
}

export const regexps = {
  OnlyNumbers: /^\d+((\.|\/|-)\d+)?$/,
  Email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
} as const

export const makeId = (length: number): string => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let index = 0; index < length; index++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
