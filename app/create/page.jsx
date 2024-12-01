"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    tag: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    localStorage.setItem("tasks", JSON.stringify([...existingTasks, formData]));

    console.log("Form Data Saved:", formData);
    alert("Task saved!");

    // Clear form after submission
    setFormData({
      title: "",
      description: "",
      deadline: "",
      tag: "",
    });

    // Redirect to the home page
    router.push("/");
  };

  return (
    <div className="bg-gradient-to-b from-[#FFB114] to-[#FF4FCA] w-screen h-screen">
      <Navbar />
      <div className="bg-white absolute bottom-0 min-h-[70%] max-h-[80%] h-auto rounded-t-[4rem] w-screen p-6">
        <h1 className="text-center text-2xl font-bold mb-6">
          What do you want to do?
        </h1>
        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Title Input */}
          <div className="mt-[4rem]">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full bg-gray-200 rounded-full p-3 outline-none"
              required
            />
          </div>

          {/* Description Input */}
          <div className="mb-4 mt-[2rem]">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full bg-gray-200 rounded-2xl p-3 h-32 outline-none"
              required
            ></textarea>
          </div>

          {/* Deadline and Tag */}
          <div className="flex justify-between gap-4 mb-4 mt-[2rem]">
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="flex-1 bg-gray-200 rounded-full p-3 text-center outline-none"
              required
            />
            <input
              type="text"
              name="tag"
              value={formData.tag}
              onChange={handleChange}
              placeholder="Tag"
              className="flex-1 bg-gray-200 rounded-full p-3 text-center outline-none"
              required
            />
          </div>

          {/* Create Task Button */}
          <button
            type="submit"
            className="w-full bg-gray-200 rounded-full p-3 text-center"
          >
            Create your task
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;
