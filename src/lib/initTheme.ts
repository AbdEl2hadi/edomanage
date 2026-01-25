const storageKey = 'theme'

function getStoredTheme(): 'dark' | 'light' | null {
  const stored = localStorage.getItem(storageKey)
  if (stored === 'dark' || stored === 'light') {
    return stored
  }
  return null
}

function detectSystemTheme(): 'dark' | 'light' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function applyTheme(theme: 'dark' | 'light') {
  const root = document.documentElement
  root.classList.remove('light', 'dark')
  root.classList.add(theme)

  const metaTheme = document.querySelector('meta[name="theme-color"]')
  if (metaTheme) {
    metaTheme.setAttribute('content', theme === 'dark' ? '#101622' : '#f6f6f8')
  }
}

;(function syncInitialTheme() {
  const theme = getStoredTheme() ?? detectSystemTheme()
  applyTheme(theme)
})()
