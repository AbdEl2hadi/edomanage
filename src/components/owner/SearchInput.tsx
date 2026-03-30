import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import useDebounce from '@/hooks/use-debounce'

type props = {
  value: string
  onSearch: (value:string) => void
}

export function SearchInput({
  value="",
  onSearch
}: props) {
  //   const { search } = Route.useSearch()
  const [searchKeywords, setSearchKeywords] = useState(value)
  const debouncedSearchKeywords = useDebounce(searchKeywords, 500)

  //   const navigate = Route.useNavigate()

  useEffect(() => {
    onSearch(debouncedSearchKeywords)
  }, [debouncedSearchKeywords])

  return (
    <Input
      className="w-90"
      value={searchKeywords}
      onChange={(e) => setSearchKeywords(e.target.value)}
      placeholder="Search"
    />
  )
}
