import React from 'react'

const Filter = ({newFilter, handleFilterChange}) => {
    // Does not work with characters like 'ö'
    return (
        <div>
        filter shown with <input value={newFilter} onChange={handleFilterChange}/>
        </div>
    )
};

export default Filter;