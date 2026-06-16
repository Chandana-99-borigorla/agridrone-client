import api from './api'

export const createBooking = async (formData) => {
  const { data } = await api.post('/bookings', formData)
  return data
}

export const getBookings = async () => {
  const { data } = await api.get('/bookings')
  return data
}

export const updateBookingStatus = async (id, status) => {
  const { data } = await api.patch(`/bookings/${id}/status`, { status })
  return data
}