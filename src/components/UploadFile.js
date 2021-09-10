import React from "react";
import { FolderOpenIcon } from "@heroicons/react/outline";

const UploadFile = () => {
    return (
        <div class="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl mb-4 md:mb-8 ">
            <div class="md:flex">
                <div class="w-full p-3">
                    <div class=" relative border-dotted h-48 rounded-lg  border-2 border-blue-600 bg-white flex justify-center items-center">
                        <div class="absolute ">
                            <div class="flex flex-col items-center">
                                {" "}
                                <FolderOpenIcon className="h-24 w-24 text-blue-600" />{" "}
                                <span class="block text-gray-400 font-normal">
                                    Anything you'd like to save?
                                </span>{" "}
                            </div>
                        </div>{" "}
                        <input
                            // {...formik.getFieldProps(`files`)}
                            type="file"
                            class="h-full w-full opacity-0 cursor-pointer"
                            name="files"
                            id="files"
                            // onInput={(event) => {
                            //     formik.setFieldValue(
                            //         "files",
                            //         event.target.files[0]
                            //     );
                            // }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadFile;
