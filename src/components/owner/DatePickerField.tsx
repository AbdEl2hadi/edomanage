import { format, isValid, parseISO } from 'date-fns'
import { Calendar as CalendarIcon, ChevronDown, X } from 'lucide-react'
import type {
  FieldValues,
  Path,
  PathValue,
  UseFormReturn,
} from 'react-hook-form'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>
  name: Path<T>
  label: string
  placeholder?: string
}

export default function DatePickerField<T extends FieldValues>({
  form,
  name,
  label,
  placeholder = 'Select date',
}: Props<T>) {
  const stringValue = form.watch(name) as string | undefined
  const dateValue = stringValue ? parseISO(stringValue) : undefined
  const safeDate = dateValue && isValid(dateValue) ? dateValue : undefined
  const error = form.formState.errors[name]

  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-sm font-semibold tracking-tight text-foreground/90">
        {label}
      </Label>

      <Popover modal={true}>
        <div className="relative group">
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal h-10 px-3 transition-all',
                'bg-white border border-gray-300 hover:bg-gray-50 focus:ring-2 focus:ring-blue-400',
                !safeDate && 'text-gray-400',
                error ? 'ring-2 ring-red-500' : 'ring-primary/50',
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-gray-500 group-hover:text-blue-500 transition-colors" />
              <span className="truncate flex-1">
                {safeDate ? format(safeDate, 'PPP') : placeholder}
              </span>
              <ChevronDown className="h-4 w-4 opacity-50 transition-transform group-data-[state=open]:rotate-180" />
            </Button>
          </PopoverTrigger>

          {safeDate && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                form.setValue(name, '' as PathValue<T, Path<T>>, {
                  shouldValidate: true,
                })
              }}
              className="absolute right-9 top-1/2 -translate-y-1/2 p-1 rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-all"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <PopoverContent
          className="w-auto p-2 bg-white border border-gray-200 rounded-lg shadow-lg"
          align="start"
          sideOffset={6}
        >
          <Calendar
            mode="single"
            selected={safeDate}
            onSelect={(date) => {
              const formatted = date ? format(date, 'yyyy-MM-dd') : ''
              form.setValue(name, formatted as PathValue<T, Path<T>>, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }}
            initialFocus
            className="bg-white"
          />
        </PopoverContent>
      </Popover>

      {error && (
        <p className="text-sm text-red-500">{error.message?.toString()}</p>
      )}
    </div>
  )
}
