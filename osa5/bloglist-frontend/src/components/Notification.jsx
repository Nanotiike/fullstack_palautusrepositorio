const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  
  return (
    <div style={{ color: 'red', fontStyle: 'italic', fontSize: 16 }}>
      {message}
    </div>
  )
}

export default Notification