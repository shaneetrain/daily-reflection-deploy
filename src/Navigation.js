import React from "react";
import { Switch, Route } from "react-router-dom";
import ReflectPage from "./pages/ReflectPage";
import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom";
import Spacer from "./components/Spacer";
import Home from "./pages/Home";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ViewReflection from "./pages/ViewReflection";

const Navigation = () => {
    let { pathname } = useLocation();
    return (
        <>
            {pathname !== "/signin" &&
            pathname !== "/signup" &&
            pathname !== "/welcome" ? (
                <Navbar />
            ) : null}
            <Spacer height={12} />
            <Switch>
                <Route path="/reflection/:id">
                    <ViewReflection />
                </Route>
                <Route path="/reflect">
                    <ReflectPage />
                </Route>

                <Route path="/signin">
                    <SignInPage />
                </Route>
                <Route path="/signup">
                    <SignUpPage />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </>
    );
};

export default Navigation;
