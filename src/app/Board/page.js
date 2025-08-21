"use client";
import useStore from "@/store";
import React, { useEffect, useRef, useState } from "react";
import SvgButton from "./../../../SvgButton";
const Page = () => {
  const characters = ["Mordecai", "Rigby", "Benson", "Pops", "Skips","MuscleMan","HighFive","GreatJob"];
  const backgrounds = [
    "bg-slate-400",
    "bg-amber-600",
    "bg-red-500",
    "bg-rose-300",
    "bg-slate-300",
    "bg-[#bef264]",
    "bg-[#cbd5e1]",
    "bg-[#73f5f6]"
  ];

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

  const handleRemoveTask=(taskIndex,column)=>{
    const updateTasks={...tasks};
    updateTasks[column].splice(taskIndex,1);
    localStorage.setItem("tasks",JSON.stringify(updateTasks));
    useStore.setState({tasks:updateTasks});
  }

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

  const handleTaskChange=(e,index,column)=>{
    const updatedTasks={...tasks};
    updatedTasks[column][index]=e.target.value;
    if(e.target.value.trim()==""){
        handleRemoveTask(index,column);
    }
    localStorage.setItem("tasks",JSON.stringify(updatedTasks));
    useStore.setState({tasks:updatedTasks});
  }

  const controlImage=(img)=>{
    if(img=="muscleman"){
        return "kasadam"
    }else if(img=="highfive"){
        return "cakbeslik"
    }else{
        return img.toLowerCase();
    }
  }

  const renderTasks = (column) => {
      if (!tasks[column]) return null; // column yoksa boş dön
    return tasks[column].map((task, index) => (
      <div
        key={index}
        id={index}
        className="bg-slate-200 p-2 cursor-pointer m-2 rounded-md "
        draggable
          onDragStart={(e) => handleDragStart(e, index, column)}
      >
        <div
          className="task text-sm font-medium text-black"
          
        >
          <input type="text" value={task} onChange={(e)=>handleTaskChange(e,index,column)}/>
        </div>
        <div className="flex items-center justify-between mt-2 px-2">
          <div className="text-black text-xs text-end ">{new Date().toLocaleDateString()}</div>
          <div className="text-black" onClick={()=>handleRemoveTask(index,column)}>X</div>
        </div>
      </div>
    ));
  };

  return (
    <div>
      {modal && (
        <div className="add-task fixed top-1/2 left-1/2 p-5 rounded-lg">
          <div className="flex flex-col justify-center mb-2 font-semibold text-xl bg-gray-400 w-[325px] h-[316px] rounded-[5px] relative">
            <div onClick={()=>setModal(false)} className="absolute left-5 top-5 cursor-pointer">X</div>
            <div className="p-2"><img src="/images/logo.png" alt="" className="w-full"/></div>
            <span className="text-center py-2">Give them a mission</span>
            <div className="px-5">
            <input
              className="bg-transparent shadow-lg p-2 border border-solid border-white rounded-[5px] text-black w-full" 
              type="text"
              ref={inputRef}
              onKeyDown={handleAddTask}
            />          
            </div>
            
          </div>
        </div>
      )}
      <div className="flex justify-center">
        <div className=" gap-4 my-16 grid grid-cols-1  sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4">
        <div className="absolute left-24 top-24 bg-red-500"><SvgButton modal={modal} setModal={setModal} /></div>
        {characters.map((character, index) => (
          <div
            key={index}
            className={`xl:w-72 lg:w-56 md:w-56 sm:w-72 w-[380px]   !min-h-[250px] h-auto ${backgrounds[index]} rounded-md p-2 shadow-lg mr-6 mb-3`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, characters[index])}
          >
            <div className="flex justify-start items-center">
              <img
                src={`/images/${controlImage(characters[index].toLowerCase())}.png`}
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
    </div>
  );
};
export default Page;
