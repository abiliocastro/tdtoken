import { useNavigate } from 'react-router-dom';
import './ButtonSecondary.css'

function ButtonSecondary(props) {
    const navigate = useNavigate();

    return (
        <button onClick={() => { navigate(props.navigate); }} className='button_secondary' style={{ margin: props.margin}}>{props.text}</button>
    )
}

export default ButtonSecondary;