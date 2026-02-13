import { Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useTheme } from '@/features/theme/theme-provider'

export function ModeToggle() {
  const { setTheme, theme } = useTheme()


  return (
    <Button
      variant="outline"
      size="icon"
      onClick={()=> setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative cursor-pointer p-5 rounded-full bg-white hover:bg-amber-50 border-slate-300 shadow-sm hover:border-amber-300 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all text-amber-500 dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all text-blue-400 dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
