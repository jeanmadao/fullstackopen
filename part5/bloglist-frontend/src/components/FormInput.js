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
        id={props.id}
      />
    </div>
  )
}

export default FormInput
