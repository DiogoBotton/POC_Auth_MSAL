import React from 'react'
import './style.css'

const Login = () => {
    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Login</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Senha</label>
                        <input type="password" id="password" required />
                    </div>

                    <button type="submit" className="login-button">
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login