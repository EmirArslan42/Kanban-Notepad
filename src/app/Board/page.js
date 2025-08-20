"use client";
import useStore from "@/store";
import React, { useEffect, useRef, useState } from "react";
import SvgButton from "./../../../SvgButton";
const Page = () => {
  const characters = ["Mordecai", "Rigby", "Benson", "Pops", "Skips","GreatJob"];
  const backgrounds = [
    "bg-slate-400",
    "bg-amber-600",
    "bg-red-500",
    "bg-rose-300",
    "bg-slate-300",
    "bg-[#73f5f6]"
  ];

  const [theme, setTheme] = useState("light");

  useEffect(()=>{
    document.body.className=theme
  },[theme]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      //console.log("Saved Tasks : ",savedTasks);
      //console.log("Parsed Tasks : ",parsedTasks);
      useStore.setState({ tasks: parsedTasks });
    }
  }, []);

  const [modal, setModal] = useState(true);
  const { tasks, addTask, moveTask } = useStore();
  const inputRef = useRef(null);

  const handleClick = () => {
    setModal(!modal);
  };

  const handleAddTask = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      addTask("Mordecai", e.target.value.trim());
      (e.target.value = ""), setModal(false);
    }
  };

  const handleDragStart = (e, taskIndex, sourceColumn) => {
    e.dataTransfer.setData("taskIndex", taskIndex);
    e.dataTransfer.setData("sourceColumn", sourceColumn);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, destinationColumn) => {
    const taskIndex = e.dataTransfer.getData("taskIndex");
    const sourceColumn = e.dataTransfer.getData("sourceColumn");
    moveTask(sourceColumn, destinationColumn, parseInt(taskIndex));
  };

  useEffect(() => {
    if (modal) {
      inputRef.current.focus();
    }
  }, [modal]);

  const renderTasks = (column) => {
    return tasks[column].map((task, index) => (
      <div
        key={index}
        id={index}
        className="bg-slate-200 p-2 cursor-pointer m-2 rounded-md "
      >
        <div
          className="task text-sm font-medium"
          draggable
          onDragStart={(e) => handleDragStart(e, index, column)}
        >
          {task}
        </div>
        <div className="text-black text-xs mt-2 text-end pr-2">
          {new Date().toLocaleDateString()}
        </div>
      </div>
    ));
  };

  return (
    <div>
      {modal && (
        <div className="add-task fixed top-1/2 left-1/2 p-5 rounded-lg">
          <div className="mb-2 font-semibold text-xl">
            <input
              className="bg-transparent shadow-lg p-2 border border-solid border-white rounded-[5px]"
              type="text"
              ref={inputRef}
              onKeyDown={handleAddTask}
            />
          </div>
        </div>
      )}
      <div className="flex gap-4">
        <SvgButton modal={modal} setModal={setModal} />
        {characters.map((character, index) => (
          <div
            key={index}
            className={`w-72 h-auto ${backgrounds[index]} rounded-md p-2 shadow-lg`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, characters[index])}
          >
            <div className="flex justify-start items-center">
              <img
                src={`/images/${characters[index].toLowerCase()}.png`}
                alt={character}
                className="w-14 rounded-full"
              />
              <div className="font-semibold ml-2">{character}</div>
            </div>
            {renderTasks(character)}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Page;
