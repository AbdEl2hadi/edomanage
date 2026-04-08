import { Link } from '@tanstack/react-router'
import Avatar from '@mui/material/Avatar'
import type { UserProfileProps } from './types'

export function UserProfile({
  avatarSrc,
  localPath,
  onProfileClick,
  onLogout,
}: UserProfileProps) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 p-2.5">
      <Link onClick={onProfileClick} to={`/${localPath}/settings` as any}>
        <Avatar
          alt="profile picture"
          src={avatarSrc}
          sx={{ width: 36, height: 36 }}
        />
      </Link>
      <div className="flex flex-col min-w-0 flex-1">
        <h1 className="text-slate-900 dark:text-slate-100 text-sm font-semibold truncate">
          Mr. Anderson
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-xs font-normal truncate">
          Science Teacher
        </p>
      </div>
      <button
        onClick={onLogout}
        className="text-slate-500 dark:text-slate-400 hover:text-primary cursor-pointer transition-colors"
        aria-label="Logout"
      >
        <span
          className="material-symbols-outlined"
          style={{ fontSize: '20px' }}
        >
          logout
        </span>
      </button>
    </div>
  )
}
