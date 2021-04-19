import React from 'react';
import '../Search/search.scss';
import { FiSearch } from 'react-icons/fi';


const Search = ({placeholder,counter,handleChange,handleSubmit}) => {

    return(
        <form className='search' onSubmit={handleSubmit}>
            <input 
            placeholder={placeholder} 
            value={placeholder} 
            onChange={handleChange} 
             
            />
            <button type='submit'>  <FiSearch/></button>   
            <p>auto refresh in {counter}</p>
        </form>
    )
}

export default Search;