import axios from 'axios'
import type { Collection } from './getCollection'

const addOrEditCollection = async (
  name: string,
  role: 'add' | 'edit',
  id?: string,
) => {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const data: Collection = {
    id: id || crypto.randomUUID(),
    name,
    filesCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sizeMB: 0,
  }
  if (role === 'add') {
    await axios.post('http://localhost:4000/collections', data)
  } else {
    const patch = { name, updatedAt: new Date().toISOString() }
    await axios.patch(`http://localhost:4000/collections/${id}`, patch)
  }
}

export default addOrEditCollection
