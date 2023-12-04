import './HeaderMenu.css'
import { IconContext } from "react-icons";
import { SlArrowLeft } from "react-icons/sl";
import { useNavigate } from 'react-router-dom';

function HeaderMenu(props) {
    const navigate = useNavigate();
    return (
        <div className='header_container'>
            <span> 
                {!props.hideBack && 
                <IconContext.Provider value={{ className: 'react_icons', stroke: "black", strokeWidth: "15" }}>
                    <a className='arrow-left' onClick={() => { navigate(props.navigatePath) }}> 
                        <SlArrowLeft color='#FFFFFF'/>  
                     </a>
                     {props.text}
                </IconContext.Provider> }
                {props.hideBack && 
                <IconContext.Provider value={{ className: 'react_icons', stroke: "black", strokeWidth: "15" }}>
                    {props.text}
                </IconContext.Provider> }
            </span>
        </div>
    )
}

export default HeaderMenu;