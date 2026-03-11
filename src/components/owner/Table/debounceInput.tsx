import { useEffect, useState } from 'react'
import type { InputHTMLAttributes } from 'react'

export function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 200,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = useState<string | number>(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value, debounce, onChange])

  return (
    <input
      {...props}
      value={
        props.type === 'number'
          ? (value as number | undefined)
          : (value as string)
      }
      onChange={(e) => {
        if (e.target.value === '') return setValue('')

        if (props.type === 'number') {
          const num = e.target.valueAsNumber
          setValue(Number.isNaN(num) ? '' : num)
        } else {
          setValue(e.target.value)
        }
      }}
    />
  )
}
