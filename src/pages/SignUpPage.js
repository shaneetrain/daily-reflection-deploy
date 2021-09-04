import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Form, Field, ErrorMessage, Formik } from "formik";
import * as yup from "yup";
import Spacer from "../components/Spacer";
import { useHistory } from "react-router";

const SignUpPage = () => {
    const router = useHistory();

    const initialValues = {
        email: "",
        password: "",
        confirmPassword: "",
    };

    const validationSchema = yup.object({
        email: yup
            .string()
            .email("Please enter a valid email")
            .required("Please enter your email"),

        password: yup
            .string()
            .required("Please enter a password")
            .min(6, "Password must be atleast six characters"),
        confirmPassword: yup
            .string()
            .required("Please confirm your password")
            .min(6, "Password must be atleast 6 characters")
            .test(
                "passwords-match",
                "Passwords do not match",
                function (value) {
                    return this.parent.password === value;
                }
            ),
    });

    const registerUser = async (values) => {
        try {
            const auth = getAuth();
            const user = await createUserWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );
            router.push("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={registerUser}
            >
                <Form className=" flex flex-col justify-center items-center w-80 h-96 shadow-lg rounded-xl bg-gray-50">
                    <div className="py-3 px-2  w-full flex justify-center flex-col items-center">
                        <Field
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            type="email"
                            className="border border-blue-600 px-4 py-1 rounded-md w-72 h-12"
                        />
                        <ErrorMessage name="email">
                            {(msg) => (
                                <div className="text-red-600 text-xs">
                                    {msg}
                                </div>
                            )}
                        </ErrorMessage>
                    </div>
                    <div className="py-3 px-2">
                        <Field
                            id="password"
                            name="password"
                            placeholder="Enter a password"
                            type="password"
                            className="border border-blue-600 px-4 py-1 rounded-md w-72 h-12"
                        />
                        <ErrorMessage name="password">
                            {(msg) => (
                                <div className="text-red-600 text-xs">
                                    {msg}
                                </div>
                            )}
                        </ErrorMessage>
                    </div>
                    <div className="py-3 px-2">
                        <Field
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            type="password"
                            className="border border-blue-600 px-4 py-1 rounded-md w-72 h-12"
                        />
                        <ErrorMessage name="confirmPassword">
                            {(msg) => (
                                <div className="text-red-600 text-xs">
                                    {msg}
                                </div>
                            )}
                        </ErrorMessage>
                    </div>
                    <Spacer height={6} />
                    <button
                        className="px-12 py-4 my-4 text-xl bg-blue-600 rounded-full text-white"
                        type="submit"
                    >
                        Sign Up
                    </button>
                </Form>
            </Formik>
            <Spacer height={6} />
            <p>
                already have an account?{" "}
                <a
                    className="text-blue-600"
                    href={"/signin"}
                    onClick={() => router.push("/signin")}
                >
                    Sign In.
                </a>
            </p>
        </div>
    );
};

export default SignUpPage;
