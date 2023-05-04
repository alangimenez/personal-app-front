import InfoMessage from "../Utils/InfoMessage"
import Cookies from "universal-cookie";
import { useEffect } from 'react';
const cookies = new Cookies();

function Login({ path }) {

    const loginUser = async () => {
        const email = document.getElementById('login-email')
        const password = document.getElementById('login-password')
        const submitBtn = document.getElementById('login-submit')
        const message = document.getElementById('login-msg')

        submitBtn.disabled = true
        message.style.display = 'unset'

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": email.value,
                "password": password.value
            })
        };

        const res = await fetch(`${path}/user/login`, requestOptions)
        const data = await res.json()

        if (res.status === 200) {
            message.innerHTML = 'Usted se ha logueado con éxito'
            message.className = 'alert alert-success'
            cookies.set("Token", data.token, { path: '/' })

            setTimeout(() => {
                window.location.href = "/"
            }, 2000)
        } else {
            message.innerHTML = 'Ha ocurrido un error, reintente nuevamente'

            setTimeout(() => {
                message.style.display = 'none'
                message.innerHTML = 'Estamos logueando su usuario'
                message.className = 'alert alert-info'
                submitBtn.disabled = false
            }, 2000)
        }
    }

    useEffect(() => {
        if(window.outerWidth > 412) {
            document.getElementById('login-main').className = 'container'
        }
    })

    return (
        <div id="login-main">
            <form>
                <div className="form-group">
                    <label htmlFor="login-email">Email address</label>
                    <input type="email" className="form-control" id="login-email" aria-describedby="emailHelp" placeholder="Enter email"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="login-password">Password</label>
                    <input type="password" className="form-control" id="login-password" placeholder="Password"></input>
                </div>
            </form>
            <div style={{ marginBottom: '16px' }}>
                <button type="submit" className="btn btn-primary" id='login-submit' onClick={loginUser}>Submit</button>

            </div>
            <InfoMessage id='login-msg' type='alert alert-info'>
                Estamos logueando su usuario
            </InfoMessage>
        </div>
    )
}

export default Login