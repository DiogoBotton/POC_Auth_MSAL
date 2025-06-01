import React, { useState, useEffect } from 'react'
import { useMsal, useIsAuthenticated } from '@azure/msal-react'
import './style.css'
import { loginRequest } from '../../authConfig'

const Login = () => {
    const { instance } = useMsal()
    const isAuthenticated = useIsAuthenticated()
    const [photoUrl, setPhotoUrl] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const url = getUserPhoto()
            setPhotoUrl(url)
            console.log(url)
        }

        fetchData()
            .catch(console.error)
    }, [])

    const handleLogin = () => {
        instance.loginPopup(loginRequest) // Usar loginRedirect posteriormente
            .then(response => {
                console.log('Login successful:', response);
                localStorage.setItem('accessToken', response.accessToken)
                localStorage.setItem('name', response.account.name)
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

    const getUserPhoto = async () => {
        // const account = instance.getAllAccounts()[0];
        // const result = await instance.acquireTokenSilent({
        //     account,
        //     scopes: ["User.Read"],
        // });
        // result.accessToken

        let token = localStorage.getItem("accessToken")

        const response = await fetch('https://graph.microsoft.com/v1.0/me/photo/$value', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (!response.ok)
            throw new Error('Erro ao obter foto de perfil')

        const blob = await response.blob()
        return URL.createObjectURL(blob) // Para usar como src da imagem
    }

    const verifyAuthentication = async () => {
        const account = instance.getAllAccounts()[0];
        const result = await instance.acquireTokenSilent({
            account,
            scopes: [import.meta.env.VITE_MSAL_SCOPE],
        });
        result.accessToken

        const response = await fetch('http://localhost:5265/auth', {
            headers: {
                Authorization: `Bearer ${result.accessToken}`
            }
        })

        console.log(response)

        if (!response.ok)
            return alert('Não foi possível realizar a autenticação, status: ' + response.status)

        return alert('Autenticação realizada! :) ' + response.status)
    }

    return (
        <div className="login-container">
            <div className="login-box">
                {isAuthenticated ? (
                    <>
                        <h1 className="login-title">Usuário autenticado!</h1>
                        <h2>{localStorage.getItem('name')}</h2>
                        <img src={photoUrl} />

                        <button className="login-button" onClick={verifyAuthentication}>
                            Verificar autenticação
                        </button>

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