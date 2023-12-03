import './InputTransaction.css'

import tdTokenIcon from '../assets/td_token_icon.svg'
import pixIcon from '../assets/pix_icon.svg'

function InputTransection(props) {
    return (
        <div>
            <p className='input_transaction_description'>{props.description}</p>
            <div className='input_transection'>
                <img src={props.type == 'tdtoken' ? tdTokenIcon : pixIcon} alt="" className='icon'/>
                <input type="text" placeholder={props.placeholder}/>
                <span className='text_type'>{props.type == 'tdtoken' ? "TDToken" : ''}</span>
            </div>
        </div>
    )
}

export default InputTransection;