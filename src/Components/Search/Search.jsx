import React from 'react';

const Search = ({placeholder,counter,handleChange}) => {

    return(
        <div>
            <p>{counter}</p>
            <input placeholder={placeholder} onChange={handleChange}/>
        </div>
    )
}

export default Search;