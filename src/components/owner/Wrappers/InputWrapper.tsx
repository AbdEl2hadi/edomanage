import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>
  name: Path<T>
  label: string
  placeholder?: string
  type?: string
}

export default function InputWrapper<T extends FieldValues>({
  form,
  name,
  type,
  label,
  placeholder,
}: Props<T>) {
  const error = form.formState.errors[name]
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[#111318] dark:text-gray-200 text-sm font-medium">
        {label}
      </label>
      <input
        className={`w-full h-11 rounded-lg bg-[#f0f2f4] dark:bg-gray-800 border-none px-4 text-[#111318] dark:text-white placeholder:text-[#9ca3af] focus:ring-2 focus:ring-primary/50 transition-all ${error ? 'ring-2 ring-red-500' : 'ring-primary/50'}`}
        placeholder={placeholder}
        type={type ? type : 'texy'}
        {...form.register(name)}
      />
      {error && (
        <p className="text-sm text-red-500">{error.message?.toString()}</p>
      )}
    </div>
  )
}
