import useLocalStorage from "../../utils/useLocalStorage";

const PrivateRoute = ({children}) => {

    const [token] = useLocalStorage("", "token");

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

    return token ? children : handleLogin();
};

export default PrivateRoute;