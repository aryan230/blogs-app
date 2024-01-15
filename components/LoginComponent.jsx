"use client";

import { auth, provider } from "@/firebase";
import { useBearStore } from "@/store/zustand";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function LoginComponent() {
  const router = useRouter();
  const { user } = useBearStore();
  const { setUser } = useBearStore();
  const handleLogin = async () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        localStorage.setItem("userInfo", JSON.stringify(data));
        setUser(data.user);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
  const redirect = window.location.search
    ? window.location.search.split("=")[1]
    : " ";

  useEffect(() => {
    if (user) {
      router.push(`/${redirect}`, { scroll: false });
    }
  }, [user]);
  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogin();
                  }}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in with Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginComponent;
