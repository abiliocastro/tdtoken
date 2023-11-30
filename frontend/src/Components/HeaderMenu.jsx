import './HeaderMenu.css'
import { IconContext } from "react-icons";
import { SlArrowLeft } from "react-icons/sl";

function HeaderMenu() {
    return (
        <div className='header_container'>
            <span> 
                <IconContext.Provider value={{ className: 'react_icons', stroke: "black", strokeWidth: "15" }}>
                    <SlArrowLeft /> Sign In 
                </IconContext.Provider>
            </span>
        </div>
    )
}

export default HeaderMenu;