import api from "./api";

const API_URL_USER = "https://localhost:7053/resources/api/User/";

const get = () => {
	return api.get(API_URL_USER);
};

const getById = (id) => {
	return api.get(API_URL_USER +
		`id/${id}`);
};

const getByLogin = (login) => {
	return api.get(API_URL_USER +
		`login/${login}`);
};

const getAll = () => {
	return api.get(API_URL_USER + "all");
};

const updateLogin = (login) => {
	return api.put(API_URL_USER + 
		`login/${login}`);
};

const deleteByAdmin = (id) => {
	return api.delete(API_URL_USER + 
		`admin/${id}`);
};

const UserService = {
	get,
	getById,
	getByLogin,
	getAll,
	updateLogin,
	deleteByAdmin
};

export default UserService;