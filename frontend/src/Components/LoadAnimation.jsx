import logo_mini from '../assets/logo_mini.svg'

function LoadAnimation() {
    return (
        <div className='load-popup'>
            <div className='circle-animation-one'></div>
            <div className='circle-animation-two'></div>
            <img src={logo_mini} alt="" height= '44px'/>
        </div>
    )
}

export default LoadAnimation;