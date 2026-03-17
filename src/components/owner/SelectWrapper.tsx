import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
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
  const value = form.watch(name)

  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>

      <Select
        value={value as string}
        onValueChange={(val) =>
          form.setValue(name, val as any, {
            shouldValidate: true,
            shouldDirty: true,
          })
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={value || placeholder} />
        </SelectTrigger>

        <SelectContent className="bg-background-light">
          {values.map((Value, i) => (
            <div key={Value}>
              <SelectItem
                value={Value}
                className="hover:bg-gray-200 cursor-pointer"
              >
                {Value}
              </SelectItem>

              {values.length !== i + 1 && (
                <SelectSeparator className="bg-gray-200" />
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
