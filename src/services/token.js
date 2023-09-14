import jwtDecode from 'jwt-decode'

const getRefreshToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.refreshToken;
};
const getTokenClaims = (token) => jwtDecode(token);
const getRefreshClaims = () => getTokenClaims(getRefreshToken());
const getAccessClaims = () => getTokenClaims(getAccessToken());
  
const getAccessToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.accessToken;
};

const getExpiresRefreshToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.expiresRefresh;
};

const getExpiresAccessToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.expiresAccess;
};
  
const updateAccessToken = (token) => {
    let user = JSON.parse(localStorage.getItem("user"));
    user.accessToken = token;
    localStorage.setItem("user", JSON.stringify(user));
};
  
const getUser = () => JSON.parse(localStorage.getItem("user"));
const setUser = (user) => {
    const decodeAccess = jwtDecode(user.accessToken);
    user.email = jwtDecode(user.refreshToken)["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
    user.id = decodeAccess["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    user.role = decodeAccess["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    user.name = decodeAccess["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    localStorage.setItem("user", JSON.stringify(user));
}
const removeUser = () => localStorage.removeItem("user");
const parseJwt = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}
const TokenService = {
    getRefreshToken,
    getAccessToken,
    getExpiresAccessToken,
    getExpiresRefreshToken,
    getTokenClaims,
    getAccessClaims,
    getRefreshClaims,
    updateAccessToken,
    getUser,
    setUser,
    removeUser,
    parseJwt
};
  
export default TokenService;