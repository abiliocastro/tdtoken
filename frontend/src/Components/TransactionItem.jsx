import './TransactionItem.css'

import tdTokenIcon from '../assets/td_token_icon.svg'

function TransactionItem(props) {
    function formatDate(){
        if(props.date){
            let date = new Date(props.date)
            return date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()
        }
    }

    return (
        <div>
            <div className='transaction'>
                <div className='top'>
                    <img src={tdTokenIcon} alt="" />
                    <span className='date'>{formatDate()}</span>
                </div>
                <div className='bottom'>
                    <p className='description'>{props.description}</p>
                    { props.tokenValue < 0 ? 
                        <span className={'balance negative'}>-{props.tokenValue * -1} TDTokens</span>
                        : 
                        <span className={'balance positive'}>{props.tokenValue} TDTokens</span>
                    }
                </div>
            </div>
            <hr />
        </div>
    )
}

export default TransactionItem;