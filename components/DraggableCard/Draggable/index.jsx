import React from 'react';
import { useDrag } from 'react-dnd';

const ItemTypes = {
  BOX: 'box',
};

const boxstyle = {
  border: '1px solid gray',
  backgroundColor: 'white',
  color: 'black',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  float: 'left',
  borderRadius:'5px'
};

const Draggable = ({ name, onDrop }) => {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { name },
      end(item, monitor) {
        const dropResult = monitor.getDropResult();
        if (item && dropResult) {
          let alertMessage = '';
          const isDropAllowed =
            dropResult.allowedDropEffect === 'any' ||
            dropResult.allowedDropEffect === dropResult.dropEffect;
          if (isDropAllowed) {
            const isCopyAction = dropResult.dropEffect === 'copy';
            const actionName = isCopyAction ? 'copied' : 'moved';

            alertMessage = `You ${actionName} ${item.name} into ${dropResult.name}!`;
          } else {
            alertMessage = `You cannot drop ${item.name} into ${dropResult.name}!`;
          }
          // alert(alertMessage);
        }
        if (onDrop) onDrop(item, dropResult);
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [name],
  );
  return (
    <div ref={drag} style={{ ...boxstyle, opacity }}>
      {name}
    </div>
  );
};

export default Draggable;
