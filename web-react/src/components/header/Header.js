import React, {useEffect} from 'react';
import "./Header.css";
import {Link} from "react-router-dom";
import useLocalStorage from "../../utils/useLocalStorage";
import parseToken, {getRolesArray} from "../../utils/jwt";

const Header = () => {

    const [token, setToken] = useLocalStorage("", "token");
    const [idToken, setIdToken] = useLocalStorage("", "idToken");

    function handleLogout() {
        const redirectUri = "http://localhost:3000/callback?logout=true";
        window.location.href = `http://localhost:8080/realms/Assignment/protocol/openid-connect/logout?` +
            `id_token_hint=${encodeURI(idToken)}` +
            `&post_logout_redirect_uri=${encodeURIComponent(redirectUri)}`;
    }

    function handleLogin() {
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

    useEffect(() => {
        console.log(getRolesArray(token));
    }, []);

    return (
        <header className={"Header"}>
            <nav className="Nav">
                <div>
                    <Link className={"ProjectLink"} to={"/dashboard"}>Assignment System</Link>
                    <ul className="List">
                        <li><Link to={"/"}>Home</Link></li>
                        <li><Link to={"/dashboard"}>Dashboard</Link></li>
                    </ul>
                </div>
                {
                    token || token.length > 0 ?
                        <button className={"BtnLogout"} onClick={handleLogout}>Logout</button> :
                        <button className={"BtnLogin"} onClick={handleLogin}>Login</button>
                }
            </nav>

        </header>
    );
};

export default Header;