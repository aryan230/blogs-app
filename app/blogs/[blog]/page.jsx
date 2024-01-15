"use client";

import Header from "@/components/Header";
import { db } from "@/firebase";
import { useBearStore } from "@/store/zustand";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";

function BlogPage({ params }) {
  const { user } = useBearStore();
  const router = useRouter();
  const [data, setData] = useState();
  const [loader, setLoader] = useState(false);
  const [text, setText] = useState();
  useEffect(() => {
    if (user) {
      const unsub = onSnapshot(
        doc(db, "blogs", params.blog.split("-u-")[1]),
        (doc) => {
          if (doc.data().data) {
            const findIndex = doc
              .data()
              .data.find((a) => a.id == params.blog.split("-u-")[0]);
            if (findIndex) {
              setData(findIndex);
            }
          }
        }
      );
    } else {
      router.push("/");
    }
  }, []);

  const addComment = async () => {
    const collRef = doc(db, "blogs", params.blog.split("-u-")[1]);
    const docSnap = await getDoc(collRef);
    if (docSnap.exists()) {
      let finalComments = data.comments;
      finalComments.push({
        name: user.displayName,
        user: user.uid,
        text: text,
        date: Date.now(),
      });
      let dataStored = docSnap.data().data;
      const findIndex = await dataStored.findIndex(
        (a) => a.id == params.blog.split("-u-")[0]
      );

      dataStored[findIndex].comments = finalComments;

      const docRef = await setDoc(collRef, {
        data: dataStored,
      }).then(async () => {
        setText("");
      });
    }
  };
  return (
    <>
      <Header />
      {data ? (
        <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white antialiased">
          <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
            <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
              <header className="mb-4 lg:mb-6 not-format">
                <address className="flex items-center mb-6 not-italic">
                  <div className="inline-flex items-center mr-3 text-sm text-gray-900">
                    <img
                      className="mr-4 w-16 h-16 rounded-full"
                      src={`https://ui-avatars.com/api/?name=${data.aurthor}`}
                      alt="Jese Leos"
                    />
                    <div>
                      <a
                        href="#"
                        rel="author"
                        className="text-xl font-bold text-gray-900"
                      >
                        {data.aurthor}
                      </a>

                      <p className="text-base text-gray-500">
                        <time
                          pubdate=""
                          dateTime="2022-02-08"
                          title="February 8th, 2022"
                        >
                          {new Date(data.created).toDateString()}
                        </time>
                      </p>
                    </div>
                  </div>
                </address>
                <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl">
                  {data.title}
                </h1>
              </header>
              <div className="custom-rte">
                <ReactQuill
                  className="py-4"
                  readOnly={true}
                  theme={"bubble"}
                  value={data.blogData}
                />
              </div>
              <section className="not-format">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
                    Comments ({data.comments.length})
                  </h2>
                </div>
                <form className="mb-6">
                  <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
                    <label htmlFor="comment" className="sr-only">
                      Your comment
                    </label>
                    <textarea
                      id="comment"
                      rows={6}
                      className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0"
                      placeholder="Write a comment..."
                      required=""
                      value={text}
                      defaultValue={""}
                      onChange={(e) => {
                        setText(e.target.value);
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      addComment();
                    }}
                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-indigo-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
                  >
                    Post comment
                  </button>
                </form>
                {data.comments.length > 0 &&
                  data.comments.map((c) => (
                    <article
                      className="p-6 mb-2 text-base bg-white rounded-lg"
                      key={c.name}
                    >
                      <footer className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900">
                            <img
                              className="mr-2 w-6 h-6 rounded-full"
                              src={`https://ui-avatars.com/api/?name=${c.name}`}
                              alt="Michael Gough"
                            />
                            {c.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            <time
                              pubdate=""
                              dateTime="2022-02-08"
                              title="February 8th, 2022"
                            >
                              {new Date(c.date).toDateString()}
                            </time>
                          </p>
                        </div>
                      </footer>
                      <p>{c.text}</p>
                    </article>
                  ))}
              </section>
            </article>
          </div>
        </main>
      ) : (
        <h2>Loading</h2>
      )}
    </>
  );
}

export default BlogPage;
