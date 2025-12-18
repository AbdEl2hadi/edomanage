import useSideBarStore from '../services/store/sidebar_show_store'
import NotificationList from './notificationList'

export default function TopNav() {
  const toggleSideBar = useSideBarStore((state) => state.toggle)
  const isOpen = useSideBarStore((state) => state.isOpen)
  return (
    <header className="sticky z-10 top-0 flex items-center justify-between border-b border-[#e7ebf3] dark:border-gray-800 bg-surface-light dark:bg-surface-dark px-6 py-5 shrink-0">
      {/* Mobile Menu Toggle (Visible only on small screens) */}
      <button
        className="mr-6 mt-1.5 lg:hidden text-[#4c669a] cursor-pointer"
        onClick={toggleSideBar}
      >
        <span className="material-symbols-outlined">
          {isOpen ? 'close' : 'menu'}
        </span>
      </button>
      {/* Search Bar */}
      <div className="hidden w-96 lg:flex items-center gap-2 bg-background-light dark:bg-gray-800 px-3 py-3.5 rounded-lg ">
        <span
          className="material-symbols-outlined text-[#4c669a]"
          style={{ fontSize: '20px' }}
        >
          search
        </span>
        <input
          className="bg-transparent border-none outline-none text-sm w-full text-[#0d121b] dark:text-white placeholder-[#4c669a] focus:ring-0"
          placeholder="Search for anything..."
          type="text"
        />
      </div>
      <div className="flex items-center gap-4 ml-auto">
        <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-[#4c669a] transition-colors cursor-pointer">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: '24px' }}
          >
            chat_bubble
          </span>
        </button>
        <div className="relative group">
          <NotificationList />
        </div>
      </div>
    </header>
  )
}
