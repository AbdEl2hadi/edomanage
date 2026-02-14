import { createFileRoute } from '@tanstack/react-router'
import type { CalendarView } from '@/services/store/calendar_store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'
import { useCalendarStore } from '@/services/store/calendar_store'

type TaskType = 'class' | 'holiday' | 'deadline' | 'personal'

type Task = {
  id: string
  title: string
  time?: string
  type: TaskType
}
const calendarData: Record<number, Array<Task>> = {
  1: [
    {
      id: '1',
      title: 'Math R01',
      type: 'class',
      time: '09:00',
    },
  ],
  2: [
    {
      id: '1',
      title: 'Math R04',
      type: 'class',
      time: '11:00',
    },
  ],
  24: [
    {
      id: '1',
      title: 'Math R06',
      type: 'class',
      time: '14:00',
    },
  ],
  26: [
    {
      id: '1',
      title: 'Math R02',
      type: 'class',
    },
  ],
  3: [
    {
      id: '2',
      title: 'Math R01',
      time: '09:00',
      type: 'class',
    },
    {
      id: '3',
      title: 'Math R05',
      time: '13:00',
      type: 'class',
    },
  ],
  8: [
    {
      id: '2',
      title: 'Math R01',
      time: '09:00',
      type: 'class',
    },
    {
      id: '3',
      title: 'Math R05',
      time: '13:00',
      type: 'class',
    },
  ],
  11: [
    {
      id: '2',
      title: 'Math R01',
      time: '09:00',
      type: 'class',
    },
    {
      id: '3',
      title: 'Math R05',
      time: '13:00',
      type: 'class',
    },
  ],
  4: [
    {
      id: '4',
      title: 'Final Grade Submission',
      type: 'deadline',
    },
  ],
  5: [
    {
      id: '5',
      title: 'Parent-Teacher Meeting',
      time: '15:30',
      type: 'personal',
    },
  ],
  14: [
    {
      id: '4',
      title: 'Holiday ',
      type: 'holiday',
    },
  ],
  20: [
    {
      id: '4',
      title: 'History Essay Due',
      type: 'deadline',
    },
  ],
  31: [
    {
      id: '4',
      title: 'History Essay Due',
      type: 'deadline',
    },
  ],
  9: [
    {
      id: '4',
      title: 'History Essay Due',
      type: 'deadline',
    },
  ],
  22: [
    {
      id: '4',
      title: 'Math R08',
      time: '09:00',
      type: 'class',
    },
  ],
  19: [
    {
      id: '6',
      title: 'Works',
      time: '15:30',
      type: 'personal',
    },
  ],
  16: [
    {
      id: '6',
      title: 'Workout',
      time: '15:30',
      type: 'personal',
    },
  ],
  28: [
    {
      id: '6',
      title: 'Personal Meeting',
      time: '15:30',
      type: 'personal',
    },
  ],
}
export const Route = createFileRoute('/teacher/calendar')({
  component: TeacherCalendar,
  head: () => ({
    meta: [{ title: 'Teacher | Calendar - EduManage' }],
  }),
})

