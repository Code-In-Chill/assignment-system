import React, {useEffect} from 'react';
import {useSearchParams} from "react-router-dom";
import useLocalStorage from "../../utils/useLocalStorage";
import {ajaxUrlEncoded, METHOD_POST} from "../../services/fetchService";
import "./Callback.css";

const Callback = () => {

    const [searchParams,] = useSearchParams();
    const [token, setToken] = useLocalStorage("", "token")
    const [, setIdToken] = useLocalStorage("", "idToken")

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

        const urlencoded = new URLSearchParams();
        urlencoded.append("grant_type", "authorization_code");
        urlencoded.append("client_id", `${config.clientId}`);
        urlencoded.append("client_secret", `${config.clientSecret}`);
        urlencoded.append("code", `${code}`);
        urlencoded.append("redirect_uri", encodeURI(`${config.redirectUri}`));

        // handle token exchange while login
        if (code) {
            ajaxUrlEncoded("http://localhost:8080/realms/Assignment/protocol/openid-connect/token", METHOD_POST, null, urlencoded)
                .then((result) => {
                    setToken(result.access_token)
                    setIdToken(result.id_token)
                    window.location.href = "/dashboard";
                })
                .catch(() => {
                    window.location.href = "/login?loginFailed=true";
                })
        }

        // handle logout from keycloak
        if (logout) {
            setToken("")
            setIdToken("")
            window.location.href = "/";
        }
    }, []);

    return (
        <div className={"Callback"}>
            <div className="loader">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
            </div>

            <h1 className={"CallbackRedirect"}>
                Redirecting...
            </h1>
        </div>
    );
};

export default Callback;