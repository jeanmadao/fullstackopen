const FormInput = (props) => {
  return (
    <div>
      {props.desc}
      <input
        type={props.type}
        value={props.val}
        name={props.name}
        placeholder={props.name}
        onChange={props.onChange}
      />
    </div>
  )
}

export default FormInput
