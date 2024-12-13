import React from 'react';

const Login = () => {
    return (
        <div className={"Login"}>
            <div>
                <label htmlFor={"username"}>Username or Email</label>
                <input type={"text"} id={"username"} name={"username"}/>
            </div>

            <div>
                <label htmlFor={"password"}>Password</label>
                <input type={"password"} id={"password"} name={"password"}/>
            </div>

            <button>Login</button>
        </div>
    );
};

export default Login;