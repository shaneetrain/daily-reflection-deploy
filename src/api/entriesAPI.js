import axios from "axios";

const Entries = axios.create({
    baseURL: `https://daily-reflection-server.herokuapp.com/api/v1/entries`,
});

const postNewEntry = async (data) => {
    const response = await Entries.post("/", data);
    return response.data;
};

const getUserEntries = async (id, body) => {
    const response = await Entries.post(`/${id}`, body);
    return response.data;
};

export { postNewEntry, getUserEntries };
export default Entries;
