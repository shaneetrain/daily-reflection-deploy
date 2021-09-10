import { Menu, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Context } from "../context";
import { Link } from "react-router-dom";
import { getAuth } from "@firebase/auth";

export default function AvatarDropdown({ direction }) {
    const { state, dispatch } = useContext(Context);
    const { user } = state;

    const handleLogOut = () => {
        dispatch({
            type: "LOGOUT",
            payload: getAuth(),
        });
    };

    return (
        <div className="">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button>
                        <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-accent">
                            <span className="text-sm font-medium leading-none text-white">
                                {user ? user.username[0] : null}
                            </span>
                        </span>
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items
                        className={`absolute ${direction}-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                    >
                        <div className="px-1 py-1 ">
                            <Menu.Item>
                                {({ active }) => (
                                    <Link
                                        to="/account"
                                        className={`${
                                            active
                                                ? "bg-accent text-white"
                                                : "text-gray-900"
                                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                    >
                                        Account
                                    </Link>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <Link
                                        onClick={handleLogOut}
                                        to="/signin"
                                        className={`${
                                            active
                                                ? "bg-accent text-white"
                                                : "text-gray-900"
                                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                    >
                                        Log Out
                                    </Link>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}
