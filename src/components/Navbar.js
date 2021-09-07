/* This example requires Tailwind CSS v2.0+ */
import { useContext } from "react";
import { Disclosure, Menu } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { Context } from "../context";
import { useLocation, useHistory } from "react-router-dom";
import { getAuth } from "@firebase/auth";

export default function Navbar() {
    const { state, dispatch } = useContext(Context);
    const { user } = state;

    const router = useHistory();
    const handleLogOut = () => {
        dispatch({
            type: "LOGOUT",
            payload: getAuth(),
        });
        // router.push("/signin");
    };
    let { pathname } = useLocation();
    const tab = pathname;
    const mobileHighlighted =
        "bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium";
    const mobileDefault =
        "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium";

    const navHighlightedStyle =
        "border-blue-600 text-gray-900 inline-flex items-center px-1 pt-1 pb-3 border-b-2 text-sm font-medium ";
    const navDefaultStyle =
        "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 pb-3 border-b-2 text-sm font-medium";

    return (
        <Disclosure as="nav" className="bg-white shadow absolute w-full">
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 ">
                            <div className="flex">
                                <div className="hidden sm:ml-6 sm:flex sm:space-x-8 items-end">
                                    {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                                    <Link to="/">
                                        <a
                                            href="#"
                                            className={
                                                tab === "/"
                                                    ? navHighlightedStyle
                                                    : navDefaultStyle
                                            }
                                        >
                                            Home
                                        </a>
                                    </Link>
                                    <Link to="/reflect">
                                        <a
                                            href="#"
                                            className={
                                                tab === "/reflect"
                                                    ? navHighlightedStyle
                                                    : navDefaultStyle
                                            }
                                        >
                                            Reflect
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:items-center">
                                <button
                                    type="button"
                                    className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <span className="sr-only">
                                        View notifications
                                    </span>
                                    <BellIcon
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                    />
                                </button>

                                {/* Profile dropdown */}
                                <Menu as="div" className="ml-3 relative">
                                    <div>
                                        {!user ? (
                                            <Link to="/signin">
                                                <a
                                                    href="#"
                                                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                                >
                                                    Log In
                                                </a>
                                            </Link>
                                        ) : (
                                            <Link to="/signin">
                                                <a
                                                    href="#"
                                                    onClick={handleLogOut}
                                                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                                >
                                                    Log Out
                                                </a>
                                            </Link>
                                        )}
                                    </div>
                                </Menu>
                            </div>
                            <div className="-mr-2 flex items-center sm:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                    <span className="sr-only">
                                        Open main menu
                                    </span>
                                    {open ? (
                                        <XIcon
                                            className="block h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <MenuIcon
                                            className="block h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="pt-2 pb-3 space-y-1">
                            {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                            <Link to="/">
                                <a
                                    href="#"
                                    className={
                                        tab === "/"
                                            ? mobileHighlighted
                                            : mobileDefault
                                    }
                                >
                                    Home
                                </a>
                            </Link>
                            <Link to="/reflect">
                                <a
                                    href="#"
                                    className={
                                        tab === "/reflect"
                                            ? mobileHighlighted
                                            : mobileDefault
                                    }
                                >
                                    Reflect
                                </a>
                            </Link>
                        </div>
                        <div className="pt-4 pb-3 border-t border-gray-200">
                            <div className="flex items-center px-4">
                                <div className="flex-shrink-0"></div>
                                <div className="ml-3">
                                    <div className="text-base font-medium text-gray-800">
                                        {user ? user.username : null}
                                    </div>
                                    <div className="text-sm font-medium text-gray-500">
                                        {user ? user.email : null}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 space-y-1">
                                <Link to="/signin">
                                    <a
                                        href="#"
                                        onClick={handleLogOut}
                                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                                    >
                                        Log out
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}
