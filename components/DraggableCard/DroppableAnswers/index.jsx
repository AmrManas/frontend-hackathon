import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { useDrop, useDrag } from "react-dnd";
import Draggable from "../Draggable";
import {
  doingCardItems,
  doneCardItems,
  todoCardItems,
} from "../../../store/todos";
import axios from "axios";
import { hostUrl } from "../../../hostUrl";
import moment from "moment";

const ItemTypes = {
  BOX: "box",
};

const style = {
  width: "25rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  color: "black",
  padding: "0.5rem",
  // textAlign: 'center',
  fontSize: "1rem",
  lineHeight: "normal",
  float: "left",
};
function selectBackgroundColor(isActive, canDrop) {
  if (isActive) {
    return "gray";
  } else if (canDrop) {
    return "lightblue";
  } else {
    return "white";
  }
}

const Droppable = ({ allowedDropEffect, getAllData }) => {
  // const [items, setItems] = useAtom(totalCardItems);
  const [itemTodo, setItemTodo] = useAtom(todoCardItems);
  const [itemDoing, setItemDoing] = useAtom(doingCardItems);
  const [itemDone, setItemDone] = useAtom(doneCardItems);
  const [singleData, setSingleData] = useState();
  const apiCall = (item, panel) => {
    console.log("item?.startTime", item?.startTime);
    const payload = {
      panel,
    };

    if (panel === "doing") {
      payload.timeSheet = { startTime: moment().toISOString() };
    }
    if (panel === "done") {
      payload.timeSheet = {
        startTime: item?.timeSheet?.startTime,
        endTime: moment().toISOString(),
      };
    }
    console.log("item", item);
    axios
      .put(`${hostUrl}/user/updateTask/${item?._id}`, { ...payload })
      .then((res) => {
        getAllData();
      });
  };

  return (
    <>
      <DroppableItems
        name={<span className="font-medium px-2 py-2">Todo</span>}
        items={itemTodo}
        onDrop={(item) => {
          apiCall(item, "todo");

          // console.log({ todo: item });
        }}
        allowedDropEffect={allowedDropEffect}
      />
      <DroppableItems
        name={<span className="font-medium px-2 py-2">Doing</span>}
        items={itemDoing}
        onDrop={(item) => {
          apiCall(item, "doing");
          // console.log({ doing: item });
        }}
        allowedDropEffect={allowedDropEffect}
      />
      <DroppableItems
        name={<span className="font-medium px-2 py-2">Done</span>}
        items={itemDone}
        onDrop={(item) => {
          apiCall(item, "done");

          // console.log({ done: item });
        }}
        allowedDropEffect={allowedDropEffect}
      />
    </>
  );
};

export default Droppable;
function DroppableItems({ name, items, onDrop, allowedDropEffect }) {
  const [{ canDrop, isOver }, drop] = useDrop(
    {
      accept: ItemTypes.BOX,

      drop: (item, monitor) => {
        // console.log("item", item);
        // setItems((p) => [...p, item]);
        const data = monitor.getItem();
        // console.log("data", data);
        // if (item) {
        //   axios
        //     .put(`${hostUrl}/user/updateTask/${item?._id}`, { ...item })
        //     .then((res) => {});
        // }
        onDrop(item);

        return {
          name: `${allowedDropEffect} Droppable`,
          allowedDropEffect,
        };
      },
      collect: (monitor) => {
        return {
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        };
      },
    },
    [allowedDropEffect]
  );

  const isActive = canDrop && isOver;
  const backgroundColor = selectBackgroundColor(isActive, canDrop);
  return (
    <div
      ref={drop}
      style={{ ...style, backgroundColor }}
      className="shadow-md rounded-md"
    >
      <div className="border-b  pb-4">{name}</div>
      <br />
      <div className="w-full " style={{ minHeight: "10rem" }}>
        {items.map((item) => {
          return (
            <Draggable payload={item} key={item?._id}>
              {item.title}
            </Draggable>
          );
        })}
      </div>
      <br />
    </div>
  );
}
