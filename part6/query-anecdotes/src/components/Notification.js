import { useNotificationDispatch, useNotificationValue } from "../NotificationContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const notificationDispatch = useNotificationDispatch()
  const notification = useNotificationValue()

  if (!notification) return null

  setTimeout(() => {
    notificationDispatch({ type: 'default' })
  }, 5000);


  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
