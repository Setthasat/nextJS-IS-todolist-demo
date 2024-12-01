"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function HomeCard({ todo }) {
  const router = useRouter();

  // Get today's date in a readable format
  const [otherTasks, setOtherTasks] = useState([]);
  const [todayTasks, setTodayTasks] = useState([]);

  // Search State
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

  // Pagination State for today tasks (only show 2 tasks per page)
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 2;

  // Filter today's tasks based on current page
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTodayTasks = todayTasks.slice(indexOfFirstTask, indexOfLastTask);

  useEffect(() => {
    // Calculate today's date and format it to 'MMMM DD, YYYY'
    const currentDate = new Date();

    // Split tasks into today and others
    const todayFiltered = todo.filter((task) => task.deadline === currentDate.toISOString().split("T")[0]);
    const otherFiltered = todo.filter((task) => task.deadline !== currentDate.toISOString().split("T")[0]);

    setTodayTasks(todayFiltered);
    setOtherTasks(otherFiltered);
    setFilteredTasks(otherFiltered);
  }, [todo]);

  // Debounced Search
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

    return () => clearTimeout(timeout); // Cleanup timeout
  }, [searchTerm, otherTasks]);

  // Handle pagination change
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
    <div className="bg-white absolute bottom-0 min-h-[70%] max-h-[80%] h-auto rounded-t-[4rem] w-screen">
      {/* TODAY TASK */}
      <div className="flex flex-col justify-center items-center h-full w-full mb-[2rem]">
        <h1 className="text-2xl mt-[1.75rem] flex justify-center items-center">
          TODAY TASK
        </h1>
        {todayTasks.length === 0 ? (
          <p className="mt-[2rem] text-gray-500">
            You don't have tasks for today :)
          </p>
        ) : (
          <>
            <ul className="mt-4 grid grid-cols-2 gap-4 justify-center items-center transition-all duration-300 ease-in-out">
              {currentTodayTasks.map((task, index) => (
                <li
                  key={index}
                  className="bg-gray-200 w-[8rem] h-[8rem] p-4 rounded-lg shadow-md"
                >
                  <h3 className="font-bold">{task.title}</h3>
                  <p className="text-sm text-gray-600">{task.description}</p>
                  <span className="text-xs text-gray-500 block mb-2">
                    Deadline: {task.deadline}
                  </span>
                  <button
                    onClick={() => router.push(`/task/${index}`)}
                    className="text-blue-500 underline text-sm"
                  >
                    View Task
                  </button>
                </li>
              ))}
            </ul>

            {/* Pagination Controls */}
            <div className="flex justify-center gap-4 mt-4 items-center">
              <button
                onClick={prevPage}
                className={`bg-gray-200 text-gray-700 rounded-full py-2 px-4 transition-all duration-300 ease-in-out ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                  }`}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {Math.ceil(todayTasks.length / tasksPerPage)}
              </span>
              <button
                onClick={nextPage}
                className={`bg-gray-200 text-gray-700 rounded-full py-2 px-4 transition-all duration-300 ease-in-out ${currentPage === Math.ceil(todayTasks.length / tasksPerPage)
                    ? "cursor-not-allowed opacity-50"
                    : ""
                  }`}
                disabled={
                  currentPage === Math.ceil(todayTasks.length / tasksPerPage)
                }
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {/* SEARCH & TASK CREATION */}
      <div className="w-full h-full flex flex-col justify-center items-center mt-[4rem]">
        <h2 className="mt-4 mb-4 text-lg font-bold">All Tasks</h2>
        <form>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="focus:outline-none bg-gray-200 w-[16rem] h-[2rem] rounded-full px-[2rem]"
            placeholder="Search Task"
          />
        </form>
        {filteredTasks.length === 0 ? (
          <>
            <p className="mt-[4rem] text-gray-500">
              No tasks match your search :)
            </p>
            <a
              className="underline underline-offset-4 text-blue-500"
              href="/create"
            >
              Wanna create one?
            </a>
          </>
        ) : (
          <>
            <ul className="mt-4 space-y-2">
              {filteredTasks.map((task, index) => (
                <li
                  key={index}
                  className="bg-gray-200 w-[16rem] p-4 rounded-lg shadow-md"
                >
                  <h3 className="font-bold">{task.title}</h3>
                  <p className="text-sm text-gray-600">{task.description}</p>
                  <span className="text-xs text-gray-500 block mb-2">
                    Deadline: {task.deadline}
                  </span>
                  <button
                    onClick={() => router.push(`/task/${index}`)}
                    className="text-blue-500 underline text-sm"
                  >
                    View Task
                  </button>
                </li>
              ))}
            </ul>
            <a
              className="underline underline-offset-4 text-blue-500 mt-4"
              href="/create"
            >
              Wanna create more?
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default HomeCard;
