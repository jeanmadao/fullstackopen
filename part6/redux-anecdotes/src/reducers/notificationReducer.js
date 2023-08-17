import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      const newNotification = action.payload
      return newNotification
    },
    clearNotification() {
      return ''
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const displayNotification = (newNotification, timeout) => {
  return (dispatch) => {
    dispatch(setNotification(newNotification))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 1000 * timeout)
  }
}

export default notificationSlice.reducer
