import React, {useState} from 'react';
import useLocalStorage from "../../utils/useLocalStorage";
import {Navigate} from "react-router-dom";

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("");

    const [token, setToken] = useLocalStorage("", "token");

    function handleChange(event) {
        switch (event.target.id) {
            case "username":
                setUsername(event.target.value);
                break;

            case "password":
                setPassword(event.target.value);
                break;

            default:
                break;
        }
    }

    function sendLoginRequest(event) {
        event.preventDefault();
        if (!token) {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            const urlencoded = new URLSearchParams();
            urlencoded.append("grant_type", "password");
            urlencoded.append("client_id", "assignment-system");
            urlencoded.append("username", username);
            urlencoded.append("password", password);
            urlencoded.append("client_secret", "j2t5MYK3N6E2OLculUGRj3mItwPntVVj");
            urlencoded.append("scope", "openid");

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: urlencoded,
                redirect: "follow"
            };

            fetch("http://localhost:8080/realms/Assignment/protocol/openid-connect/token", requestOptions)
                .then((response) => {
                    if (response.status === 200) {
                        return Promise.all([response.json()]);
                    } else {
                        return Promise.reject("Invalid login attempt");
                    }
                })
                .then(([result]) => {
                    setToken(result.access_token);
                    window.location.href = "dashboard";
                }).catch((message) => alert(message))
        }
    }

    return (
        <div className={"Login"}>
            <form>
                <div>
                    <label htmlFor={"username"}>Username or Email</label>
                    <input type={"text"} id={"username"} value={username} onChange={handleChange} required={true}/>
                </div>

                <div>
                    <label htmlFor={"password"}>Password</label>
                    <input type={"password"} id={"password"} value={password} onChange={handleChange} required={true}/>
                </div>

                <div>
                    <button id={"submit"} type={"submit"} onClick={sendLoginRequest}>Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;