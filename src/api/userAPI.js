import axios from "axios";

const Users = axios.create({
    baseURL: `https://daily-reflection-server.herokuapp.com/api/v1/users`,
});

const updateUser = async (id, data) => {
    const response = await Users.post(`/update/${id}`, data);
    return response.data;
};

export { updateUser };
export default Users;
