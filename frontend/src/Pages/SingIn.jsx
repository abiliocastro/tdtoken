import './SingIn.css'
import HeaderMenu from '../Components/HeaderMenu';

function SingIn() {
    return (
        <div>
            <HeaderMenu />
            <div className='content_container'>
                <div>
                    <h1 className="title_medium">Wecome back,</h1>
                    <span className="subtitle_medium">Hello there, sign in to continue</span>
                </div>

                <div style={{'margin-top': '230px'}}>
                    <input type="text" placeholder="Email Address/User"/>
                    <input type="password" placeholder="Password"/>

                    <button style={{'margin-top': '68px'}}>Sign In</button>
                </div>

                <div style={{'display': 'flex', 'justifyContent': 'center', 'margin-top': '25px'}}>
                    <span>Dont't have an account?</span>
                    <a href="http://">
                        <span>Sign Up</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SingIn;