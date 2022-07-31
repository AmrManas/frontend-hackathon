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
      {children}
    </div>
  );
};

export default Draggable;
