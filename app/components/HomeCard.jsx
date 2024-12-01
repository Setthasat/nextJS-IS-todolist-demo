"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function HomeCard({ todo }) {
  const router = useRouter();

  const [otherTasks, setOtherTasks] = useState([]);
  const [todayTasks, setTodayTasks] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 2;

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTodayTasks = todayTasks.slice(indexOfFirstTask, indexOfLastTask);

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

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

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
    <div className="bg-white fixed bottom-0 min-h-[70%] max-h-[80%] h-auto rounded-t-[4rem] w-screen">
      {todayTasks.length > 0 && (
        <div className="flex flex-col justify-center items-center h-full w-full mb-[2rem]">
          <h1 className="text-3xl mt-[1.75rem] flex justify-center items-center">
            TODAY TASK
          </h1>
          {todayTasks.length === 0 ? (
            <p className="mt-[2rem] text-gray-500">
              You do not have tasks for today :)
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

              <div className="flex justify-center gap-4 mt-4 items-center">
                <button
                  onClick={prevPage}
                  className={`bg-gray-200 text-gray-700 rounded-full py-2 px-4 transition-all duration-300 ease-in-out ${
                    currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
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
                  className={`bg-gray-200 text-gray-700 rounded-full py-2 px-4 transition-all duration-300 ease-in-out ${
                    currentPage === Math.ceil(todayTasks.length / tasksPerPage)
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
      )}

      <div className="w-full h-full flex flex-col justify-center items-center mt-[4rem]">
        <h2 className="mt-2 mb-4 text-3xl">All Tasks</h2>
        <form>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="focus:outline-none bg-gray-200 w-[18rem] h-[4rem] rounded-full px-[2rem]"
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
