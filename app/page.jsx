"use client";
import { useState, useEffect } from "react";
import HomeCard from "./components/HomeCard";
import Navbar from "./components/Navbar";

export default function Home() {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTodo(tasks);
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#FFB114] to-[#FF4FCA] w-screen h-screen">
      <Navbar />
      <HomeCard todo={todo} />
    </div>
  );
}
