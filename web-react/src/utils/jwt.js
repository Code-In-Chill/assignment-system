export default function parseToken (token) {
    if (!token) {
        return null;
    }

    const arrayToken = token.split(".");

    return JSON.parse(atob(arrayToken[1]));
}

export function getRolesArray(token) {
    if (!token) {
        return [];
    }
    const parsedToken = parseToken(token);
    return parsedToken.realm_access.roles;
}