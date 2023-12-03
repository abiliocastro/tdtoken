import './ErrorMessage.css'


function ErrorMessage(props){
    return (
        <div className='error_container'>
            <span>{props.message}</span>
            <button>X</button>
        </div>
    )
}

export default ErrorMessage;