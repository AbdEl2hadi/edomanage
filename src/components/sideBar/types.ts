export interface SidebarItem {
  name: string
  icon: string
  key: string
  active: boolean
}

export interface SideBarProps {
  info?: {
    list?: Array<{ name: string; icon: string }>
    layout?: string
  }
}

export interface SideBarContentProps {
  list: Array<SidebarItem>
  handleClick: (key: string) => void
  avatarSrc: string | undefined
  localPath: string
  setChoosen: (key: string) => void
  setOpen: (open: boolean) => void
  isDesktop: boolean
  handleLogout: () => void
}

export interface NavButtonProps {
  item: SidebarItem
  onClick: () => void
}

export interface UserProfileProps {
  avatarSrc: string | undefined
  localPath: string
  onProfileClick: () => void
  onLogout: () => void
}
