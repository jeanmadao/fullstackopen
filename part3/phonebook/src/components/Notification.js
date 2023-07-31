const Notification = ({ message, notifStatus }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={`notification ${notifStatus}`}>
      {message}
    </div>
  )
}

export default Notification
