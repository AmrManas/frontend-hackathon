import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DroppableAnswers from "./DroppableAnswers";
import {
  todoCardItems,
  doingCardItems,
  doneCardItems,
} from "../../store/todos";

const DragAndDrop = ({ getAllData }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div style={{ overflow: "hidden", clear: "both" }} className="w-full">
          <DroppableAnswers
            allowedDropEffect="move"
            getAllData={getAllData}
            // initialItems={itemTodo}
          />
        </div>
      </div>
    </DndProvider>
  );
};

export default DragAndDrop;
