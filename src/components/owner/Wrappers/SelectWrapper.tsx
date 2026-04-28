import { Label } from '../../ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '../../ui/select'
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>
  label: string
  name: Path<T>
  values: Array<string>
  placeholder?: string
}

export default function SelectWrapper<T extends FieldValues>({
  form,
  label,
  name,
  values,
  placeholder,
}: Props<T>) {
  const error = form.formState.errors[name]
  const value = form.getValues(name)

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-sm font-semibold tracking-tight text-foreground/90">
        {label}
      </Label>

      <Select
        value={value as string}
        onValueChange={(val) =>
          form.setValue(name, val as any, {
            shouldValidate: true,
            shouldDirty: true,
          })
        }
      >
        <SelectTrigger className="text-[#111318] dark:text-white w-full px-3 text-left bg-[#f0f2f4] dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-400 transition-all">
          <SelectValue
            placeholder={value ? value : placeholder}
            className="h-10"
          />
        </SelectTrigger>

        <SelectContent
          className="bg-white dark:bg-gray-800 border border-gray-200 rounded-lg shadow-lg p-1"
          sideOffset={6}
        >
          {values.map((item, i) => (
            <div key={item}>
              <SelectItem
                value={item}
                className="px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors text-[#111318] dark:text-white"
              >
                {item}
              </SelectItem>

              {values.length !== i + 1 && (
                <SelectSeparator className="bg-gray-200 my-1" />
              )}
            </div>
          ))}
        </SelectContent>
      </Select>

      {error && (
        <p className="text-sm text-red-500">{error.message?.toString()}</p>
      )}
    </div>
  )
}
