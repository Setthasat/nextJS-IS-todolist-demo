"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Correct Next.js navigation

function HomeCard({ todo }) {
  const router = useRouter();

  const [otherTasks, setOtherTasks] = useState([]);
  const [todayTasks, setTodayTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const tasksPerPage = 2;

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    const todayFiltered = todo.filter((task) => task.deadline === currentDate);
    const otherFiltered = todo.filter((task) => task.deadline !== currentDate);

    setTodayTasks(todayFiltered);
    setOtherTasks(otherFiltered);
    setFilteredTasks(otherFiltered);
  }, [todo]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchTerm) {
        const filtered = otherTasks.filter(
          (task) =>
            task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredTasks(filtered);
      } else {
        setFilteredTasks(otherTasks);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm, otherTasks]);

  const nextPage = () => {
    if (currentPage < Math.ceil(todayTasks.length / tasksPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-white fixed bottom-0 min-h-[70%] max-h-[80%] w-full rounded-t-[4rem] shadow-lg overflow-y-auto">
      {/* Today Tasks Section */}
      {todayTasks.length > 0 && (
        <div className="flex flex-col items-center px-6 py-4">
          <h1 className="text-3xl font-bold">Today Tasks</h1>
          {todayTasks.length === 0 ? (
            <p className="text-gray-500 mt-4">No tasks for today!</p>
          ) : (
            <div className="mt-4 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              {todayTasks
                .slice(
                  (currentPage - 1) * tasksPerPage,
                  currentPage * tasksPerPage
                )
                .map((task, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 p-4 rounded-lg shadow-md"
                  >
                    <h3 className="font-bold">{task.title}</h3>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <span className="text-xs text-gray-500 block">
                      Deadline: {task.deadline}
                    </span>
                    <button
                      onClick={() => router.push(`/task/${index}`)}
                      className="text-blue-500 underline mt-2"
                    >
                      View Task
                    </button>
                  </div>
                ))}
            </div>
          )}

          {/* Pagination */}
          {todayTasks.length > tasksPerPage && (
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg ${currentPage === 1
                  ? "bg-gray-200 text-gray-500"
                  : "bg-blue-500 text-white"
                  }`}
              >
                Prev
              </button>
              <span>
                Page {currentPage} of {Math.ceil(todayTasks.length / tasksPerPage)}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === Math.ceil(todayTasks.length / tasksPerPage)}
                className={`px-4 py-2 rounded-lg ${currentPage ===
                  Math.ceil(todayTasks.length / tasksPerPage)
                  ? "bg-gray-200 text-gray-500"
                  : "bg-blue-500 text-white"
                  }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {/* All Tasks Section */}
      <div className="flex flex-col items-center px-6 py-4">
        <h2 className="text-2xl font-bold">All Tasks</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search tasks..."
          className="mt-4 px-4 py-2 w-full sm:w-1/2 border rounded-lg focus:outline-none"
        />
        {filteredTasks.length === 0 ? (
          <p className="mt-4 text-gray-500">No tasks match your search!</p>
        ) : (
          <ul className="mt-4 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredTasks.map((task, index) => (
              <li
                key={index}
                className="bg-gray-100 p-4 rounded-lg shadow-md"
              >
                <h3 className="font-bold">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
                <span className="text-xs text-gray-500 block">
                  Deadline: {task.deadline}
                </span>
                <button
                  onClick={() => router.push(`/task/${index}`)}
                  className="text-blue-500 underline mt-2"
                >
                  View Task
                </button>
              </li>
            ))}
          </ul>
        )}
        <Link href="/create" className="text-blue-500 underline mt-4">
          Wanna create more?
        </Link>
      </div>
    </div>
  );
}

export default HomeCard;
