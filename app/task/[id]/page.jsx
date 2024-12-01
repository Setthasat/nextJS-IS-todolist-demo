"use client";

import Navbar from "@/app/components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TaskDetailPage({ params }) {
    const router = useRouter();
    const [task, setTask] = useState(null);
    const [id, setId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const unwrappedParams = await params; // Unwrap the promise if it's wrapped
            setId(unwrappedParams.id); // Now you can safely access `id`

            const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            const selectedTask = tasks.find((task, index) => index === parseInt(unwrappedParams.id));

            if (!selectedTask) {
                alert("Task not found!");
                router.push("/");
            } else {
                setTask(selectedTask);
            }
        };

        fetchData();
    }, [params, router]);

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this task?")) {
            const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            const updatedTasks = tasks.filter((_, index) => index !== parseInt(id));
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            alert("Task deleted successfully!");
            router.push("/");
        }
    };

    if (!task) return <div>Loading...</div>;

    return (
        <div className="bg-gradient-to-b from-[#FFB114] to-[#FF4FCA] w-screen h-screen">
            <Navbar />
            <div className="bg-white absolute bottom-0 min-h-[70%] max-h-[80%] h-auto rounded-t-[4rem] w-screen p-6">
                <h1 className="text-center text-2xl font-bold mb-6">Task Details</h1>
                <div className="flex flex-col gap-4">
                    <div>
                        <strong>Title:</strong> {task.title}
                    </div>
                    <div>
                        <strong>Description:</strong> {task.description}
                    </div>
                    <div>
                        <strong>Deadline:</strong> {task.deadline}
                    </div>
                    <div>
                        <strong>Tag:</strong> {task.tag}
                    </div>
                </div>
                <div className="flex justify-between gap-4 mt-6">
                    <button
                        className="w-full bg-gray-200 rounded-full p-3 text-center"
                        onClick={() => router.push("/")}
                    >
                        Back to Tasks
                    </button>
                    <button
                        className="w-full bg-red-500 text-white rounded-full p-3 text-center"
                        onClick={handleDelete}
                    >
                        Delete Task
                    </button>
                </div>
            </div>
        </div>
    );
}
    