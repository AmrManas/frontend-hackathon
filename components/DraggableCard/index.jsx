import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DroppableAnswers from "./DroppableAnswers";

const DragAndDrop = () => {
  
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div style={{ overflow: "hidden", clear: "both" }} className='w-full'>
          <DroppableAnswers
            initialItems={[
              { name: "working on first task " },
              { name: "working on second task " },
              { name: "working on third  task " },
            ]}
            name="To do"
            allowedDropEffect="move"
          />
          <DroppableAnswers name="Doing" allowedDropEffect="move" />
          <DroppableAnswers name="Done" allowedDropEffect="move" />
        </div>
        {/* <div style={{ overflow: 'hidden', clear: 'both' }}>
          <DroppableAnswers
            name="dustbin 4"
            initialItems={[{ name: 'Glass' }, { name: 'Banana' }, { name: 'Paper' }]}
            allowedDropEffect="move"
          />
        </div> */}
      </div>
    </DndProvider>
  );
};

export default DragAndDrop;
