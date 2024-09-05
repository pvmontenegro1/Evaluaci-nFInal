import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Task } from "../interface/task.interface";
import { useTasks } from "../context/useTasks";

interface TaskFormProps {
  taskToEdit?: Task;
  handleUpdateTask?: (task: Task) => void;
}

function TaskForm({ taskToEdit, handleUpdateTask }: TaskFormProps) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    done: false,
  });
  const { createTask } = useTasks();

  useEffect(() => {
    if (taskToEdit) {
      setTask({
        title: taskToEdit.title,
        description: taskToEdit.description || "",
        done: taskToEdit.done || false,
      });
    } else {
      setTask({
        title: "",
        description: "",
        done: false,
      });
    }
  }, [taskToEdit]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskToEdit && handleUpdateTask) {
      handleUpdateTask({ ...taskToEdit, ...task });
    } else {
      await createTask(taskToEdit || task as Task);
    }
    setTask({ title: "", description: "", done: false });
  };

  // Resto del código...
// Resto del código...
return (
  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span>Curso</span>
      <input
        name="title"
        type="text"
        placeholder="Escribir un curso"
        onChange={handleChange}
        className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
      />
    </div>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span>Tema</span>
      <textarea
        name="description"
        rows={3}
        onChange={handleChange}
        className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
        placeholder="Escribir un tema"
      ></textarea>
    </div>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <label className="inline-flex items-center gap-x-2">
        <span>Hecho</span>
        <input
          type="checkbox"
          value={task.done ? 1 : 0}
          onChange={() =>
            setTask({
              ...task,
              done: !task.done,
            })
          }
          className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out "
        />
      </label>
    </div>
    <button type="submit" className="bg-indigo-500 px-3 block py-2 w-full">
      Guardar
    </button>
  </form>
);
}

export default TaskForm;
