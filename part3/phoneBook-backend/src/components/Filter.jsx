const Filter = ({
    value,
    onChange
}) => (
        <input
            value={value}
            onChange={onChange}
            placeholder="Enter the name"
        />
)

export default Filter