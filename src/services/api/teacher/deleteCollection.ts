


import axios from 'axios'



const deleteCollection = async (collectionId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  await axios.delete(`http://localhost:4000/collections/${collectionId}`)
}


export default deleteCollection
