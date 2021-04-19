
import react from 'react';
import '../Loader/loader.scss';


const Loader = ({limit}) => {
    console.log(limit)
const Load = () => {
    
        return   (
            <div>
            <div className='loader'>
            <img  alt="placeholder"/>
            <p></p>
            </div>
            </div>
        )
    
    
}
    return (
        <>
        {[...Array(limit)].map((v,i) => {
            return (
                <Load key={i}/>
            )
        })}
        </>
    )
}

export default Loader;