function TeacherCalendar() {
  const view = useCalendarStore((s) => s.view)
  const setView = useCalendarStore((s) => s.setView)
  const day = useCalendarStore((s) => s.selectedDay)

  return (
    <main className="flex-1 flex flex-col h-full overflow-y-auto relative">
      {/* Header */}
      <header className="shrink-0 bg-background-light dark:bg-background-dark z-10 p-6 pb-2">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-[#0d121b] dark:text-white text-3xl font-black leading-tight tracking-[-0.033em]">
              Academic Calendar
            </h1>
            <p className="text-[#4c669a] dark:text-[#94a3b8] text-sm font-normal">
              Manage your classes, exams, and events
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button className="h-10 cursor-pointer flex items-center justify-center rounded-lg bg-primary px-4 text-white text-sm font-bold shadow-md hover:bg-blue-700 gap-2">
              <span className="material-symbols-outlined text-[20px]">add</span>
              Add Event
            </Button>
          </div>
        </div>

        {/* Controls */}
        <CardContent className="flex flex-col lg:flex-row justify-between items-center gap-4 bg-white dark:bg-[#1a2230] p-2 rounded-xl shadow-sm border border-[#e7ebf3] dark:border-[#2a3441]">
          <div className="flex items-center gap-2 w-full lg:w-auto justify-between lg:justify-start">
            <Button
              variant="secondary"
              size="sm"
              className="h-9 px-3 rounded-lg bg-[#e7ebf3] dark:bg-[#2a3441] text-[#0d121b] dark:text-white text-sm font-bold hover:bg-[#dce2ee] dark:hover:bg-[#364252]"
            >
              Today
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="p-1.5 rounded-lg hover:bg-[#f8f9fc] dark:hover:bg-[#2a3441] text-[#0d121b] dark:text-white"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="p-1.5 rounded-lg hover:bg-[#f8f9fc] dark:hover:bg-[#2a3441] text-[#0d121b] dark:text-white"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </Button>
            <span className="text-lg font-bold text-[#0d121b] dark:text-white ml-2 hidden sm:block">
              January 2024
            </span>
          </div>

          <RadioGroup
            value={view}
            onValueChange={(v) => setView(v as CalendarView)}
            className="flex bg-[#e7ebf3] dark:bg-[#0d121b] p-1 rounded-lg w-full lg:w-auto"
          >
            {(['month', 'week', 'day'] as const).map((v) => (
              <label
                key={v}
                className={cn(
                  'cursor-pointer flex-1 lg:flex-none flex items-center justify-center px-4 py-1.5 rounded-md text-sm font-medium',
                  view === v
                    ? 'bg-white dark:bg-[#2a3441] text-primary shadow-sm'
                    : 'text-[#4c669a] dark:text-[#64748b]',
                )}
              >
                <RadioGroupItem value={v} className="sr-only" />
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </label>
            ))}
          </RadioGroup>
        </CardContent>
      </header>

      {/* Main */}
      <div className="flex-1 flex  p-6 pt-2 gap-4">
        {/* Calendar */}

        {view === 'month' && (
          <MonthCalendar
            selectedDay={day}
            onSelectDay={(d) => useCalendarStore.getState().setSelectedDay(d)}
          />
        )}
        {view === 'week' && (
          <WeekCalendar
            selectedDay={day}
            onSelectDay={(d) => useCalendarStore.getState().setSelectedDay(d)}
          />
        )}
        {view === 'day' && <DayView day={day} />}
      </div>
    </main>
  )
}
function CalendarCell({ day }: { day: number }) {
  const { setSelectedDay, setView } = useCalendarStore()
  const tasks = calendarData[day] ?? []

  return (
    <div
      className="min-h-25 border border-[#e7ebf3] dark:border-[#2a3441] rounded-lg m-1 p-2 hover:bg-muted/50"
      onClick={() => {
        setSelectedDay(day)
        setView('day')
      }}
    >
      <span className="text-[#0d121b] dark:text-white text-sm font-semibold">
        {day}
      </span>
      <div className="mt-1 space-y-1">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}

function TaskItem({ task }: { task: Task }) {
  return (
    <div
      className={cn(
        'text-xs px-2 py-1 rounded-md border-l-2 truncate cursor-pointer hover:opacity-80 flex items-center gap-1',
        task.type === 'holiday' &&
          'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-500',
        task.type === 'class' &&
          'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-500',
        task.type === 'deadline' &&
          'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border-orange-500',
        task.type === 'personal' &&
          'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-500',
      )}
    >
      {task.time ? `${task.time} - ` : ''}
      {task.title}
    </div>
  )
}
function MonthCalendar({
  onSelectDay,
}: {
  selectedDay: number
  onSelectDay: (day: number) => void
}) {
  return (
    <Card className="flex-1 bg-white dark:bg-[#1a2230] rounded-xl border border-[#e7ebf3] dark:border-[#2a3441] shadow-sm flex flex-col overflow-y-auto">
      <CardHeader className="p-0">
        <div className="grid grid-cols-7 border-b border-[#e7ebf3] dark:border-[#2a3441]">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className="py-3 text-center text-sm font-semibold text-[#4c669a] dark:text-[#94a3b8]"
            >
              {day}
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex-1 grid grid-cols-7 grid-rows-5">
          {Array.from({ length: 31 }).map((_, i) => {
            const day = i + 1

            return (
              <div key={day} onClick={() => onSelectDay(day)}>
                <CalendarCell key={i} day={day} />
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
function WeekCalendar({
  selectedDay,
  onSelectDay,
}: {
  selectedDay: number
  onSelectDay: (day: number) => void
}) {
  const startOfWeek = selectedDay - ((selectedDay - 1) % 7)

  return (
    <Card className="flex-1 bg-white dark:bg-[#1a2230] rounded-xl border border-[#e7ebf3] dark:border-[#2a3441] shadow-sm flex flex-col overflow-y-auto">
      <CardHeader className="p-0">
        <div className="grid grid-cols-7 border-b border-[#e7ebf3] dark:border-[#2a3441]">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className="py-3 text-center text-sm font-semibold text-[#4c669a] dark:text-[#94a3b8]"
            >
              {day}
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-rows-7">
          {Array.from({ length: 7 }).map((_, i) => {
            const day = startOfWeek + i

            return (
              <div key={day} onClick={() => onSelectDay(day)}>
                <CalendarCell key={i} day={day} />
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
function DayView({ day }: { day: number }) {
  const tasks = calendarData[day] ?? []

  return (
    <Card className="flex-1 bg-white dark:bg-[#1a2230] rounded-xl border border-[#e7ebf3] dark:border-[#2a3441] shadow-sm flex flex-col overflow-y-auto">
      <div className="p-6 space-y-4">
        <h2 className="text-xl font-bold pl-46">Tasks for Day {day}</h2>

        {tasks.length === 0 && (
          <p className="text-muted-foreground text-sm pt-18 pl-52 text-gray-400 dark:text-[#94a3b8]">
            No tasks scheduled
          </p>
        )}

        {tasks.map((task) => (
          <div
            className={cn(
              'text-lg font-semibold px-8 py-3 rounded-md border-l-4  truncate cursor-pointer hover:opacity-80 flex items-center gap-1',
              task.type === 'holiday' &&
                'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-500',
              task.type === 'class' &&
                'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-500',
              task.type === 'deadline' &&
                'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border-orange-500',
              task.type === 'personal' &&
                'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-500',
            )}
          >
            {task.time ? `${task.time}  -  ${task.title}` : `${task.title}`}
          </div>
        ))}
      </div>
    </Card>
  )
}
