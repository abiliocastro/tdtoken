import './MenuItem.css'
import { IconContext } from "react-icons";
import { useNavigate } from 'react-router-dom';

function MenuItem(props){
    const navigate = useNavigate();

    return(
        <a onClick={() => { navigate(props.navigate); }}>
            <div className="menuItem">
                <div className='icon_container'>
                    <img src={props.icon} alt="" className='icon'/>
                </div>
                <span>{props.text}</span>
            </div>
        </a>
    )
}

export default MenuItem;