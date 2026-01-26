
import type { NewInfoFields } from '@/components/settings/rest/settingsAuth.schema'
import type {NewInfoOwnerFields} from '@/components/settings/owner/settings.schema'

export default async function postNewinfo(data: NewInfoFields | NewInfoOwnerFields) {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const { confirmPassword, ...rest } = data
  return rest
}
