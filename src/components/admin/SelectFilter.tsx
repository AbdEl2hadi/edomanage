import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

type props = {
  value: string
  onChange: (value: string) => void
  options?: Array<Record<string, string> | string>
}

export default function SelectFilter({ value, onChange, options }: props) {
  return (
    <Select
      defaultValue={`${value}`}
      onValueChange={(v) => onChange(String(v))}
    >
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Select a size" />
      </SelectTrigger>
      <SelectContent className="bg-background-light dark:bg-background-dark dark:text-white">
        {options?.map((filterOption, index) => {
          const key =
            typeof filterOption === 'string'
              ? `${filterOption}-${index}`
              : `${Object.values(filterOption)[0]}-${index}`

          return (
            <SelectItem
              key={key}
              value={`${filterOption}`}
              className="bg-background-light dark:bg-background-dark"
            >
              {filterOption && typeof filterOption === 'object'
                ? Object.values(filterOption)[0]
                : filterOption}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
