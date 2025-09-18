import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [columes, setColumes] = useState({
    todo: {
      name: "to do",
      items: [
        { id: "1", content: "Market researsh" },
        { id: "2", content: "Project place" },
      ],
    },
    inProgress: {
      name: "in progress",
      items: [{ id: "3", content: "Desine ui Mokeups" }],
    },
    done: {
      name: "done",
      items: [{ id: "4", content: "set up repositery" }],
    },
  });

  const [newTask, setNewTask] = useState("");
  const [activeCoulems, setActiveCoulems] = useState("Todo");

  const [drageItems, setDrageItems] = useState(null);

  const addNewTask = () => {
    if (newTask.trim() === "") return;

    const updateColumns = { ...columes };

    updateColumns[activeCoulems].items.push({
      id: Date.now().toString(),
      content: newTask,
    });
    setColumes(updateColumns);
    setNewTask("");
  };

  const removeTask = (columesId, taskId) => {
    const updateColumns = { ...columes };

    updateColumns[columesId].items = updateColumns[columesId].items.filter(
      (item) => item.id !== taskId
    );
    setColumes(updateColumns);
  };

  const handleDragStart = (columeId, item) => {
    setDrageItems({ columeId, item });
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e, columeId) => {
    e.preventDefault();

    if (!drageItems) return;

    const { columeId: sourseColumeId, item } = drageItems;
    if (sourseColumeId == columeId) return;

    const updateColumns = { ...columes };
    updateColumns[sourseColumeId].items = updateColumns[
      sourseColumeId
    ].items.filter((i) => i.id !== item.id);

    updateColumns[columeId].items.push(item);

    setColumes(updateColumns);
    setDrageItems(null);
  };

  const columnsStyle = {
    todo: {
      header: "bg-gradient-to-r from-blue-600 to-blue-400,",
      border: "blue-400",
    },
    progress: {
      header: "bg-gradient-to-r from-yellow-600 to-yellow-400,",
      border: "yellow-400",
    },
    done: {
      header: "bg-gradient-to-r from-orange-600 to-orange-400,",
      border: "orange-400",
    },
  };

  return (
    <div className="p-6 w-full min-h-screen bg-gradient-to-b from-blue-400 to-yellow-300 flex items-center justify-center">
      <div className="flex items-center justify-center flex-col mb-8 gap-4 text- w-full max-w-6xl">
        <h1 className="font-bold text-4xl mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-rose-400">
          React Kanban Board
        </h1>
        <div className="flex mb-8 w-full max-w-lg shadow-lg rounded-lg overflow-hidden">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow p-3 bg-zinc-700 text-white"
            onKeyDown={(e) => e.key === "Enter" && addNewTask()}
          />
          <select
            value={activeCoulems}
            onChange={(e) => setActiveCoulems(e.target.value)}
            className="p-3 bg-zinc-700 text-white border-1 border-zinc-600 "
          >
            {Object.keys(columes).map((columeId) => (
              <option value={columeId} key={columeId}>
                {columes[columeId].name}
              </option>
            ))}
          </select>
          <button
            onClick={addNewTask}
            className="px-6 bg bg-gradient-to-r from-yellow-600 to-amber-500 text-white font-medium hover:from-yellow-500 hover:to-amber-500 transition-all duration-200 cursor-pointer "
          >
            Add
          </button>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-6 w-full ">
          {Object.keys(columes).map((columeId) => (
            <div
              key={columeId}
              className={`flex-shrink-0 w-80 bg-zink-800 rounded-lg shadow-xl border-t-4 ${
                columnsStyle[columeId.border]
              }`}
              onDragOver={(e) => handleDragOver(e, columeId)}
              onDrop={(e) => handleDrop(e, columeId)}
            >
              <div
                className={`p-4 text-white font-bold text-xl rounded-t-md ${
                  columnsStyle[columeId]
                  // .header
                }`}
              >
                {columes[columeId].name}
                <span className="ml-2 px-2 py-1 bg-zinc-800 bg-opacity-30 rounded-full text-sm ">
                  {columes[columeId].items.length}
                </span>
              </div>

              <div className="p-3 min-h-64 ">
                {columes[columeId].items.lenght === 0 ? (
                  <div className="text-center py-10 text-zinc-500 italic text-sm">
                    Drop Task Hear
                  </div>
                ) : (
                  columes[columeId].items.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 mb-3 bg-zinc-700 text-white rounded-lg shadow-md cursor-move flex items-center justify-between transform transiation-all duration-200 hover:scale-105 hover:shadow-lg "
                      draggable
                      onDragStart={() => handleDragStart(columeId, item)}
                    >
                      <span className="mr-2">{item.content}</span>
                      <button
                        onClick={() => removeTask(columeId, item.id)}
                        className="text-zinc-400 hover:text-red-400 transition-colors duration-200 w-6 h-6 flex items-center justify-center rounded-full hover:bgzinc-600"
                      >
                        <span className="text-lg cursor-pointer">x</span>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
