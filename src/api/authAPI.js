import { getAuth } from "@firebase/auth";
import axios from "axios";

const Auth = axios.create({
    baseURL: `https://daily-reflection-server.herokuapp.com/api/v1/auth`,
});

// Inserts auth token into header for every Auth request
Auth.interceptors.request.use(
    async (config) => {
        let user = await getAuth().currentUser;
        config.headers.token = user ? await user.getIdToken(true) : "";
        return config;
    },
    (err) => Promise.reject(err)
);

export default Auth;
