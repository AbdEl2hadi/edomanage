// import { ChevronDownIcon } from 'lucide-react'
// import { format } from 'date-fns'
// import { Label } from '../ui/label'
// import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover'
// import { Button } from '@/components/ui/button'
// import { Calendar } from '@/components/ui/calendar'

// interface DatePickerFieldProps<T extends FieldValues> {
//   name: Path<T>
//   label: string
//   form: UseFormReturn<T>
//   placeholder?: string
// }

// export default function DatePickerField<T extends FieldValues>({
//   name,
//   label,
//   form,
//   placeholder = 'Select a date',
// }: DatePickerFieldProps<T>) {
//   const watchedDate = form.watch(name) as string | undefined

//   const selectedDate: Date | undefined = watchedDate
//     ? new Date(watchedDate)
//     : undefined

//   const handleSelect = (date: Date | undefined) => {
//     form.setValue(name, date ? format(date, 'yyyy-MM-dd') : '')
//   }

//   const error = form.formState.errors[name]

//   return (
//     <div className="flex flex-col gap-2">
//       <Label>{label}</Label>
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button
//             variant="outline"
//             data-empty={!selectedDate}
//             className={`w-full h-10 justify-between text-left font-normal data-[empty=true]:text-muted-foreground ${
//               error ? 'ring-2 ring-red-500' : ''
//             }`}
//           >
//             <span>{watchedDate ? watchedDate : placeholder}</span>
//             <ChevronDownIcon data-icon="inline-end" />
//           </Button>
//         </PopoverTrigger>

//         <PopoverContent
//           className="w-auto p-0 bg-background-light"
//           align="start"
//         >
//           <Calendar
//             mode="single"
//             selected={selectedDate}
//             onSelect={handleSelect}
//             defaultMonth={selectedDate}
//           />
//         </PopoverContent>
//       </Popover>

//       {error && (
//         <p className="text-sm text-red-500">{error.message?.toString()}</p>
//       )}
//     </div>
//   )
// }

// import { ChevronDownIcon } from 'lucide-react'
// import { format } from 'date-fns'
// import { Label } from '../ui/label'
// import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover'
// import { Button } from '@/components/ui/button'
// import { Calendar } from '@/components/ui/calendar'

// interface DatePickerFieldProps<T extends FieldValues> {
//   name: Path<T>
//   label: string
//   form: UseFormReturn<T>
//   placeholder?: string
// }

// export default function DatePickerField<T extends FieldValues>({
//   name,
//   label,
//   form,
//   placeholder = 'Select a date',
// }: DatePickerFieldProps<T>) {
//   const watchedDate = form.watch(name) as string | undefined

//   const selectedDate: Date | undefined = watchedDate
//     ? new Date(watchedDate)
//     : undefined

//   const handleSelect = (date: Date | undefined) => {
//     form.setValue(name, date ? format(date, 'yyyy-MM-dd') : '')
//   }

//   const error = form.formState.errors[name]

//   return (
//     <div className="flex flex-col gap-2">
//       <Label>{label}</Label>
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button
//             variant="outline"
//             data-empty={!selectedDate}
//             className={`w-full h-10 justify-between text-left font-normal data-[empty=true]:text-muted-foreground ${
//               error ? 'ring-2 ring-red-500' : ''
//             }`}
//           >
//             <span>{watchedDate ? watchedDate : placeholder}</span>
//             <ChevronDownIcon data-icon="inline-end" />
//           </Button>
//         </PopoverTrigger>

//         <PopoverContent
//           className="w-auto p-0 bg-background-light"
//           align="start"
//         >
//           <Calendar
//             mode="single"
//             selected={selectedDate}
//             onSelect={handleSelect}
//             defaultMonth={selectedDate}
//           />
//         </PopoverContent>
//       </Popover>

//       {error && (
//         <p className="text-sm text-red-500">{error.message?.toString()}</p>
//       )}
//     </div>
//   )
// }


