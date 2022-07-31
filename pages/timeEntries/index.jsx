import DraggableQuestions from "../../components/DraggableCard";

import { Button } from "antd";
import AddTask from "./AddTask";
import {
  todoCardItems,
  doingCardItems,
  doneCardItems,
} from "../../store/todos";
import { hostUrl } from "../../hostUrl";
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import axios from "axios";

const TimeEntries = () => {
  const [isModal, setIsModal] = useState(false);
  const [itemTodo, setItemTodo] = useAtom(todoCardItems);
  const [itemDoing, setItemDoing] = useAtom(doingCardItems);
  const [itemDone, setItemDone] = useAtom(doneCardItems);

  const getAllData = () => {
    axios
      .get(`${hostUrl}/user/getAllTask`)
      .then((res) => {
        // console.log("res", res);
        setItemTodo(res?.data?.data?.filter((fil) => fil?.panel === "todo"));
        setItemDoing(res?.data?.data?.filter((fil) => fil?.panel === "doing"));
        setItemDone(res?.data?.data?.filter((fil) => fil?.panel === "done"));
      })
      .catch((err) => {
        // console.log("err", err);
      });
  };

  useEffect(() => {
    getAllData();
    // debugger
  }, []);
  return (
    <div className="w-full h-[89vh] bg-gray-100  ">
      <div className="flex justify-between py-2 px-2 my-2 font-medium text-lg bg-white shadow rounded item-center">
        <div className="">
          <p>Time Entries </p>
        </div>
        <div>
          <Button
            onClick={() => {
              setIsModal(true);
            }}
          >
            Add Task
          </Button>
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <DraggableQuestions getAllData={getAllData} />
      </div>
      <AddTask
        isModal={isModal}
        setIsModal={setIsModal}
        getAllData={getAllData}
      />
    </div>
  );
};

// const style = {
//   width: '12rem',
//   marginRight: '1.5rem',
//   marginBottom: '1.5rem',
//   color: 'white',
//   padding: '1rem',
//   textAlign: 'center',
//   fontSize: '1rem',
//   lineHeight: 'normal',
//   float: 'left',
// };
// function selectBackgroundColor(isActive, canDrop) {
//   if (isActive) {
//     return 'darkgreen';
//   } else if (canDrop) {
//     return 'darkkhaki';
//   } else {
//     return '#222';
//   }
// }
// const Dustbin = ({ allowedDropEffect, name, initialItems }) => {
//   const [items, setItems] = useState(initialItems || []);
//   const [{ canDrop, isOver }, drop] = useDrop(
//     () => ({
//       accept: ItemTypes.BOX,
//       drop: (item) => {
//         setItems((p) => [...p, item]);
//         return {
//           name: `${allowedDropEffect} Dustbin`,
//           allowedDropEffect,
//         };
//       },
//       collect: (monitor) => {
//         if (monitor.didDrop()) {
//           // setItems([]);
//         }
//         return {
//           isOver: monitor.isOver(),
//           canDrop: monitor.canDrop(),
//         };
//       },
//     }),
//     [allowedDropEffect],
//   );
//   const isActive = canDrop && isOver;
//   const backgroundColor = selectBackgroundColor(isActive, canDrop);
//   return (
//     <div ref={drop} style={{ ...style, backgroundColor }}>
//       {`Works with ${allowedDropEffect} drop effect`}
//       <br />
//       <div>
//         {items.map((item, index) => {
//           return (
//             <Box
//               key={item.name}
//               name={item.name}
//               onDrop={(it, dropResult) => {
//                 if (dropResult) {
//                   setItems((p) => p.filter((i) => i.name !== it.name));
//                 }
//               }}
//             />
//           );
//         })}
//       </div>
//       {name}
//       <br />
//       {isActive ? 'Release to drop' : 'Drag a box here'}
//     </div>
//   );
// };

// const boxstyle = {
//   border: '1px dashed gray',
//   backgroundColor: 'white',
//   color: 'black',
//   padding: '0.5rem 1rem',
//   marginRight: '1.5rem',
//   marginBottom: '1.5rem',
//   float: 'left',
// };
// const Box = ({ name, onDrop }) => {
//   const [{ opacity }, drag] = useDrag(
//     () => ({
//       type: ItemTypes.BOX,
//       item: { name },
//       end(item, monitor) {
//         const dropResult = monitor.getDropResult();
//         if (item && dropResult) {
//           let alertMessage = '';
//           const isDropAllowed =
//             dropResult.allowedDropEffect === 'any' ||
//             dropResult.allowedDropEffect === dropResult.dropEffect;
//           if (isDropAllowed) {
//             const isCopyAction = dropResult.dropEffect === 'copy';
//             const actionName = isCopyAction ? 'copied' : 'moved';

//             alertMessage = `You ${actionName} ${item.name} into ${dropResult.name}!`;
//           } else {
//             alertMessage = `You cannot drop ${item.name} into ${dropResult.name}!`;
//           }
//           // alert(alertMessage);
//         }
//         if (onDrop) onDrop(item, dropResult);
//       },
//       collect: (monitor) => ({
//         opacity: monitor.isDragging() ? 0.4 : 1,
//       }),
//     }),
//     [name],
//   );
//   return (
//     <div ref={drag} style={{ ...boxstyle, opacity }}>
//       {name}
//     </div>
//   );
// };
export default TimeEntries;
