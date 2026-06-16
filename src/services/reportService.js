import api from './api'

export const createReport = async (formData) => {
  const { data } = await api.post('/reports', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

export const getReports = async () => {
  const { data } = await api.get('/reports')
  return data
}