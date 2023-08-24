import jwtDecode from 'jwt-decode'

const getRefreshToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.refreshToken;
};

const getTokenClaims = (token) => jwtDecode(token);
const getRefreshClaims = () => getTokenClaims(getRefreshToken());
const getAccessClaims = () => getTokenClaims(getAccessToken());
const clearUser = () => localStorage.removeItem("user");
  
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
const setUser = (user) => localStorage.setItem("user", JSON.stringify(user));
const removeUser = () => localStorage.removeItem("user");
  
const TokenService = {
    getRefreshToken,
    getAccessToken,
    getExpiresAccessToken,
    getExpiresRefreshToken,
    getTokenClaims,
    getAccessClaims,
    getRefreshClaims,
    updateAccessToken,
    clearUser,
    getUser,
    setUser,
    removeUser,
};
  
export default TokenService;