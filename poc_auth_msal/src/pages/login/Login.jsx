import React from 'react'
import { useMsal, useIsAuthenticated } from '@azure/msal-react'
import './style.css'
import { loginRequest } from '../../authConfig'

const Login = () => {
    const { instance } = useMsal()
    const isAuthenticated = useIsAuthenticated()

    const handleLogin = () => {
        instance.loginPopup(loginRequest)
            .then(response => {
                console.log('Login successful:', response);
            })
            .catch(error => {
                console.error('Login failed:', error);
            });
    }

    const handleLogout = () => {
        instance.logoutPopup()
            .then(() => {
                console.log('Logout successful');
            })
            .catch(error => {
                console.error('Logout failed:', error);
            });
    }

    return (
        <div className="login-container">
            <div className="login-box">
                {isAuthenticated ? (
                    <>
                        <h1 className="login-title">Usuário autenticado!</h1>
                        <button className="logout-button" onClick={handleLogout}>
                            Sair
                        </button>
                    </>
                ) : (
                    <>
                        <h1 className="login-title">Faça login para continuar</h1>
                        <button className="login-button" onClick={handleLogin}>
                            Entrar com Microsoft
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default Login