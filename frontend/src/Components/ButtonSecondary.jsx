import './ButtonSecondary.css'

function ButtonSecondary(props) {
    return (
        <button className='button_secondary' style={{ margin: props.margin}}>{props.text}</button>
    )
}

export default ButtonSecondary;