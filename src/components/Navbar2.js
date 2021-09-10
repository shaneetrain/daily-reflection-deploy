import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import HolLogo from "../assets/HolLogo";
import { Disclosure, Menu } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { Context } from "../context";
import { useLocation } from "react-router-dom";
import { getAuth } from "@firebase/auth";
import AvatarDropdown from "./AvatarDropdown";

const Navbar2 = () => {
    const { state, dispatch } = useContext(Context);
    const { user } = state;
    const [isHidden, setIsHidden] = useState("");

    const handleLogOut = () => {
        dispatch({
            type: "LOGOUT",
            payload: getAuth(),
        });
    };
    let { pathname } = useLocation();
    const tab = pathname;

    return (
        <Disclosure>
            <section class="py-4 bg-white">
                <div class="container px-4 mx-auto">
                    <nav class="relative">
                        <div class="flex justify-between items-center">
                            <Link class="text-lg font-medium" to="/">
                                <HolLogo height={30} width={30} />
                            </Link>
                            <div class="lg:hidden">
                                <button
                                    onClick={() => setIsHidden("")}
                                    class="navbar-burger flex items-center p-3 hover:bg-gray-50 rounded"
                                >
                                    <svg
                                        class="block h-4 w-4"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <title>Mobile menu</title>
                                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                                    </svg>
                                </button>
                            </div>
                            <ul class="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:w-auto lg:space-x-12">
                                <li>
                                    <Link
                                        class={`text-sm font-medium ${
                                            tab === "/" ? "text-accent" : null
                                        }`}
                                        to="/"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        class={`text-sm font-medium ${
                                            tab === "/reflections"
                                                ? "text-accent"
                                                : null
                                        }`}
                                        to="/reflections"
                                    >
                                        Reflections
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        class={`text-sm font-medium ${
                                            tab === "/reflect"
                                                ? "text-accent"
                                                : null
                                        }`}
                                        to={{ pathname: "/reflect" }}
                                    >
                                        Reflect
                                    </Link>
                                </li>
                            </ul>
                            <div class="hidden lg:block">
                                {!user ? (
                                    <>
                                        {" "}
                                        <Link
                                            class="inline-block mr-2 py-3 px-8 text-sm leading-normal rounded border font-medium"
                                            to="/signin"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            class="inline-block py-3 px-8 text-sm text-white font-medium leading-normal bg-accent hover:bg-accent-hover rounded transition duration-200"
                                            to="/signup"
                                        >
                                            Sign Up
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <AvatarDropdown direction={"right"} />
                                    </>
                                )}
                            </div>
                        </div>
                    </nav>
                </div>

                <div class={` ${isHidden} navbar-menu relative z-50`}>
                    <div class="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25 "></div>
                    <nav class="fixed top-0 right-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
                        <div class="flex items-center mb-8">
                            <Link class="mr-auto text-2xl font-medium leading-none"></Link>
                            <button
                                class="navbar-close"
                                onClick={() => setIsHidden("hidden")}
                            >
                                <svg
                                    class="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                        <div>
                            <ul>
                                <li class="mb-1">
                                    <Link
                                        class="block p-4 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded"
                                        to="/"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li class="mb-1">
                                    <Link
                                        class="block p-4 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded"
                                        to="/reflections"
                                    >
                                        Reflections
                                    </Link>
                                </li>
                                <li class="mb-1">
                                    <Link
                                        class="block p-4 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded"
                                        to="/reflect"
                                    >
                                        Reflect
                                    </Link>
                                    <Link
                                        class="block p-4 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded"
                                        to="/account"
                                    >
                                        Account
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div class="mt-auto">
                            <div class="pt-6">
                                {!user ? (
                                    <>
                                        {" "}
                                        <Link
                                            class="block mb-2 py-3 text-sm text-center leading-normal rounded border font-medium"
                                            link="/signin"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            class="block py-3 text-sm text-center text-white leading-normal rounded bg-accent font-medium transition duration-200"
                                            to="/signup"
                                        >
                                            Sign Up
                                        </Link>
                                    </>
                                ) : (
                                    <Link
                                        class="block py-3 text-sm text-center text-white leading-normal rounded bg-accent font-medium transition duration-200"
                                        to="/signin"
                                        onClick={handleLogOut}
                                    >
                                        Log Out
                                    </Link>
                                )}
                            </div>
                            <p class="mt-6 mb-4 text-sm text-center text-gray-500">
                                <span></span>
                            </p>
                        </div>
                    </nav>
                </div>
            </section>
        </Disclosure>
    );
};

export default Navbar2;
