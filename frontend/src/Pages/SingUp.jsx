import { useState, useRef } from 'react';
import HeaderMenu from '../Components/HeaderMenu';
import logo from '../assets/logo.svg'

function SingUp() {

    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [showPasswordPage, setShowPasswordPage] = useState(false)

    const nameField = useRef(null);
    const emailField = useRef(null);
    const cpfField = useRef(null);
    const passwordField = useRef(null);
    const confirmPasswordField = useRef(null);


    function goNextPage(){
        if(nameField.current.value && 
            emailField.current.value &&
             cpfField.current.value) {
            setShowPasswordPage(true)
        }
    }
    
    function createAccount() {
        if(nameField.current.value && 
           emailField.current.value &&
           cpfField.current.value &&
           passwordField.current.value &&
           confirmPasswordField.current.value)
        {
           console.log('chamando tela de cadastro!')   
           console.log(nameField.current.value)   
           console.log(emailField.current.value)   
           console.log(cpfField.current.value)   
           console.log(passwordField.current.value)   
           console.log(confirmPasswordField.current.value)   
        }
    }

    return (
        <div>
            { showErrorMessage && <ErrorMessage message={errorMessage}/> }

            <HeaderMenu text="Cadastro" />
            <div className='content_container' style={showPasswordPage ? {display: 'none'} : {display: 'flex'}}>
                <div style={{alignSelf: 'left'}}>
                    <img src={logo} alt="" height= '44px'/>
                </div>

                <div style={{'margin-top': '139px'}} >
                    <h1 className="title_medium">Bem vindo, </h1>
                    <span className="subtitle_medium">Crie sua conta, o CalangoBank veio para vacilitar sua vida financeira.</span>
                </div>

                <div style={{'margin-top': '45px'}}>
                    <input className="defaultInput" ref={nameField} type="text" placeholder="Nome Completo"/>
                    <input className="defaultInput" ref={emailField} type="text" placeholder="Email"/>
                    <input className="defaultInput" ref={cpfField} type="text" placeholder="CPF"/>

                    <button className='button_primary' onClick={goNextPage} style={{'margin-top': '68px'}}>Continuar</button>
                </div>

                <div className='create_account_text'>
                    <a href="/">
                        Já tem uma conta? <span style={{fontWeight: 'bold'}}>Entrar</span>
                    </a>
                </div>
            </div>
            <div className='content_container' style={showPasswordPage ? {display: 'flex'} : {display: 'none'}}>
                <div style={{alignSelf: 'left'}}>
                    <img src={logo} alt="" height= '44px'/>
                </div>

                <div style={{'margin-top': '139px'}} >
                    <h1 className="title_medium">Criar Senha</h1>
                    <span className="subtitle_medium">Crie sua conta, o CalangoBank veio para vacilitar sua vida financeira.</span>
                </div>

                <div style={{'margin-top': '45px'}}>
                    <input className="defaultInput" ref={passwordField} type="password" placeholder="Crie sua senha"/>
                    <input className="defaultInput" ref={confirmPasswordField} type="password" placeholder="Confirme sua senha"/>

                    <button className='button_primary' onClick={createAccount} style={{'margin-top': '68px'}}>Continuar</button>
                </div>

                <div className='create_account_text'>
                    <a href="/">
                        Já tem uma conta? <span style={{fontWeight: 'bold'}}>Entrar</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SingUp;