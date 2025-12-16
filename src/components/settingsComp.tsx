export default function SettingsComp() {
  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:px-12">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Breadcrumbs */}
        <nav className="flex text-sm font-medium text-slate-500 dark:text-slate-400">
          <a className="hover:text-primary transition-colors" href="#">
            Home
          </a>
          <span className="mx-2">/</span>
          <span className="text-slate-900 dark:text-white">Settings</span>
        </nav>
        {/* Page Heading */}
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Account Settings
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Manage your personal information, security preferences, and
            notifications.
          </p>
        </div>
        {/* Layout: Settings Nav + Forms */}
        <div className="flex flex-col lg:flex-row gap-8 mt-6">
          {/* Settings Sidebar (Sub-nav) */}
          <aside className="w-full lg:w-64 shrink-0">
            <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 sticky top-4">
              <a
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white dark:bg-surface-dark shadow-sm border border-slate-200 dark:border-slate-700 lg:border-l-4 lg:border-l-primary lg:border-y-0 lg:border-r-0 lg:shadow-none lg:bg-transparent lg:dark:bg-transparent lg:rounded-none lg:px-4 text-primary font-bold whitespace-nowrap"
                href="#"
              >
                <span className="material-symbols-outlined">person</span>
                Public Profile
              </a>
              <a
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white dark:bg-surface-dark shadow-sm border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800 lg:border-none lg:shadow-none lg:bg-transparent lg:dark:bg-transparent lg:rounded-none lg:px-4 font-medium transition-colors whitespace-nowrap"
                href="#"
              >
                <span className="material-symbols-outlined">lock</span>
                Security
              </a>
              <a
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white dark:bg-surface-dark shadow-sm border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800 lg:border-none lg:shadow-none lg:bg-transparent lg:dark:bg-transparent lg:rounded-none lg:px-4 font-medium transition-colors whitespace-nowrap"
                href="#"
              >
                <span className="material-symbols-outlined">notifications</span>
                Notifications
              </a>
            </nav>
          </aside>
          {/* Main Form Area */}
          <div className="flex-1 space-y-8">
            {/* Profile Header & Picture */}
            <section className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                Profile Picture
              </h2>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative group">
                  <div
                    className="h-28 w-28 rounded-full bg-cover bg-center border-4 border-slate-50 dark:border-slate-700 shadow-inner"
                    data-alt="Large student avatar"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD1c_ApVY14UriiPyY2QEInqTWSYEgz7EnNEjopgQDCLNh6GGBzzN0f7yfVaznMYfXgKKQ7lIlAXhf6eRt-LUQHHJLWb8zZBzlt2I_jB1GxrB4WwsDCpFtvgGUqh4QKwfhOxuZlgOxwoMUpDe58pFzGcR-X6_NqvxzU8ugGDUkJJBkDba6x1HeAzS4-deXZ1w14TnOaTLIH-u6_xX1QRkxZxpp0VKWn1fFkm-dAxXVihUEKtWAV-y6dCdN-dau7acr_DkbpyNCaj_w")',
                    }}
                  ></div>
                  <button
                    className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                    title="Upload new photo"
                  >
                    <span className="material-symbols-outlined text-sm">
                      edit
                    </span>
                  </button>
                </div>
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Alex Johnson
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 mb-4">
                    11th Grade Student
                  </p>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-sm rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                      Remove
                    </button>
                    <button className="px-4 py-2 bg-primary/10 text-primary font-bold text-sm rounded-lg hover:bg-primary/20 transition-colors">
                      Change Photo
                    </button>
                  </div>
                </div>
              </div>
            </section>
            {/* Personal Information */}
            <section className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Personal Information
                </h2>
                <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold rounded uppercase">
                  Verified
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Full Name
                  </label>
                  <input
                    className="w-full rounded-lg bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-primary focus:ring-primary"
                    type="text"
                    defaultValue="Alex Johnson"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Email Address
                  </label>
                  <input
                    className="w-full rounded-lg bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-primary focus:ring-primary"
                    type="email"
                    defaultValue="alex.j@schoolexample.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Phone Number
                  </label>
                  <input
                    className="w-full rounded-lg bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-primary focus:ring-primary"
                    type="tel"
                    defaultValue="+1 (555) 012-3456"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <input
                      className="w-full rounded-lg bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-primary focus:ring-primary"
                      type="date"
                      defaultValue="2007-04-15"
                    />
                  </div>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Home Address
                  </label>
                  <textarea
                    className="w-full rounded-lg bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-primary focus:ring-primary resize-none"
                    rows={2}
                    defaultValue="123 Maple Avenue, Springfield, IL 62704"
                  ></textarea>
                </div>
              </div>
            </section>
            {/* Academic Details (Read Only) */}
            <section className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                Academic Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Student ID
                  </label>
                  <div className="w-full px-4 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-transparent text-slate-500 dark:text-slate-400 font-mono text-sm cursor-not-allowed">
                    482910
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Current Grade
                  </label>
                  <div className="w-full px-4 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-transparent text-slate-500 dark:text-slate-400 text-sm cursor-not-allowed">
                    11th Grade - Class B
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Homeroom Teacher
                  </label>
                  <div className="w-full px-4 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-transparent text-slate-500 dark:text-slate-400 text-sm cursor-not-allowed">
                    Mrs. Sarah Connor
                  </div>
                </div>
              </div>
            </section>
            {/* Notifications */}
            <section className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Notification Preferences
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                Choose how you want to be notified about school activities.
              </p>
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      Assignment Due Dates
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Receive alerts 24h before an assignment is due.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      defaultChecked
                      className="sr-only peer"
                      type="checkbox"
                      value=""
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-800 w-full"></div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      New Grades Posted
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Get notified immediately when a teacher grades your work.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      defaultChecked
                      className="sr-only peer"
                      type="checkbox"
                      value=""
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-800 w-full"></div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      School Announcements
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Important news regarding school closures or events.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      defaultChecked
                      className="sr-only peer"
                      type="checkbox"
                      value=""
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-800 w-full"></div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      Email Marketing
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Receive newsletters and promotional content.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input className="sr-only peer" type="checkbox" value="" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </section>
            {/* Security Section */}
            <section className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                Security
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    New Password
                  </label>
                  <input
                    className="w-full rounded-lg bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-primary focus:ring-primary"
                    placeholder="••••••••"
                    type="password"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Confirm Password
                  </label>
                  <input
                    className="w-full rounded-lg bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-primary focus:ring-primary"
                    placeholder="••••••••"
                    type="password"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                <div className="flex gap-3 items-center">
                  <div className="p-2 bg-white dark:bg-slate-800 rounded shadow-sm text-slate-700 dark:text-slate-300">
                    <span className="material-symbols-outlined">
                      smartphone
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      Two-Factor Authentication
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Add an extra layer of security to your account.
                    </p>
                  </div>
                </div>
                <button className="text-primary text-sm font-bold hover:underline">
                  Enable
                </button>
              </div>
            </section>
            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button className="px-6 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                Cancel
              </button>
              <button className="px-6 py-2.5 rounded-lg bg-primary text-white font-bold hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all transform hover:scale-[1.02]">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Spacer */}
      <div className="h-20"></div>
    </main>
  )
}
