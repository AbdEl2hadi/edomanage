import { ChevronDownIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Label } from '../ui/label'
import type { FC } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'

interface DatePickerFieldProps {
  name: string
  label: string
  form: UseFormReturn<any> // pass your studentForm
}

const DatePickerField: FC<DatePickerFieldProps> = ({ name, label, form }) => {
  const selectedDate = form.getValues(name)
    ? new Date(form.getValues(name))
    : undefined

  const handleSelect = (date: Date | undefined) => {
    if (date) form.setValue(name, date.toISOString())
  }

  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            data-empty={!selectedDate}
            className="w-53 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
          >
            {selectedDate ? (
              format(selectedDate, 'PPP')
            ) : (
              <span>Pick a date</span>
            )}
            <ChevronDownIcon data-icon="inline-end" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-auto p-0 bg-background-light"
          align="start"
        >
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            defaultMonth={selectedDate}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DatePickerField
