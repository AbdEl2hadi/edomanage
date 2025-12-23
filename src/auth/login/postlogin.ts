import axios from 'axios'

export async function postLogin(data: {
  email: string
  password: string
  role: string
}) {
  try {
    const response = await axios.post('http://localhost:4000/students', data)
    return response.data
  } catch (error) {
    throw new Error('Login failed')
  }
}
