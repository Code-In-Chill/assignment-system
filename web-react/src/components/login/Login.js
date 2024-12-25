import React, {useEffect, useState} from 'react';
import useLocalStorage from "../../utils/useLocalStorage";
import {Navigate, useSearchParams} from "react-router-dom";

const Login = () => {

    const [searchParams,] = useSearchParams();

    const loginFailed = searchParams.get("loginFailed")

    function sendLoginRequest(e) {
        e.preventDefault();

        const config = {
            clientId: "assignment-system",
            clientSecret: "1INm9jAu3ms84wLKCXz1S23LG3a5A1sJ",
            realm: "Assignment",
            authServerUrl: "http://localhost:8080/",
            redirectUri: "http://localhost:3000/callback"
        }

        const authUrl = `${config.authServerUrl}/realms/${config.realm}/protocol/openid-connect/auth` +
            `?client_id=${config.clientId}` +
            `&response_type=code` +
            `&redirect_uri=${encodeURI(config.redirectUri)}` +
            `&scope=openid`;

        window.location.assign(authUrl)
    }

    return (
        <div className={"Login"}>
            <form>
                <div>
                    <h1>You Must Login To View Assignments</h1>
                </div>

                {loginFailed &&
                <div>
                    <h3>Failed while login, please try again</h3>
                </div>
                }

                <div>
                    <button id={"submit"} type={"submit"} onClick={sendLoginRequest}>Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;