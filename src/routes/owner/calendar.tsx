import { createFileRoute } from '@tanstack/react-router'
import { format, getDay, parse, startOfWeek } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Calendar, Views, dateFnsLocalizer } from 'react-big-calendar'
import type { EventPropGetter, SlotInfo, View } from 'react-big-calendar'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useGetTeachers } from '@/services/api/owner/teacher/hooks'
import { useGetStudents } from '@/services/api/owner/student/hooks'
import useAddEvent from '@/services/api/owner/addEvent'
import useEditEvent from '@/services/api/owner/editEvent'
import useDeleteEvent from '@/services/api/owner/deleteEvent'
import useGetEvents from '@/services/api/getEvents'

//  Searchable combobox
function SearchableSelect({
  options,
  value,
  onChange,
  placeholder,
}: {
  options: Array<string>
  value: string
  onChange: (v: string) => void
  placeholder: string
}) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const filtered = useMemo(
    () =>
      query.trim() === ''
        ? options
        : options.filter((o) => o.toLowerCase().includes(query.toLowerCase())),
    [options, query],
  )

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const inputClass =
    'w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 pr-8 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors'

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <input
          type="text"
          className={inputClass}
          placeholder={value || placeholder}
          value={open ? query : value}
          onFocus={() => {
            setQuery('')
            setOpen(true)
          }}
          onChange={(e) => setQuery(e.target.value)}
        />
        {value ? (
          <button
            type="button"
            tabIndex={-1}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
            onMouseDown={(e) => {
              e.preventDefault()
              onChange('')
              setQuery('')
            }}
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        ) : (
          <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-[16px] pointer-events-none">
            search
          </span>
        )}
      </div>
      {open && (
        <ul className="absolute z-50 mt-1 w-full max-h-48 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl py-1 text-sm">
          {filtered.length === 0 ? (
            <li className="px-3 py-2 text-center text-slate-400 text-xs">
              No results
            </li>
          ) : (
            filtered.map((o) => (
              <li
                key={o}
                className={`px-3 py-2 cursor-pointer hover:bg-primary/10 transition-colors ${
                  value === o
                    ? 'font-semibold text-primary bg-primary/5'
                    : 'text-slate-700 dark:text-slate-300'
                }`}
                onMouseDown={() => {
                  onChange(o)
                  setOpen(false)
                  setQuery('')
                }}
              >
                {o}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}

// Styled native date / datetime-local input
function DateTimeInput({
  type,
  value,
  onChange,
}: {
  type: 'datetime-local' | 'date'
  value: string
  onChange: (v: string) => void
}) {
  const icon = type === 'date' ? 'calendar_today' : 'schedule'
  return (
    <div className="cal-datetime-wrapper">
      <span className="cal-datetime-icon material-symbols-outlined">
        {icon}
      </span>
      <input
        type={type}
        className="cal-datetime-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

const locales = { 'en-US': enUS }

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

type OwnerEvent = {
  id?: string
  title: string
  start: Date
  end: Date
  allDay?: boolean
  color: string
  description?: string
  repeatWeekly?: boolean
  isClass?: boolean
  className?: string
  teacherName?: string
}

const EVENT_COLORS = [
  { label: 'Amber', value: '#f59e0b' },
  { label: 'Blue', value: '#2563eb' },
  { label: 'Rose', value: '#f43f5e' },
  { label: 'Emerald', value: '#059669' },
  { label: 'Violet', value: '#7c3aed' },
  { label: 'Cyan', value: '#0891b2' },
]

const toDatetimeLocal = (d: Date) => format(d, "yyyy-MM-dd'T'HH:mm")

export const Route = createFileRoute('/owner/calendar')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: 'Owner | School Calendar - EduManage' }],
  }),
})

// Add or Edit Dialog
export type EventForm = {
  id: string
  title: string
  start: string
  end: string
  color: string
  description: string
  allDay: boolean
  repeatWeekly: boolean
  isClass: boolean
  className: string
  teacherName: string
}

function emptyForm(start?: Date, end?: Date): EventForm {
  const s = start ?? new Date()
  const e = end ?? new Date(s.getTime() + 60 * 60 * 1000)
  return {
    id: crypto.randomUUID(),
    title: '',
    start: toDatetimeLocal(s),
    end: toDatetimeLocal(e),
    color: EVENT_COLORS[0].value,
    description: '',
    allDay: false,
    repeatWeekly: false,
    isClass: false,
    className: '',
    teacherName: '',
  }
}

function fromEvent(ev: OwnerEvent): EventForm {
  return {
    id: ev.id ?? '',
    title: ev.title,
    start: toDatetimeLocal(ev.start),
    end: toDatetimeLocal(ev.end),
    color: ev.color,
    description: ev.description ?? '',
    allDay: ev.allDay ?? false,
    repeatWeekly: ev.repeatWeekly ?? false,
    isClass: ev.isClass ?? false,
    className: ev.className ?? '',
    teacherName: ev.teacherName ?? '',
  }
}

function RouteComponent() {
  const { data: { data: teachersData } = { data: [] } } = useGetTeachers()
  const { data: { data: studentsData } = { data: [] } } = useGetStudents({}) 
  const { mutateAsync: addEventAsync, isPending: isAdding } = useAddEvent()
  const { mutateAsync: editEventAsync, isPending: isEditing } = useEditEvent()
  const { mutateAsync: deleteEventAsync } = useDeleteEvent()

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [view, setView] = useState<View>(Views.MONTH)

  const {
    data: eventsData,
    isLoading: isEventsLoading,
    isError: isEventsError,
  } = useGetEvents()

  const events = useMemo<Array<OwnerEvent>>(
    () =>
      (eventsData ?? []).map((ev: any) => ({
        ...ev,
        start: new Date(ev.start),
        end: new Date(ev.end),
      })),
    [eventsData],
  )

  const teachers: Array<{ id: string; name: string }> = useMemo(
    () =>
      (teachersData).map((t: { id: string; name: string }) => ({
        id: t.id,
        name: t.name,
      })),
    [teachersData],
  )

  const classOptions: Array<string> = useMemo(() => {
    const grades: Array<string> = (studentsData).map(
      (s: { grade: string }) => s.grade,
    )
    return Array.from(new Set(grades)).sort()
  }, [studentsData])

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<EventForm>(emptyForm())

  // Detail and delete dialog
  const [detailOpen, setDetailOpen] = useState(false)
  const [detailEvent, setDetailEvent] = useState<OwnerEvent | null>(null)

  const title = useMemo(() => format(selectedDate, 'MMMM yyyy'), [selectedDate])

  // Expand recurring events dynamically (1 year)
  const displayEvents = useMemo(() => {
    const WEEK_MS = 7 * 24 * 60 * 60 * 1000
    const windowStart = new Date()
    windowStart.setFullYear(windowStart.getFullYear() - 1)
    const windowEnd = new Date()
    windowEnd.setFullYear(windowEnd.getFullYear() + 1)

    const result: Array<OwnerEvent> = []
    for (const ev of events) {
      if (!ev.repeatWeekly) {
        result.push(ev)
        continue
      }
      const durationMs = ev.end.getTime() - ev.start.getTime()
      let cur = new Date(ev.start)
      // fast-forward to window start
      if (cur < windowStart) {
        const weeks = Math.ceil(
          (windowStart.getTime() - cur.getTime()) / WEEK_MS,
        )
        cur = new Date(cur.getTime() + weeks * WEEK_MS)
      }
      while (cur <= windowEnd) {
        result.push({
          ...ev,
          start: new Date(cur),
          end: new Date(cur.getTime() + durationMs),
        })
        cur = new Date(cur.getTime() + WEEK_MS)
      }
    }
    return result
  }, [events])

  const upcomingEvents = useMemo(() => {
    const now = new Date()
    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    )
    const tomorrowEnd = new Date(
      todayStart.getTime() + 2 * 24 * 60 * 60 * 1000 - 1,
    )
    return [...displayEvents]
      .filter((e) => e.start <= tomorrowEnd && e.end >= todayStart)
      .sort((a, b) => a.start.getTime() - b.start.getTime())
  }, [displayEvents])

  // Calendar  style
  const eventPropGetter: EventPropGetter<OwnerEvent> = (event) => ({
    style: {
      backgroundColor: event.color,
      borderColor: event.color,
      color: '#fff',
      borderRadius: '6px',
      fontWeight: 600,
      padding: '2px 7px',
      fontSize: '0.78rem',
      cursor: 'pointer',
    },
  })

  // Navigation
  const shiftDate = (direction: -1 | 1) => {
    const next = new Date(selectedDate)
    if (view === Views.DAY) next.setDate(next.getDate() + direction)
    else if (view === Views.WEEK) next.setDate(next.getDate() + direction * 7)
    else next.setMonth(next.getMonth() + direction)
    setSelectedDate(next)
  }

  // Open add dialog
  const handleSelectSlot = (slot: SlotInfo) => {
    setEditingId(null)
    setForm(emptyForm(slot.start, slot.end))
    setDialogOpen(true)
  }

  // Open detail dialog — show the clicked instance but resolve to base event
  const handleSelectEvent = (event: OwnerEvent) => {
    setDetailEvent(event)
    setDetailOpen(true)
  }

  // Open edit dialog from detail view — edit the base event
  const openEditFromDetail = () => {
    if (!detailEvent) return
    const base = events.find((e) => e.id === detailEvent.id) ?? detailEvent
    setDetailOpen(false)
    setEditingId(base.id ?? null)
    setForm(fromEvent(base))
    setDialogOpen(true)
  }

  // Save
  const handleSave = async () => {
    if (!form.title.trim()) return
    const startDate = new Date(form.start)
    const endDate = new Date(form.end)
    if (endDate <= startDate) return

    if (editingId !== null) {
      await editEventAsync(form)
    } else {
      await addEventAsync(form)
    }
    setDialogOpen(false)
  }

  // Delete
  const handleDelete = async (id: string | undefined) => {
    if (!id) return
    await deleteEventAsync(id)
    setDetailOpen(false)
    setDetailEvent(null)
  }

  const fieldBase =
    'w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors'

  return (
    <main className="flex-1 flex flex-col md:flex-row p-6 gap-6 min-h-0">
      {/* Sidebar  */}
      <aside className="w-full md:w-72 flex flex-col gap-5 shrink-0">
        {/* Add Event */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-800">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
            Schedule
          </p>
          <button
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-white rounded-xl font-bold text-sm shadow hover:bg-primary/90 active:scale-95 transition-all cursor-pointer"
            onClick={() => {
              setEditingId(null)
              setForm(emptyForm())
              setDialogOpen(true)
            }}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">
              add_circle
            </span>
            New Event
          </button>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex-1 overflow-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              Today &amp; Tomorrow
            </h3>
            <span className="text-xs bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-semibold">
              {upcomingEvents.length}
            </span>
          </div>

          {upcomingEvents.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-6">
              No events today or tomorrow
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {upcomingEvents.map((event) => (
                <button
                  key={event.id}
                  type="button"
                  className="flex items-start gap-3 group text-left w-full cursor-pointer"
                  onClick={() => {
                    setDetailEvent(event)
                    setDetailOpen(true)
                  }}
                >
                  <div
                    className="w-1 self-stretch rounded-full shrink-0 mt-0.5"
                    style={{ backgroundColor: event.color }}
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate group-hover:text-primary transition-colors">
                      {event.title}
                    </span>
                    <span className="text-xs text-slate-400 mt-0.5">
                      {format(event.start, 'MMM dd')}
                      {!event.allDay && ` • ${format(event.start, 'h:mm a')}`}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-800">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
            Color Legend
          </p>
          <div className="grid grid-cols-2 gap-2">
            {EVENT_COLORS.map((c) => (
              <div key={c.value} className="flex items-center gap-2">
                <span
                  className="size-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: c.value }}
                />
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  {c.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Calendar */}
      <section className="flex-1 flex flex-col gap-4 min-w-0">
        {/* Toolbar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl px-5 py-3 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              {title}
            </h2>
            <div className="flex items-center gap-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-1">
              <button
                type="button"
                className="p-1 rounded hover:bg-white dark:hover:bg-slate-700 transition-all cursor-pointer text-slate-600 dark:text-slate-300"
                onClick={() => shiftDate(-1)}
                aria-label="Previous"
              >
                <span className="material-symbols-outlined text-[20px]">
                  chevron_left
                </span>
              </button>
              <button
                type="button"
                className="px-3 py-1 text-xs font-bold rounded hover:bg-white dark:hover:bg-slate-700 transition-all cursor-pointer text-slate-700 dark:text-slate-200"
                onClick={() => setSelectedDate(new Date())}
              >
                Today
              </button>
              <button
                type="button"
                className="p-1 rounded hover:bg-white dark:hover:bg-slate-700 transition-all cursor-pointer text-slate-600 dark:text-slate-300"
                onClick={() => shiftDate(1)}
                aria-label="Next"
              >
                <span className="material-symbols-outlined text-[20px]">
                  chevron_right
                </span>
              </button>
            </div>
          </div>

          {/* View switcher */}
          <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 gap-0.5">
            {([Views.MONTH, Views.WEEK, Views.DAY] as Array<View>).map((v) => (
              <button
                key={v}
                type="button"
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer capitalize ${
                  view === v
                    ? 'bg-white dark:bg-slate-700 shadow text-primary dark:text-white'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                }`}
                onClick={() => setView(v)}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-4 flex-1 flex flex-col min-h-0">
          {isEventsLoading ? (
            <div className="flex flex-col items-center justify-center flex-1 gap-3 text-slate-400">
              <span className="material-symbols-outlined animate-spin text-[40px]">
                progress_activity
              </span>
              <p className="text-sm font-medium">Loading events…</p>
            </div>
          ) : isEventsError ? (
            <div className="flex flex-col items-center justify-center flex-1 gap-3 text-center">
              <span className="material-symbols-outlined text-red-400 text-5xl">
                event_busy
              </span>
              <p className="text-base font-semibold text-slate-700 dark:text-slate-200">
                Failed to load events
              </p>
              <p className="text-sm text-slate-400">
                Could not fetch calendar data. Please try again later.
              </p>
            </div>
          ) : displayEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 gap-3 text-center">
              <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 text-6xl">
                calendar_month
              </span>
              <p className="text-base font-semibold text-slate-700 dark:text-slate-200">
                No events yet
              </p>
              <p className="text-sm text-slate-400">
                Click <strong>New Event</strong> to schedule something.
              </p>
            </div>
          ) : (
            <div className="owner-big-calendar flex-1 h-full min-h-0">
              <Calendar
                date={selectedDate}
                events={displayEvents}
                eventPropGetter={eventPropGetter}
                localizer={localizer}
                onNavigate={setSelectedDate}
                onView={setView}
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                selectable
                step={30}
                toolbar={false}
                view={view}
                views={[Views.MONTH, Views.WEEK, Views.DAY]}
              />
            </div>
          )}
        </div>
      </section>

      {/*  Add - Edit Event Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">
                {editingId !== null ? 'edit_calendar' : 'event'}
              </span>
              {editingId !== null ? 'Edit Event' : 'New Event'}
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 mt-2">
            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Title
              </label>
              <Input
                placeholder="e.g. Parent-Teacher Meeting"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
              />
            </div>

            {/* All-day toggle */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={form.allDay}
                onChange={(e) =>
                  setForm((f) => ({ ...f, allDay: e.target.checked }))
                }
                className="accent-primary w-4 h-4 cursor-pointer"
              />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                All-day event
              </span>
            </label>

            {/* Is class event */}
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.isClass}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, isClass: e.target.checked }))
                  }
                  className="accent-primary w-4 h-4 cursor-pointer"
                />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  This is a class event
                </span>
              </label>

              {form.isClass && (
                <div className="flex flex-col gap-3 pl-6 border-l-2 border-primary/20">
                  {/* Class picker */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Class
                    </label>
                    <SearchableSelect
                      options={classOptions}
                      value={form.className}
                      onChange={(v) => setForm((f) => ({ ...f, className: v }))}
                      placeholder="Search class…"
                    />
                  </div>

                  {/* Teacher picker */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Teacher
                    </label>
                    <SearchableSelect
                      options={teachers.map((t) => t.name)}
                      value={form.teacherName}
                      onChange={(v) =>
                        setForm((f) => ({ ...f, teacherName: v }))
                      }
                      placeholder="Search teacher…"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Repeat weekly */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={form.repeatWeekly}
                onChange={(e) =>
                  setForm((f) => ({ ...f, repeatWeekly: e.target.checked }))
                }
                className="accent-primary w-4 h-4 cursor-pointer"
              />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Repeat every week
              </span>
              {form.repeatWeekly && (
                <span className="ml-1 text-xs text-slate-400 font-medium">
                  (until deleted or turned off)
                </span>
              )}
            </label>

            {/* Start / End */}
            {!form.allDay && (
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Start
                  </label>
                  <DateTimeInput
                    type="datetime-local"
                    value={form.start}
                    onChange={(v) => setForm((f) => ({ ...f, start: v }))}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    End
                  </label>
                  <DateTimeInput
                    type="datetime-local"
                    value={form.end}
                    onChange={(v) => setForm((f) => ({ ...f, end: v }))}
                  />
                </div>
              </div>
            )}
            {form.allDay && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Date
                </label>
                <DateTimeInput
                  type="date"
                  value={form.start.slice(0, 10)}
                  onChange={(d) =>
                    setForm((f) => ({
                      ...f,
                      start: `${d}T00:00`,
                      end: `${d}T23:59`,
                    }))
                  }
                />
              </div>
            )}

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Description
              </label>
              <textarea
                rows={2}
                placeholder="Optional note…"
                className={`${fieldBase} resize-none`}
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
              />
            </div>

            {/* Color picker */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Color
              </label>
              <div className="flex gap-2 flex-wrap">
                {EVENT_COLORS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    title={c.label}
                    className={`size-7 rounded-full border-2 transition-all cursor-pointer hover:scale-110 ${
                      form.color === c.value
                        ? 'border-slate-900 dark:border-white scale-110 shadow-md'
                        : 'border-transparent'
                    }`}
                    style={{ backgroundColor: c.value }}
                    onClick={() => setForm((f) => ({ ...f, color: c.value }))}
                  />
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                className="flex-1 py-2 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary/90 active:scale-95 transition-all cursor-pointer shadow disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={handleSave}
                disabled={isAdding || isEditing}
              >
                {isAdding || isEditing
                  ? 'Saving…'
                  : editingId !== null
                    ? 'Save Changes'
                    : 'Add to Calendar'}
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Event Detail Dialog  */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-sm">
          {detailEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span
                    className="size-3 rounded-full shrink-0"
                    style={{ backgroundColor: detailEvent.color }}
                  />
                  {detailEvent.title}
                </DialogTitle>
              </DialogHeader>

              <div className="flex flex-col gap-3 mt-2 text-sm text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-slate-400 text-[18px]">
                    calendar_today
                  </span>
                  <span>
                    {detailEvent.allDay
                      ? format(detailEvent.start, 'MMMM d, yyyy')
                      : `${format(detailEvent.start, 'MMM d, yyyy · h:mm a')} → ${format(detailEvent.end, 'h:mm a')}`}
                  </span>
                </div>
                {detailEvent.isClass && (
                  <>
                    {detailEvent.className && (
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-slate-400 text-[18px]">
                          school
                        </span>
                        <span>{detailEvent.className}</span>
                      </div>
                    )}
                    {detailEvent.teacherName && (
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-slate-400 text-[18px]">
                          person
                        </span>
                        <span>{detailEvent.teacherName}</span>
                      </div>
                    )}
                  </>
                )}
                {detailEvent.repeatWeekly && (
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400 text-[18px]">
                      repeat
                    </span>
                    <span className="text-xs font-semibold text-primary">
                      Repeats weekly · unlimited
                    </span>
                  </div>
                )}
                {detailEvent.description && (
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-slate-400 text-[18px]">
                      notes
                    </span>
                    <span className="text-slate-600 dark:text-slate-400">
                      {detailEvent.description}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  type="button"
                  className="flex-1 py-2 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary/90 active:scale-95 transition-all cursor-pointer"
                  onClick={openEditFromDetail}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition-all cursor-pointer"
                  onClick={() => handleDelete(detailEvent.id)}
                >
                  {detailEvent.repeatWeekly ? 'Delete all' : 'Delete'}
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}
