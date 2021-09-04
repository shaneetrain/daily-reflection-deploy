import { getAuth, onIdTokenChanged } from "@firebase/auth";
import React, { useEffect, useContext } from "react";
import { Context } from "./index";
import Auth from "../api/authAPI";
import { initializeApp } from "firebase/app";
import { setCookie, destroyCookie } from "nookies";

const firebaseConfig = {
    apiKey: "AIzaSyAch4RuvJZQch2kA6Gn085VU_VvKUP9254",
    authDomain: "reflect-a1e61.firebaseapp.com",
    projectId: "reflect-a1e61",
    storageBucket: "reflect-a1e61.appspot.com",
    messagingSenderId: "47538440852",
    appId: "1:47538440852:web:a9de027b7e0d9b360c0281",
};

const FirebaseAuthState = ({ children }) => {
    const { dispatch } = useContext(Context);

    useEffect(() => {
        initializeApp(firebaseConfig);
        const auth = getAuth();
        return onIdTokenChanged(auth, async (user) => {
            if (user) {
                try {
                    const { token } = await user.getIdTokenResult();
                    destroyCookie(null, "token");
                    setCookie(null, "token", token, {});

                    const response = await Auth.post("/user", {});

                    dispatch({
                        type: "LOGIN",
                        payload: response.data.user,
                    });
                } catch (err) {
                    console.log(err);
                }
            } else {
                destroyCookie(null, "token");
                setCookie(null, "token", "", {});
                dispatch({
                    type: "LOGOUT",
                });
            }
        });
    }, []);

    return <>{children}</>;
};

export default FirebaseAuthState;
