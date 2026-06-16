import api from './api'

export const registerUser = async (formData) => {
  const { data } = await api.post('/auth/register', formData)
  localStorage.setItem('agriUser', JSON.stringify(data))
  return data
}

export const loginUser = async (formData) => {
  const { data } = await api.post('/auth/login', formData)
  localStorage.setItem('agriUser', JSON.stringify(data))
  return data
}

export const logoutUser = () => {
  localStorage.removeItem('agriUser')
}

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('agriUser') || '{}')
}
export const forgotPassword = async (email) => {
  const { data } = await api.post('/auth/forgot-password', { email })
  return data
}

export const resetPassword = async (token, password) => {
  const { data } = await api.post(`/auth/reset-password/${token}`, { password })
  return data
}