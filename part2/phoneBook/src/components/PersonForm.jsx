const PersonForm = ({
    onSubmit,
    nameValue,
    onNameChange,
    numberValue,
    onNumberChange,
  }) => (
    <form onSubmit={onSubmit}>
      <div>
        <input
            value={nameValue} 
            onChange={onNameChange}
            placeholder="Enter the name" />
      </div>
      <div>
        <input 
            value={numberValue} 
            onChange={onNumberChange} 
            placeholder="Enter the phone number"
        />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
)

export default PersonForm