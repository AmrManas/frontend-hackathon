import moment from "moment";
import React from "react";
import { useDrag } from "react-dnd";

const ItemTypes = {
  BOX: "box",
};

const boxstyle = {
  border: "1px solid lightgray",
  backgroundColor: "white",
  color: "black",
  padding: "0.5rem 1rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  // float: 'left',
  borderRadius: "5px",
};

const Draggable = ({ children, onDrop, payload }) => {
  console.log("payload", payload);
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: payload,
      end(item, monitor) {
        const dropResult = monitor.getDropResult();
        if (item && dropResult) {
          let alertMessage = "";
          const isDropAllowed =
            dropResult.allowedDropEffect === "any" ||
            dropResult.allowedDropEffect === dropResult.dropEffect;
          if (isDropAllowed) {
            const isCopyAction = dropResult.dropEffect === "copy";
            const actionName = isCopyAction ? "copied" : "moved";

            alertMessage = `You ${actionName} ${item.name} into ${dropResult.name}!`;
          } else {
            alertMessage = `You cannot drop ${item.name} into ${dropResult.name}!`;
          }
          // alert(alertMessage);
        }
        if (onDrop) onDrop(payload, dropResult);
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [children, payload]
  );
  return (
    <div ref={drag} style={{ ...boxstyle, opacity }} className="shadow-md ">
      <div>{children}</div>
      <div className="flex gap-3 my-2">
        {payload?.timeSheet?.startTime && (
          <div className="text-xs font-medium text-red-400">
            In time :
            <span className="">
              {payload?.timeSheet?.startTime &&
                moment(payload?.timeSheet?.startTime).format("LT")}
            </span>
          </div>
        )}
        {payload?.timeSheet?.endTime && (
          <div className="text-xs font-medium text-green-500">
            Out Time :
            <span className="">
              {payload?.timeSheet?.endTime && payload?.timeSheet?.endTime}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Draggable;
