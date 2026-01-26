export type UICardType = {
  id: string
  iconName: string
  iconColor: string
  stateIcon: string
  percentage: number
  cardTitle: string
  info: string
}

export default function UICardComponent(props: UICardType) {
  return (
    <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-gray-800 shadow-sm hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/20 dark:hover:border-gray-700 group">
      <div className="flex justify-between items-start mb-4">
        <div
          className={`p-2 ${props.iconColor == 'blue' ? 'bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400' : props.iconColor == 'purple' ? 'bg-purple-50 dark:bg-purple-500/20  text-purple-600 dark:text-purple-400' : props.iconColor == 'green' ? 'bg-green-50 dark:bg-green-500/20  text-green-600 dark:text-green-400' : 'bg-orange-50 dark:bg-orange-500/20  text-orange-600 dark:text-orange-400'} rounded-lg group-hover:scale-110 transition-transform`}
        >
          <span className="material-symbols-outlined">{props.iconName}</span>
        </div>
        <span
          className={`flex items-center text-xs font-bold   px-2 py-1 rounded-full border border-transparent  ${props.percentage > 0 ? 'text-green-600 dark:text-green-400 dark:border-green-500/10 bg-green-50 dark:bg-green-500/10' : 'text-red-600 dark:text-red-400 dark:border-red-500/10 bg-red-50 dark:bg-red-500/10'}`}
        >
          <span className="material-symbols-outlined text-sm mr-1">
            {props.stateIcon}
          </span>
          {props.percentage}%
        </span>
      </div>
      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
        {props.cardTitle}
      </p>
      <h3 className="text-2xl font-bold text-[#111318] dark:text-white mt-1">
        {props.info}
      </h3>
    </div>
  )
}
