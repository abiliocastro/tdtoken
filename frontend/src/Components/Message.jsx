// import './Chat.css'

function Message(props){
    return(
        <div className={'message '+ props.type}>
            {props.message}
        </div>
    )
}

export default Message;