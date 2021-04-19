import react from 'react';
import './data-container.css';

const DisplayFetchData = ({article}) => {

    return (
        <>
        <div className="data-container">            
            <img className="image" src={article && article.urlToImage ? article.urlToImage : ""} ></img>
            <p>{article && article.title ? article.title : ''}</p>            
        </div> 
        </>
        
    )
}


export default DisplayFetchData;