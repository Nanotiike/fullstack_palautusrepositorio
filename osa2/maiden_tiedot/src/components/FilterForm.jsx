const FilterForm = ({ filter, setFilter }) => {

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }
    
    return (
    <form>
        <div>
            find countries 
            <input 
            id="filter"
            name="filter"
            type="text"
            value={filter}
            onChange={handleFilterChange}
            />
        </div>
    </form>
    )
}
    
export default FilterForm