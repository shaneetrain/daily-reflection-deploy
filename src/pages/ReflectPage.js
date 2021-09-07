import { parseCookies } from "nookies";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import FormFormik from "../components/formFormik";
import Spacer from "../components/Spacer";
import { Context } from "../context/index";
import { postNewEntry } from "../api/entriesAPI";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { addHours, format, subHours } from "date-fns";

const questions = [
    {
        text: "Are you on the right path? Why?",
        type: "textarea",
        num: 0,
        height: "h-96",
    },
    {
        text: "Out of 10, how well did the day go?",
        type: "number",
        num: 1,
        height: "h-12",
        width: "w-24",
        justify: "self-start",
    },
    {
        text: "What went well today?",
        type: "textarea",
        num: 2,
        height: "h-48",
    },
    {
        text: "What went poorly today?",
        type: "textarea",
        num: 3,
        height: "h-48",
    },
    {
        text: "Did you do anything different today?",
        type: "textarea",
        num: 4,
        height: "h-48",
    },
    {
        text: "What did you learn today?",
        type: "textarea",
        num: 5,
        height: "h-96",
    },
    {
        text: "What could you do better tomorrow?",
        type: "textarea",
        num: 6,
        height: "h-48",
    },
    {
        text: "What are you grateful for?",
        type: "textarea",
        num: 7,
        height: "h-96",
    },
    {
        text: "What should you do tomorrow?",
        type: "textarea",
        num: 8,
        height: "h-24",
    },
    {
        text: "Where are you not being honest with yourself?",
        type: "textarea",
        num: 9,
        height: "h-96",
    },
];

export default function ReflectPage({ authorized }) {
    const { state, isAuthenticating } = useContext(Context);
    const [isError, setIsError] = useState(false);
    const router = useHistory();

    const schema = yup.object({
        answer0: yup.string().required("This answer is required."),
        answer1: yup
            .number("This answer must be a number")
            .required("This answer is required.")
            .min(0, "number must be 0-10")
            .max(10, "number must be 0-10"),
        answer2: yup.string().required("This answer is required."),
        answer3: yup.string().required("This answer is required."),
        answer4: yup.string().required("This answer is required."),
        answer5: yup.string().required("This answer is required."),
        answer6: yup.string().required("This answer is required."),
        answer7: yup.string().required("This answer is required."),
        answer8: yup.string().required("This answer is required."),
        answer9: yup.string().required("This answer is required."),
    });

    const formik = useFormik({
        initialValues: {
            answer0: "",
            answer1: "",
            answer2: "",
            answer3: "",
            answer4: "",
            answer5: "",
            answer6: "",
            answer7: "",
            answer8: "",
            answer9: "",
        },
        onSubmit: async (values) => {
            try {
                const now = new Date();
                const data = {
                    date: addHours(now, 6),
                    username: state.user.username,
                    user: state.user._id,
                    responses: [
                        {
                            question: questions[0].text,
                            answer: values.answer0,
                        },
                        {
                            question: questions[1].text,
                            answer: values.answer1,
                        },
                        {
                            question: questions[2].text,
                            answer: values.answer2,
                        },
                        {
                            question: questions[3].text,
                            answer: values.answer3,
                        },
                        {
                            question: questions[4].text,
                            answer: values.answer4,
                        },
                        {
                            question: questions[5].text,
                            answer: values.answer5,
                        },
                        {
                            question: questions[6].text,
                            answer: values.answer6,
                        },
                        {
                            question: questions[7].text,
                            answer: values.answer7,
                        },
                        {
                            question: questions[8].text,
                            answer: values.answer8,
                        },
                        {
                            question: questions[9].text,
                            answer: values.answer9,
                        },
                    ],
                };
                const res = await postNewEntry(data);
                if (res.status === "success") {
                    toast.success("🦄 Entry Submitted!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setIsError(false);
                    router.push("/");
                } else {
                    setIsError(true);
                }
            } catch (err) {
                toast.error(`There was an error submitting your entry`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                console.log(err);
                setIsError(true);
            }
        },
        validationSchema: schema,
    });

    if (isAuthenticating) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                loading...
            </div>
        );
    }
    if (!state.user.username) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                You must provide a name in the homepage to access Reflect
            </div>
        );
    }
    return (
        <div className="pt-12 bg-gray-50 w-screen h-full">
            <div className="flex justify-center">
                <p className="font-bold lg:text-5xl lg:mb-24 lg:mt-6 text-4xl mb-8">
                    Daily Reflection
                </p>
            </div>
            <form
                className="flex justify-center"
                onSubmit={formik.handleSubmit}
            >
                <div className="flex flex-col items-center w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
                    {questions.map((q) => (
                        <FormFormik
                            formikProps={formik.getFieldProps(`answer${q.num}`)}
                            key={q.text}
                            name={`answer${q.num}`}
                            question={q.text}
                            height={q.height}
                            width={q.width}
                            type={q.type}
                            justify={q.justify}
                            error={
                                eval(`formik.errors.answer${q.num}`) &&
                                eval(`formik.touched.answer${q.num}`)
                            }
                            test={eval(`formik.errors.answer${q.num}`)}
                        />
                    ))}
                    <button
                        type="submit"
                        className="shadow-blue-600 hover:text-blue-600 hover:bg-gray-50 bg-blue-600 text-gray-50 inline-flex items-center mb-6 px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-xl "
                    >
                        Sumbit Reflection
                    </button>
                    {isError ? (
                        <p className="text-base text-red-600">
                            There was an error submitting your form
                        </p>
                    ) : null}
                </div>
            </form>
            <Spacer height={24} />
        </div>
    );
}

export async function getServerSideProps(context) {
    try {
        const cookies = parseCookies(context);
        const { data } = await axios.get("http://localhost:8000/api/v1/auth", {
            headers: {
                token: cookies.token,
            },
        });
        const authorized = data.ok;

        return {
            props: { authorized }, // will be passed to the page component as props
        };
    } catch (err) {
        return {
            redirect: {
                permanent: false,
                destination: "/signin",
            },
        };
    }
}
