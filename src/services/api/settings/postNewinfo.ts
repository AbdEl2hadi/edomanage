
import type { NewInfoFields } from '@/components/settings/rest/settingsAuth.schema'

export default async function postNewinfo(data: NewInfoFields) {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const { confirmPassword, ...rest } = data
  return rest
}
