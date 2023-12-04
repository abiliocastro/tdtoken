import './MenuItem.css'
import { IconContext } from "react-icons";

function MenuItem(props){
    return(
        <div className="menuItem">
            <div className='icon_container'>
                <img src={props.icon} alt="" className='icon'/>
            </div>
            <span>{props.text}</span>
        </div>
    )
}

export default MenuItem;