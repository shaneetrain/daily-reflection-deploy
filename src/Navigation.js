import React from "react";
import { Switch, Route } from "react-router-dom";
import ReflectPage from "./pages/ReflectPage";
import { useLocation } from "react-router-dom";
import Home from "./pages/Home";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ViewReflection from "./pages/ViewReflection";
import Navbar2 from "./components/Navbar2";
import ReflectionsPage from "./pages/ReflectionsPage";
import SignIn from "./pages/SignIn";

const Navigation = () => {
    let { pathname } = useLocation();
    return (
        <>
            {pathname !== "/signin" &&
            pathname !== "/signup" &&
            pathname !== "/welcome" ? (
                <Navbar2 />
            ) : null}
            <Switch>
                <Route path="/reflection/:id">
                    <ViewReflection />
                </Route>
                <Route path="/reflections">
                    <ReflectionsPage />
                </Route>
                <Route path="/reflect">
                    <ReflectPage />
                </Route>
                <Route path="/signin">
                    <SignInPage />
                </Route>
                <Route path="/signin2">
                    <SignIn />
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
