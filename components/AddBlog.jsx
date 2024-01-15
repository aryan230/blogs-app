"use client";

/* This example requires Tailwind CSS v2.0+ */

import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import { PlusIcon } from "@heroicons/react/solid";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useBearStore } from "@/store/zustand";
import { v4 as uuid } from "uuid";
import { db } from "@/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Loader from "./Loader";

function AddBlog({ open, setOpen }) {
  const { user } = useBearStore();
  const router = useRouter();
  const cancelButtonRef = useRef(null);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState();
  const [des, setDes] = useState();
  const [loader, setLoader] = useState(false);
  var toolbarOptions = [
    ["bold", "italic", "underline"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    ["image", "video"],
    // custom dropdown
  ];
  const saveBlog = async () => {
    setLoader(true);
    if (user) {
      const collRef = doc(db, "blogs", user.uid);
      const docSnap = await getDoc(collRef);
      if (docSnap.exists()) {
        let data = docSnap.data().data;
        let blogId = uuid();
        data.push({
          id: blogId,
          title,
          blogData: value,
          comments: [],
          created: Date.now(),
          aurthor: user.displayName,
          des: des,
          user: user.uid,
        });

        const docRef = await setDoc(collRef, {
          data,
        }).then(async () => {
          setOpen(false);
          setLoader(false);
          router.push(`/blogs/${blogId}-u-${user.uid}`);
          //   await dispatch({
          //     type: CART_RESET,
          //   });
          //   navigate(`/blog/${blog}`);
        });
      } else {
        let blogId = uuid();
        const docRef = await setDoc(collRef, {
          data: [
            {
              id: blogId,
              title,
              blogData: value,
              comments: [],
              created: Date.now(),
              des: des,
              aurthor: user.displayName,
              user: user.uid,
            },
          ],
        }).then(async () => {
          setLoader(false);
          setOpen(false);
          router.push(`/blogs/${blogId}-u-${user.uid}`);
        });
      }
    }
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        {loader && <Loader />}
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <PlusIcon
                    className="h-6 w-6 text-red-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Add new blog
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="pt-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Enter Blog Title
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="email"
                          id="email"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder=""
                          onChange={(e) => {
                            setTitle(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="pt-4">
                      <label
                        htmlFor="comment"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Add Description
                      </label>
                      <div className="mt-1">
                        <textarea
                          rows={4}
                          name="comment"
                          id="comment"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          defaultValue={""}
                          onChange={(e) => {
                            setDes(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <ReactQuill
                      className="py-4"
                      theme="snow"
                      value={value}
                      onChange={setValue}
                      modules={{
                        toolbar: toolbarOptions,
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    saveBlog();
                  }}
                >
                  Add
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default AddBlog;
