import { useCallback } from 'react'
import { SearchBar } from './SearchBar'
import { NavButton } from './NavButton'
import { UserProfile } from './UserProfile'
import type { SideBarContentProps } from './types'

export function SideBarContent({
  list,
  handleClick,
  avatarSrc,
  localPath,
  setChoosen,
  setOpen,
  isDesktop,
  handleLogout,
}: SideBarContentProps) {
  const handleNavClick = useCallback(
    (itemKey: string) => {
      handleClick(itemKey)
      if (!isDesktop) {
        setOpen(false)
      }
    },
    [handleClick, setOpen, isDesktop],
  )

  const handleProfileClick = useCallback(() => {
    if (!isDesktop) {
      setOpen(false)
    }
    setChoosen('settings')
  }, [setOpen, setChoosen, isDesktop])

  return (
    <>
      <div className="flex flex-col gap-8 overflow-hidden">
        {/* Brand */}
        <div className="flex items-center gap-3 px-2">
          <div className="size-8 rounded bg-primary flex items-center justify-center text-white">
            <span className="material-symbols-outlined">school</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            EduManage
          </h2>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2" aria-label="Primary">
          {/* Search Bar - visible only on desktop and tablet */}
          <SearchBar />

          {/* Navigation Items */}
          {list.length > 0 ? (
            list.map((item) => (
              <NavButton
                key={item.key}
                item={item}
                onClick={() => handleNavClick(item.key)}
              />
            ))
          ) : (
            <p className="text-xs text-slate-500 p-2">No items available</p>
          )}
        </nav>
      </div>

      {/* User Profile */}
      <UserProfile
        avatarSrc={avatarSrc}
        localPath={localPath}
        onProfileClick={handleProfileClick}
        onLogout={handleLogout}
      />
    </>
  )
}
