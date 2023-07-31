const Input = ( {description, value, onChange} ) => {
  return (
    <div>
      {description} <input value={value} onChange={onChange} />
    </div>
  )
}

export default Input
