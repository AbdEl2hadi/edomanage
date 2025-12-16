




export default function NotificationCard() {
					

  return (
    <div className="flex gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-100 dark:border-slate-800/50 cursor-pointer bg-blue-50/30 dark:bg-blue-900/10">
      <div className="shrink-0 mt-1">
        <div className="size-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
          <span className="material-symbols-outlined text-[18px]">
            campaign
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-0.5 w-full">
        <div className="flex justify-between items-start">
          <p className="text-sm font-medium text-slate-900 dark:text-white">
            New Policy Published
          </p>
          <span className="size-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
          Your draft "Anti-Bullying Policy 2024" has been reviewed and approved
          by the board.
        </p>
        <span className="text-[10px] text-slate-400 mt-1">10 mins ago</span>
      </div>
    </div>
  )
}
