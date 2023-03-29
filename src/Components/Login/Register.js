function Register({ path }) {

    const registerUser = async () => {
        const email = document.getElementById('register-email')
        const password = document.getElementById('register-password')
        const submitBtn = document.getElementById('register-submit')

        submitBtn.disabled = true

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": email.value,
                "password": password.value
            })
        };

        const res = await fetch(`${path}/user/register`, requestOptions)
        const data = await res.json()

        console.log(res)
        console.log(data)
    }

    return (
        <>
            <form>
                <div className="form-group">
                    <label htmlFor="register-email">Email address</label>
                    <input type="email" className="form-control" id="register-email" aria-describedby="emailHelp" placeholder="Enter email"></input>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="register-password">Password</label>
                    <input type="password" className="form-control" id="register-password" placeholder="Password"></input>
                </div>
            </form>
            <button type="submit" className="btn btn-primary" id='register-submit' onClick={registerUser}>Submit</button>
        </>
    )
}

export default Register