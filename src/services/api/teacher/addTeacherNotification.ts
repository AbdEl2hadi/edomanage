import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

import type { Notification, NotificationAttachment } from './types'

type AddTeacherNotificationPayload = {
  role: 'teacher' | 'admin'
  subject: string
  content: string
  attachments?: Array<NotificationAttachment>
  sendTo?: Array<string>
  type: 'Teacher' | 'Urgent' | 'Administrative' | 'User' | 'Grade' | 'Book'
}

const API_URL = 'http://localhost:4000/teacherNotifications'

const buildAudience = (
  role: 'teacher' | 'admin',
  sendTo: Array<string> = [],
): NonNullable<Notification['sendTo']> => {
  const normalized = sendTo.filter(
    (value): value is 'Students' | 'Teachers' =>
      value === 'Students' || value === 'Teachers',
  )

  if (normalized.length > 0) {
    return normalized
  }

  return role === 'teacher' ? ['Students'] : ['Teachers', 'Students']
}

const extractAttachmentsFromContent = (
  content: string,
): Array<NotificationAttachment> => {
  // Parse editor HTML and collect media/document URLs into a normalized attachment list.
  const parser = new DOMParser()
  const documentFragment = parser.parseFromString(content, 'text/html')

  const attachmentMap = new Map<string, NotificationAttachment>()

  const imageExtensionRegex = /\.(png|jpe?g|gif|webp|svg|bmp|avif)$/i
  const videoExtensionRegex = /\.(mp4|webm|ogg|mov)$/i
  const docExtensionRegex = /\.(pdf|doc|docx|xls|xlsx|ppt|pptx|txt|zip|rar)$/i

  const inferFromUrl = (url: string): NotificationAttachment['kind'] => {
    if (imageExtensionRegex.test(url)) {
      return 'image'
    }

    if (videoExtensionRegex.test(url)) {
      return 'video'
    }

    return 'document'
  }

  const inferExtension = (url: string): string => {
    return url.split('.').pop()?.toUpperCase() ?? 'FILE'
  }

  // Save each attachment once with inferred kind/extension and a readable label.
  const addAttachment = (url: string, label?: string) => {
    const normalizedUrl = url.trim()
    if (!normalizedUrl) {
      return
    }

    const kind = inferFromUrl(normalizedUrl)
    const extension = inferExtension(normalizedUrl)

    const inferredLabel =
      label?.trim() ||
      normalizedUrl.split('/').pop() ||
      `${kind.toUpperCase()} Attachment`

    attachmentMap.set(normalizedUrl, {
      href: normalizedUrl,
      label: inferredLabel,
      extension,
      kind,
    })
  }

  documentFragment.querySelectorAll('img').forEach((image) => {
    const src = image.getAttribute('src')
    if (!src) {
      return
    }

    addAttachment(src, image.getAttribute('alt') ?? undefined)
  })

  documentFragment.querySelectorAll('video').forEach((video) => {
    const directSource = video.getAttribute('src')
    if (directSource) {
      addAttachment(directSource)
    }

    video.querySelectorAll('source').forEach((sourceNode) => {
      const nestedSource = sourceNode.getAttribute('src')
      if (!nestedSource) {
        return
      }

      addAttachment(nestedSource)
    })
  })

  documentFragment.querySelectorAll('a').forEach((anchor) => {
    const href = anchor.getAttribute('href')
    if (!href) {
      return
    }

    if (
      imageExtensionRegex.test(href) ||
      videoExtensionRegex.test(href) ||
      docExtensionRegex.test(href)
    ) {
      // Keep only links that look like downloadable/viewable files.
      addAttachment(href, anchor.textContent)
    }
  })

  return Array.from(attachmentMap.values())
}

const addTeacherNotification = async ({
  role,
  subject,
  content,
  attachments,
  type,
  sendTo,
}: AddTeacherNotificationPayload): Promise<Notification> => {
  const audience = buildAudience(role, sendTo)
  const contentAttachments = extractAttachmentsFromContent(content)
  const mergedAttachments = [
    ...(attachments ?? []),
    ...contentAttachments,
  ].reduce<Array<NotificationAttachment>>((acc, attachment) => {
    if (acc.some((existing) => existing.href === attachment.href)) {
      return acc
    }

    acc.push(attachment)
    return acc
  }, [])

  const data: Notification = {
    id: `tn-${Date.now()}`,
    type: type,
    title: subject,
    content,
    subject: audience.join(' • '),
    sendTo: audience,
    attachments: mergedAttachments,
    time: new Date().toLocaleString(),
  }

  const response = await axios.post<Notification>(API_URL, data)
  return response.data
}

export default function useAddTeacherNotification() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addTeacherNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['teacher-notifications'],
      })
    },
  })
}
