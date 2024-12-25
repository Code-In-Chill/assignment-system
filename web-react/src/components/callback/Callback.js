import React, {useEffect} from 'react';
import {Navigate, useNavigate, useSearchParams} from "react-router-dom";
import useLocalStorage from "../../utils/useLocalStorage";

const Callback = () => {

    const [searchParams,] = useSearchParams();
    const navigate = useNavigate();
    const [token, setToken] = useLocalStorage("", "token")
    const [idToken, setIdToken] = useLocalStorage("", "idToken")

    const code = searchParams.get("code")
    const logout = searchParams.get("logout")

    useEffect(() => {
        const config = {
            clientId: "assignment-system",
            clientSecret: "1INm9jAu3ms84wLKCXz1S23LG3a5A1sJ",
            realm: "Assignment",
            authServerUrl: "http://localhost:8080/",
            redirectUri: "http://localhost:3000/callback"
        }

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/x-www-form-urlencoded');

        const urlencoded = new URLSearchParams();
        urlencoded.append("grant_type", "authorization_code");
        urlencoded.append("client_id", `${config.clientId}`);
        urlencoded.append("client_secret", `${config.clientSecret}`);
        urlencoded.append("code", `${code}`);
        urlencoded.append("redirect_uri", encodeURI(`${config.redirectUri}`));

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: urlencoded,
            redirect: "follow"
        };

        if (code) {
            fetch("http://localhost:8080/realms/Assignment/protocol/openid-connect/token",
                requestOptions)
                .then(async (response) => {
                    if (response.status === 200) {
                        return response.json()
                    } else {
                        return Promise.reject();
                    }
                }).then((result) => {
                console.log(result)
                setToken(result.access_token)
                setIdToken(result.id_token)
                navigate("/dashboard");
            }).catch(() => {
                return <Navigate to={"/login?loginFailed=true"}/>
            })
        }

        if (logout) {
            setToken("")
            setIdToken("")
            navigate("/")
        }
    }, []);

    return (
        <h1>
            Redirecting...
        </h1>
    );
};

export default Callback;