import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import { Input } from "./ui/input"

interface DebouncedSearchProps {
  onSearch: (value: string) => void
  delay?: number
  placeholder?: string
}

export function DebouncedSearch({
  onSearch,
  delay = 500,
  placeholder = "Search by product name",
}: DebouncedSearchProps) {
  const [value, setValue] = useState("")

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      onSearch(value.trim().toLowerCase())
    }, delay)

    return () => window.clearTimeout(timeoutId)
  }, [delay, onSearch, value])

  return (
    <div className="relative w-full md:max-w-xs">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        className="h-10 pl-9"
      />
    </div>
  )
}
