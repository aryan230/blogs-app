"use client";

import Blogs from "@/components/Blogs";
import Header from "@/components/Header";
import { useBearStore } from "@/store/zustand";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const { setUser } = useBearStore();
  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      setUser(JSON.parse(localStorage.getItem("userInfo")).user);
    }
  }, []);
  return (
    <main className="">
      <Header />
      <Blogs />
    </main>
  );
}
