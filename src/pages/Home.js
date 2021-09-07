import { useContext, useState } from "react";
import FormFormik from "../components/formFormik";
import { Context } from "../context";
import { useFormik } from "formik";
import * as yup from "yup";
import { updateUser } from "../api/userAPI";
import { useQuery, useQueryClient } from "react-query";
import { getUserEntries } from "../api/entriesAPI";
import DatePicker from "../components/DatePicker";
import Spacer from "../components/Spacer";
import DateRange from "../components/DateRangePicker";
import Button from "../components/Button";
import { useHistory } from "react-router";
import { addDays, format, parseISO } from "date-fns";
import { ArrowCircleRightIcon } from "@heroicons/react/outline";

export default function Home() {
    const { state, isAuthenticating } = useContext(Context);
    const router = useHistory();

    const [entries, setEntries] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
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
                startDate: format(startDate, "yyyy-MM-dd"),
                endDate: format(addDays(endDate, 1), "yyyy-MM-dd"),
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
            <div className="flex pb-12">
                <p className="text-6xl font-semibold text-gray-400 px-2">
                    Hello
                </p>
                <p className="text-6xl font-bold text-blue-600 px-2">
                    {state.user.username}
                </p>
            </div>

            {!state.user.username ? (
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
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Submit Username
                    </button>
                </form>
            ) : null}
            {state.user.username ? (
                <>
                    <Spacer height={6} />
                    <DateRange
                        startDate={startDate}
                        endDate={endDate}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                    />
                    <Spacer height={6} />
                    <Button text="Get Entries" onClick={getEntries} />
                </>
            ) : null}
            <div className="my-4 sm:my-8 md:my-12 xl:w-2/5 lg:w-1/2 md:w-3/5 w-96 ">
                {state.user && entries.length > 0
                    ? entries.map((e) => {
                          let i = 0;
                          return (
                              <div
                                  onClick={() => {
                                      router.push({
                                          pathname: `/reflection/${e._id}`,
                                          state: { reflection: e },
                                      });
                                  }}
                                  className=" hover:-translate-y-1 hover:shadow-lg cursor-pointer transform transition my-6 flex-row flex justify-between items-center rounded-xl shadow-md bg-white p-6  h-auto overflow-hidden "
                              >
                                  <div className="flex flex-col  w-10/12">
                                      <div className="text-xl font-bold pb-4">
                                          {format(
                                              parseISO(e.date),
                                              "LLLL' 'do', 'yyyy"
                                          )}
                                      </div>
                                      <div>
                                          {e.responses.map((q) => {
                                              if (i === 0) {
                                                  i++;
                                                  return (
                                                      <div className="">
                                                          <div className="font-semibold pb-2 text-blue-600">
                                                              {q.question}
                                                          </div>
                                                          <div>{q.answer}</div>
                                                      </div>
                                                  );
                                              }
                                          })}
                                      </div>
                                  </div>
                                  <ArrowCircleRightIcon className="w-10 h-10 text-blue-600" />
                              </div>
                          );
                      })
                    : null}
            </div>

            {/* {!isLoading && !isError && data ? (
                <>
                    <div>WOAHHHHHHHHH</div>
                    <div>{data.data.entries[0].responses[0].answer}</div>
                    {console.log(data)}
                </>
            ) : null} */}
        </div>
    );
}
