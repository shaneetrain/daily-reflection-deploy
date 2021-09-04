import { createContext, useReducer } from "react";
import { destroyCookie, setCookie } from "nookies";

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.payload };
        case "LOGOUT":
            destroyCookie(null, "token");
            setCookie(null, "token", null, {});
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
    const value = { state, dispatch };
    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };
