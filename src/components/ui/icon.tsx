import type { CSSProperties } from 'react'
import type { LucideIcon, LucideProps } from 'lucide-react'
import {
  AlertTriangle,
  Archive,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  Backpack,
  Badge,
  BadgeCheck,
  Bell,
  BellOff,
  BookOpenText,
  Calendar,
  CalendarDays,
  CalendarPlus,
  CalendarX,
  Check,
  CheckCheck,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  CircleHelp,
  Clock,
  Contact,
  CreditCard,
  Download,
  Eye,
  EyeOff,
  FilePenLine,
  FilePlus,
  FileText,
  Folder,
  FolderPlus,
  Globe,
  History,
  KeyRound,
  LineChart,
  LoaderCircle,
  Lock,
  LogOut,
  Mail,
  Megaphone,
  Menu,
  MessageCircle,
  MessageSquareDot,
  NotebookPen,
  Pencil,
  Pin,
  Plus,
  PlusCircle,
  Presentation,
  Repeat,
  School,
  Search,
  Send,
  Server,
  ShieldCheck,
  Smartphone,
  SquareArrowOutUpRight,
  Star,
  StickyNote,
  ToggleRight,
  Trash2,
  Upload,
  User,
  UserCheck,
  UserPlus,
  Users,
  X,
} from 'lucide-react'

const ICONS: Record<string, LucideIcon> = {
  Email: Mail,
  add: Plus,
  add_circle: PlusCircle,
  arrow_back: ArrowLeft,
  arrow_forward: ArrowRight,
  arrow_upward: ArrowUp,
  arrow_downward: ArrowDown,
  auto_stories: BookOpenText,
  backpack: Backpack,
  badge: Badge,
  calendar_month: Calendar,
  calendar_today: CalendarDays,
  campaign: Megaphone,
  cast_for_education: Presentation,
  chat: MessageCircle,
  check: Check,
  check_circle: CheckCircle,
  chevron_left: ChevronLeft,
  chevron_right: ChevronRight,
  close: X,
  contact_mail: Contact,
  create_new_folder: FolderPlus,
  delete: Trash2,
  description: FileText,
  dns: Server,
  domain: Globe,
  done_all: CheckCheck,
  download: Download,
  draft: FilePenLine,
  edit: Pencil,
  edit_calendar: Pencil,
  edit_document: FilePenLine,
  edit_note: NotebookPen,
  error: CircleAlert,
  event: CalendarPlus,
  event_busy: CalendarX,
  expand_more: ChevronDown,
  folder: Folder,
  group_add: UserPlus,
  groups: Users,
  history: History,
  inventory_2: Archive,
  lock: Lock,
  lock_reset: KeyRound,
  logout: LogOut,
  mark_unread_chat_alt: MessageSquareDot,
  menu: Menu,
  monitoring: LineChart,
  notes: StickyNote,
  notifications: Bell,
  notifications_off: BellOff,
  open_in_new: SquareArrowOutUpRight,
  payments: CreditCard,
  person: User,
  person_add: UserPlus,
  post_add: FilePlus,
  progress_activity: LoaderCircle,
  push_pin: Pin,
  repeat: Repeat,
  schedule: Clock,
  school: School,
  search: Search,
  security: ShieldCheck,
  send: Send,
  smartphone: Smartphone,
  sort: ArrowUpDown,
  star: Star,
  toggle_on: ToggleRight,
  upload_file: Upload,
  verified: BadgeCheck,
  verified_user: UserCheck,
  visibility: Eye,
  visibility_off: EyeOff,
  warning: AlertTriangle,
}

export type AppIconName = keyof typeof ICONS

type AnyIconName = AppIconName | (string & {})

export function Icon({
  name,
  className,
  style,
  'aria-label': ariaLabel,
  ...props
}: {
  name: AnyIconName
  className?: string
  style?: CSSProperties
  'aria-label'?: string
} & Omit<LucideProps, 'ref'>) {
  const Lucide = ICONS[name] ?? CircleHelp

  const mergedClassName = ['shrink-0 inline-block', className]
    .filter(Boolean)
    .join(' ')

  const mergedStyle: CSSProperties = {
    width: '1em',
    height: '1em',
    ...(style ?? {}),
  }

  return (
    <>
      <Lucide
        className={mergedClassName}
        style={mergedStyle}
        aria-label={ariaLabel}
        aria-hidden={ariaLabel ? undefined : true}
        role={ariaLabel ? 'img' : undefined}
        focusable={false}
        {...props}
      />
    </>
  )
}
