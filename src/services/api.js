import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api',
})

// Automatically attach token to every request
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('agriUser') || '{}')
  if (user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
})

export default api