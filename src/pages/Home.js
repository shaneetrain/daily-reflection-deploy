import { useContext, useEffect, useState } from "react";
import FormFormik from "../components/formFormik";
import { Context } from "../context";
import { useFormik } from "formik";
import * as yup from "yup";
import { updateUser } from "../api/userAPI";
import { useQuery, useQueryClient } from "react-query";
import { getUserEntries } from "../api/entriesAPI";

export default function Home() {
    const { state } = useContext(Context);
    const { data, isLoading, isError } = useQuery("entries", () =>
        getUserEntries("612fd1549ee498699064250e")
    );

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

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div>Hello there {!state.user ? null : state.user.username}</div>

            {state.user && !state.user.username ? (
                <form onSubmit={formik.handleSubmit}>
                    <FormFormik
                        formikProps={formik.getFieldProps(`username`)}
                        name={`username`}
                        question={"username"}
                        type={"text"}
                        justify={"self-start"}
                        error={
                            eval(`formik.errors.username`) &&
                            eval(`formik.touched.username`)
                        }
                        test={eval(`formik.errors.username`)}
                    />
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Submit Username
                    </button>
                </form>
            ) : null}

            {!isLoading && !isError ? (
                <>
                    <div>WOAHHHHHHHHH</div>
                    <div>{data.data.entries[0].responses[0].question}</div>
                </>
            ) : null}
        </div>
    );
}
