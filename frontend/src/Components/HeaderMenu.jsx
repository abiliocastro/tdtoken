import './HeaderMenu.css'
import { IconContext } from "react-icons";
import { SlArrowLeft } from "react-icons/sl";

function HeaderMenu(props) {
    return (
        <div className='header_container'>
            <span> 
                <IconContext.Provider value={{ className: 'react_icons', stroke: "black", strokeWidth: "15" }}>
                    <SlArrowLeft /> {props.text}
                </IconContext.Provider>
            </span>
        </div>
    )
}

export default HeaderMenu;