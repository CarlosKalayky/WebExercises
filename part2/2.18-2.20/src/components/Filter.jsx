const Filter = ({
    value,
    onChange
}) => (
        <input
            value={value}
            onChange={onChange}
            placeholder="Enter the country"
        />
)

export default Filter