import { useContext, useEffect, useState } from "react";
import FormFormik from "../components/formFormik";
import { Context } from "../context";
import { useFormik } from "formik";
import * as yup from "yup";
import { updateUser } from "../api/userAPI";
import { useQuery, useQueryClient } from "react-query";
import { getUserEntries } from "../api/entriesAPI";
import Spacer from "../components/Spacer";
import Button from "../components/Button";
import { useHistory } from "react-router";
import { addDays, format, formatISO, parseISO } from "date-fns";
import { ArrowCircleRightIcon } from "@heroicons/react/outline";
import FunctionalCalendar from "../components/FunctionalCalendar";
import { subDays } from "date-fns";
import AvatarDropdown from "../components/AvatarDropdown";

export default function Home() {
    const { state, isAuthenticating } = useContext(Context);
    const router = useHistory();

    const [entries, setEntries] = useState([]);
    const [startDate, setStartDate] = useState(subDays(new Date(), 8));
    const [endDate, setEndDate] = useState(new Date());

    const schema = yup.object({
        username: yup.string().required("This answer is required"),
    });
    const formik = useFormik({
        initialValues: {
            username: "",
        },
        onSubmit: async (values) => {
            try {
                const username = values.username;
                const res = await updateUser(state.user._id, {
                    username: username,
                });
                window.location.reload(window.location.pathname);
            } catch (err) {
                console.log(err);
            }
        },
        validationSchema: schema,
    });

    const getEntries = async () => {
        try {
            const mongoDates = {
                startDate: formatISO(startDate),
                endDate: formatISO(addDays(endDate, 1)),
            };
            console.log(mongoDates);
            const validEntries = await getUserEntries(
                state.user._id,
                mongoDates
            );
            setEntries(validEntries.data.entries);
            console.log(entries);
        } catch (err) {
            console.log(err);
        }
    };

    if (isAuthenticating) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen"></div>
        );
    }

    if (!state.user) router.push("signin");

    return (
        <div className="flex flex-col items-center pt-12 min-h-screen py-2 bg-gray-50">
            <div className="flex pb-4">
                <p className="text-3xl md:text-4xl md:px-2 font-semibold text-gray-400 px-1">
                    Welcome
                </p>
                <p className="text-3xl md:text-4xl md:px-2 font-bold text-accent px-1">
                    {state.user ? state.user.username : null}
                </p>
            </div>

            {!state.user.username ? (
                <div>
                    <form
                        className="flex flex-row items-center"
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="py-3 md:py-6 flex flex-col items-center w-11/12 h-auto">
                            <label
                                htmlFor="username"
                                className="self-start text-md md:text-xl font-sans font-semibold text-gray-900"
                            ></label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                className={` px-4 py-2 border-2 border-accent-hover rounded-l-lg bg-white my-2`}
                                style={{ resize: "none", outline: "none" }}
                                {...formik.getFieldProps(`username`)}
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className={`inline-flex justify-center h-11 w-32 items-center px-6 py-3 border border-transparent text-sm font-medium rounded-r-lg shadow-sm text-white bg-accent hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent`}
                            >
                                Pick Name
                            </button>
                        </div>
                    </form>
                </div>
            ) : null}
        </div>
    );
}
