import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Form, Field, ErrorMessage, Formik } from "formik";
import * as yup from "yup";
import Spacer from "../components/Spacer";
import { useHistory } from "react-router";

const SignInPage = () => {
    const router = useHistory();

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = yup.object({
        email: yup
            .string()
            .email("Please enter a valid email")
            .required("Please enter your email"),

        password: yup.string().required("Please enter a password"),
    });

    const signInUser = async (values) => {
        try {
            const auth = getAuth();
            const user = await signInWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );

            if (user) {
                router.push("/");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={signInUser}
            >
                <Form className=" flex flex-col justify-center items-center w-80 h-72 shadow-lg rounded-xl bg-gray-50">
                    <div className="py-3 px-2  w-full flex justify-center flex-col items-center ">
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
                            placeholder="Enter your password"
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

                    <button
                        className="px-12 py-4 my-4 text-xl bg-blue-600 rounded-full text-white"
                        type="submit"
                    >
                        Sign In
                    </button>
                </Form>
            </Formik>
            <Spacer height={6} />
            <p>
                don't have an account?{" "}
                <a
                    className="text-blue-600"
                    href={"/signup"}
                    onClick={() => router.push("/signup")}
                >
                    Sign Up.
                </a>
            </p>
        </div>
    );
};

export default SignInPage;
