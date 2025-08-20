import { create } from "zustand";

const useStore = create((set) => ({
  tasks: {
    Mordecai: [],
    Rigby: [],
    Benson: [],
    Pops: [],
    Skips: [],
    GreatJob:[]
  },
  addTask: (column, task) => {
    set((state) => {
      const updatedTasks = {
        ...state.tasks,
        [column]: [...state.tasks[column], task],
      };
      console.log("Add Tasks: ", updatedTasks);
      localStorage.setItem("task", JSON.stringify(updatedTasks));

      return { tasks: updatedTasks };
    });
  },
  moveTask: (source, destination, taskIndex) => {
    set((state) => {
      const updateTasks = { ...state.tasks };
      const [movedTask] = updateTasks[source].splice(taskIndex, 1);
      updateTasks[destination].push(movedTask);

      localStorage.setItem("task", JSON.stringify(updateTasks));
      console.log("Update Tasks: ", updateTasks);

      return { tasks: updateTasks };
    });
  },
}));

export default useStore;
