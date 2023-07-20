import Input from './Input'

const Form = ( {onSubmit, buttonText, inputs} ) => {
  return (
    <form onSubmit={onSubmit}>
      {inputs.map(input =>
        <Input
          key={input.id}
          description={input.description}
          value={input.value}
          onChange={input.onChange}
        />
      )}
      <div><button type="submit">{buttonText}</button></div>
    </form>
  )
}

export default Form
