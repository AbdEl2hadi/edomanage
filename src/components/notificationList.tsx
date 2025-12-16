

import { Activity, useState } from 'react';



export default function NotificationList() {
	const [isOpen, setIsOpen] = useState(false);

	

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-[#4c669a] transition-colors cursor-pointer">
        <span
          className="material-symbols-outlined"
          style={{ fontSize: '24px' }}
        >
          notifications
        </span>
        <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border border-white dark:border-gray-900"></span>
      </button>
			<Activity mode={isOpen ? 'visible' : 'hidden'}  >
      <div className="absolute right-0 top-full mt-3 w-80 sm:w-96 bg-white dark:bg-[#151b2b] rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 z-50 overflow-hidden transform origin-top-right transition-all">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
          <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
            Notifications
          </h3>
          <div className="flex gap-2">
            <button className="text-xs text-primary hover:text-blue-700 dark:hover:text-blue-400 font-medium transition-colors">
              Mark all read
            </button>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <button className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
              Clear all
            </button>
          </div>
        </div>
        <div className="max-h-95 overflow-y-auto custom-scrollbar">
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
                Your draft "Anti-Bullying Policy 2024" has been reviewed and
                approved by the board.
              </p>
              <span className="text-[10px] text-slate-400 mt-1">
                10 mins ago
              </span>
            </div>
          </div>
          <div className="flex gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-100 dark:border-slate-800/50 cursor-pointer bg-blue-50/30 dark:bg-blue-900/10">
            <div className="shrink-0 mt-1">
              <div className="size-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                <span className="material-symbols-outlined text-[18px]">
                  warning
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-0.5 w-full">
              <div className="flex justify-between items-start">
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  System Maintenance
                </p>
                <span className="size-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                Scheduled maintenance on Saturday, 10 PM to 12 AM. Portal will
                be unavailable.
              </p>
              <span className="text-[10px] text-slate-400 mt-1">
                1 hour ago
              </span>
            </div>
          </div>
          <div className="flex gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-100 dark:border-slate-800/50 cursor-pointer">
            <div className="shrink-0 mt-1">
              <div className="size-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                <span className="material-symbols-outlined text-[18px]">
                  check_circle
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-0.5 w-full">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Payment Processed
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                Monthly subscription payment for "Premium Plan" was successful.
              </p>
              <span className="text-[10px] text-slate-400 mt-1">Yesterday</span>
            </div>
          </div>
          <div className="flex gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
            <div className="shrink-0 mt-1">
              <div className="size-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <span className="material-symbols-outlined text-[18px]">
                  school
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-0.5 w-full">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                New Teacher Registration
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                Sarah Jenkins has completed registration. Pending approval.
              </p>
              <span className="text-[10px] text-slate-400 mt-1">
                2 days ago
              </span>
            </div>
          </div>
        </div>
        <div className="p-2 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 text-center">
          <button className="text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors py-1 w-full">
            View All Notifications
          </button>
        </div>
      </div>
			</Activity>
    </>
  )
}
