import { useContext, useState } from "react";
import { Context } from "../context";
import { getUserEntries } from "../api/entriesAPI";
import Spacer from "../components/Spacer";
import Button from "../components/Button";
import { useHistory } from "react-router";
import { addDays, format, formatISO, parseISO } from "date-fns";
import { ArrowCircleRightIcon } from "@heroicons/react/outline";
import FunctionalCalendar from "../components/FunctionalCalendar";
import { subDays } from "date-fns";

const ReflectionsPage = () => {
    const { state, isAuthenticating } = useContext(Context);
    const router = useHistory();

    const [entries, setEntries] = useState([]);
    const [startDate, setStartDate] = useState(subDays(new Date(), 8));
    const [endDate, setEndDate] = useState(new Date());

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
        <div className="flex flex-col items-center lg:pt-8 min-h-screen py-2 bg-gray-50">
            {state.user.username ? (
                <>
                    <Spacer height={6} />
                    <FunctionalCalendar
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                    />
                    <Spacer height={12} />
                    <Button text="Get Reflections" onClick={getEntries} />
                </>
            ) : null}
            <div className="flex flex-col justify-center items-center w-full">
                <div className="my-4 sm:my-8 md:my-12 xl:w-2/5 lg:w-1/2 md:w-3/5 w-80 flex flex-col justify-center items-center">
                    {state.user && entries.length > 0
                        ? entries.map((e) => {
                              let i = 0;
                              return (
                                  <div
                                      key={e._id}
                                      onClick={() => {
                                          router.push({
                                              pathname: `/reflection/${e._id}`,
                                              state: { reflection: e },
                                          });
                                      }}
                                      className=" hover:-translate-y-1 hover:shadow-lg cursor-pointer transform transition my-3 md:my-6 flex-row flex justify-between items-center rounded-xl shadow-md bg-white p-6  h-auto overflow-hidden "
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
                                                          <div
                                                              key={q._id}
                                                              className=""
                                                          >
                                                              <div className="font-semibold pb-2 text-accent">
                                                                  {q.question}
                                                              </div>
                                                              <div>
                                                                  {q.answer}
                                                              </div>
                                                          </div>
                                                      );
                                                  }
                                              })}
                                          </div>
                                      </div>
                                      <ArrowCircleRightIcon className="w-10 h-10 text-accent" />
                                  </div>
                              );
                          })
                        : null}
                </div>
            </div>
        </div>
    );
};

export default ReflectionsPage;