// import { ChevronDownIcon } from 'lucide-react'
// import { format } from 'date-fns'
// import { Label } from '../ui/label'
// import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover'
// import { Button } from '@/components/ui/button'
// import { Calendar } from '@/components/ui/calendar'

// interface DatePickerFieldProps<T extends FieldValues> {
//   name: Path<T>
//   label: string
//   form: UseFormReturn<T>
//   placeholder?: string
// }

// export default function DatePickerField<T extends FieldValues>({
//   name,
//   label,
//   form,
//   placeholder = 'Select a date',
// }: DatePickerFieldProps<T>) {
//   // Watch the value in the form (typed as Date | undefined)
//   const watchedDate = form.watch(name) as Date | undefined

//   // When a date is selected in the calendar, store the Date object directly
//   const handleSelect = (date: Date | undefined) => {
//     form.setValue(name, date)
//   }

//   // Get the error for this field
//   const error = form.formState.errors[name]

//   return (
//     <div className="flex flex-col gap-2">
//       <Label>{label}</Label>
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button
//             variant="outline"
//             data-empty={!watchedDate}
//             className={`w-full h-10 justify-between text-left font-normal data-[empty=true]:text-muted-foreground ${
//               error ? 'ring-2 ring-red-500' : ''
//             }`}
//           >
//             <span>
//               {watchedDate ? format(watchedDate, 'yyyy-MM-dd') : placeholder}
//             </span>
//             <ChevronDownIcon data-icon="inline-end" />
//           </Button>
//         </PopoverTrigger>

//         <PopoverContent
//           className="w-auto p-0 bg-background-light"
//           align="start"
//         >
//           <Calendar
//             mode="single"
//             selected={watchedDate}
//             onSelect={handleSelect}
//             defaultMonth={watchedDate}
//           />
//         </PopoverContent>
//       </Popover>

//       {error && (
//         <p className="text-sm text-red-500">{error.message?.toString()}</p>
//       )}
//     </div>
//   )
// }

// import { ChevronDownIcon } from 'lucide-react'
// import { format, parseISO } from 'date-fns'
// import { Label } from '../ui/label'
// import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover'
// import { Button } from '@/components/ui/button'
// import { Calendar } from '@/components/ui/calendar'

// interface DatePickerFieldProps<T extends FieldValues> {
//   name: Path<T>
//   label: string
//   form: UseFormReturn<T>
//   placeholder?: string
// }

// export default function DatePickerField<T extends FieldValues>({
//   name,
//   label,
//   form,
//   placeholder = 'Select a date',
// }: DatePickerFieldProps<T>) {
//   // Watch the string value from the form
//   const watchedDateStr = form.watch(name) as string | undefined

//   // Convert string to Date for the calendar
//   const selectedDate: Date | undefined = watchedDateStr
//     ? parseISO(watchedDateStr)
//     : undefined

//   // When a date is selected, convert to string and store
//   const handleSelect = (date: Date | undefined) => {
//     form.setValue(name, date ? format(date, 'yyyy-MM-dd') : '')
//   }

//   const error = form.formState.errors[name]

//   return (
//     <div className="flex flex-col gap-2">
//       <Label>{label}</Label>
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button
//             variant="outline"
//             data-empty={!selectedDate}
//             className={`w-full h-10 justify-between text-left font-normal data-[empty=true]:text-muted-foreground ${
//               error ? 'ring-2 ring-red-500' : ''
//             }`}
//           >
//             <span>
//               {selectedDate ? format(selectedDate, 'yyyy-MM-dd') : placeholder}
//             </span>
//             <ChevronDownIcon data-icon="inline-end" />
//           </Button>
//         </PopoverTrigger>

//         <PopoverContent
//           className="w-auto p-0 bg-background-light"
//           align="start"
//         >
//           <Calendar
//             mode="single"
//             selected={selectedDate}
//             onSelect={handleSelect}
//             defaultMonth={selectedDate}
//           />
//         </PopoverContent>
//       </Popover>

//       {error && (
//         <p className="text-sm text-red-500">{error.message?.toString()}</p>
//       )}
//     </div>
//   )
// }