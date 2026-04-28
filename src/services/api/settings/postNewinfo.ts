
import type { NewInfoFields } from '@/components/settings/rest/settingsAuth.schema'
import type {NewInfoAdminFields} from '@/components/settings/admin/settings.schema'

export default async function postNewinfo(data: NewInfoFields | NewInfoAdminFields) {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const { confirmPassword, ...rest } = data
  return rest
}
