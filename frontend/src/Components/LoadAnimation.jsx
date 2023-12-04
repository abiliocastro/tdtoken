import logo_load from '../assets/logo_load.svg'

function LoadAnimation() {
    return (
        <div className='load-popup'>
            <div className='circle-animation-one'></div>
            <div className='circle-animation-two'></div>
            <img src={logo_load} alt="" height= '44px'/>
        </div>
    )
}

export default LoadAnimation;