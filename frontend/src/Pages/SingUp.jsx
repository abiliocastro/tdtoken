import './SingUp.css'
import HeaderMenu from '../Components/HeaderMenu';

function SingUp() {
    return (
        <div>
            <HeaderMenu />
            <div className='content_container'>
                <div>
                    <h1 className="title_medium">Wecome to us, </h1>
                    <span className="subtitle_medium">Hello there, create New account</span>
                </div>

                <div style={{'margin-top': '230px'}}>
                    <input type="text" placeholder="Name Completo"/>
                    <input type="text" placeholder="Email Address/User"/>
                    <input type="password" placeholder="Password"/>

                    <button style={{'margin-top': '68px'}}>Next</button>
                </div>

                <div style={{'display': 'flex', 'justifyContent': 'center', 'margin': '25px 0px 50px 0px'}}>
                    <span>Dont't have an account?</span>
                    <a href="http://">
                        <span>Sign In</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SingUp;