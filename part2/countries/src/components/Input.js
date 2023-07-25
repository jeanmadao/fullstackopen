const Input = ({ desc, value, onChange }) => {
  return (
    <div>
      {desc} <input value={value} onChange={onChange} />
    </div>
  )
}

export default Input
