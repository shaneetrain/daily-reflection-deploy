import { createContext, useReducer, useState } from "react";
import { destroyCookie, setCookie } from "nookies";
import { signOut } from "@firebase/auth";

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.payload };
        case "LOGOUT":
            if (action.payload) {
                signOut(action.payload);
            }
            destroyCookie(null, "token");
            setCookie(null, "token", "", {});
            return { ...state, user: null };
        case "UPDATE":
            return { ...state, user: action.payload };
        default:
            return state;
    }
};

const initialState = {
    user: null,
};

const Context = createContext({});

const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isAuthenticating, setIsAuthenticating] = useState(true);

    const value = {
        state,
        dispatch,
        isAuthenticating,
        setIsAuthenticating,
    };
    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };
