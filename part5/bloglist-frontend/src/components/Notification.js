const Notification = (props) => {
  return (
    <div className={'notification ' + props.status}>
      {props.message}
    </div>
  )
}

export default Notification
