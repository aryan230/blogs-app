"use client";

import { useBearStore } from "@/store/zustand";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PencilIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import AddBlog from "./AddBlog";
const navigation = [{ name: "Create new Blog", href: "#" }];
function Header() {
  const router = useRouter();
  const { user } = useBearStore();
  const { setUser } = useBearStore();
  const [newBlog, setNewBlog] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      setUser(JSON.parse(localStorage.getItem("userInfo")).user);
    }
  }, []);

  return (
    <header className="bg-indigo-600">
      {<AddBlog open={newBlog} setOpen={setNewBlog} />}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
          <div className="flex items-center">
            <a
              href="/"
              className="text-base font-medium text-white hover:text-indigo-50"
            >
              {user ? "Welcome, " + user.displayName : "Assignment"}
            </a>
            {/* <div className="hidden ml-10 space-x-8 lg:block">
              {navigation.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-white hover:text-indigo-50"
                >
                  {link.name}
                </a>
              ))}
            </div> */}
          </div>

          <div className="ml-10 space-x-4">
            {user && (
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setNewBlog(true);
                }}
                className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
              >
                Add new blog
              </Link>
            )}

            {user ? (
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.removeItem("userInfo");
                  setUser(null);
                  router.push(`/login`, { scroll: false });
                }}
                className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
              >
                Logout
              </Link>
            ) : (
              <Link
                href="/login"
                className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
              >
                Sign in
              </Link>
            )}
            {/* <a
              href="#"
              className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
            >
              Sign up
            </a> */}
          </div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          {navigation.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-base font-medium text-white hover:text-indigo-50"
            >
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Header;
