import './MenuItem.css'
import { IconContext } from "react-icons";

function MenuItem(props){
    return(
        <div className="menuItem">
            <div className='icon_container'>
                <IconContext.Provider value={{ className: 'icon', color: props.color }}>
                    {< props.icon />}
                </IconContext.Provider> 
            </div>
            <span>{props.text}</span>
        </div>
    )
}

export default MenuItem;