
import react from 'react';
import '../Loader/loader.scss';


const Loader = ({limit}) => {
    console.log(limit)
const Load = () => {
    
    for (let i =0; i<limit; i++) {
        return   (
           
            <div className='loader'>
            <img  alt="placeholder"/>
            <p></p>
        </div>
        )
    
    }
}
    return (
        <>
        <Load/>
        </>
    )
}

export default Loader;