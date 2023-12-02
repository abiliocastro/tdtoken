import './TransactionItem.css'

function TransactionItem(props) {
    return (
        <div>
            <div className='transaction'>
                <div className='top'>
                    <span>icon</span>
                    <span className='date'>{props.date}</span>
                </div>
                <div className='bottom'>
                    <p className='description'>Pix recebido de <span>{props.sender}</span></p>
                    <span className={'balance positive'}>R$ {props.value}</span>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default TransactionItem;