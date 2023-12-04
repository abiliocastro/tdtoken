import { useRef, useState } from 'react'
import api from '../Api.js'

import HeaderMenu from '../Components/HeaderMenu';
import ErrorMessage from '../Components/ErrorMessage.jsx';
import logo from '../assets/logo.svg'

import { useNavigate } from 'react-router-dom';

function SingIn() {
    const navigate = useNavigate();

    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const userField = useRef(null);
    const passwordField = useRef(null);

    function authentication(){
        const user = userField.current.value;
        const password = passwordField.current.value;

        if(user && password){
            try {
                api.post('/login', {
                    "email": user,
                    "password": password
                },
                { withCredentials: true }).then(response => {
                    if(response.data.message == 'success'){
                        localStorage.setItem("userId", user);
                        navigate('/dashboard');
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }else{
            setShowErrorMessage(true)
            setErrorMessage("Preencha os campos de usuário e senha!")
        }
    }

    return (
        <div>
            { showErrorMessage && <ErrorMessage message={errorMessage}/> }
            
            <HeaderMenu text='Entrar' navigatePath={'/dashboard'} />
            <div className='content_container'>
                <div style={{alignSelf: 'left'}}>
                    <img src={logo} alt="" height= '44px'/>
                </div>

                <div style={{'marginTop': '139px'}} >
                    <h1 className="title_medium">Bem vindo de volta!</h1>
                    <span className="subtitle_medium">Olá, entre em sua conta para continuar</span>
                </div>

                <div style={{'marginTop': '45px'}}>
                    <input className="defaultInput" type="text" ref={userField} placeholder="Email"/>
                    <input className="defaultInput" type="password" ref={passwordField} placeholder="Senha"/>
                    <p className='forget_password_option'>
                        <a href="http://">Esqueceu a senha ?</a>
                    </p>

                    <button className='button_primary' style={{'marginTop': '68px'}} onClick={authentication}>Entrar</button>
                </div>

                <div className='create_account_text'>
                    <a onClick={() => { navigate('/createAccount'); }}>
                        Não tem uma conta? <span style={{fontWeight: 'bold'}}>Cadastrar</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SingIn;