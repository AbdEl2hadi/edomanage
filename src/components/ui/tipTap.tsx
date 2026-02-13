import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'

export default function RichTextEditor({
  value,
  onChange,
}: {
  value?: string
  onChange?: (value: string) => void
}) {
  return <SimpleEditor initialContent={value} onChange={(val) => { onChange?.(val); console.log(val) }} />
}
