import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import Draggable from '../Draggable';

const ItemTypes = {
  BOX: 'box',
};

const style = {
  width: '25rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'black',
  padding: '0.5rem',
  // textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
  borderBottom:'1px solid lightgray'
  
};
function selectBackgroundColor(isActive, canDrop) {
  if (isActive) {
    return 'gray';
  } else if (canDrop) {
    return 'green';
  } else {
    return 'white';
  }
}

const Droppable = ({ allowedDropEffect, name, initialItems }) => {
  const [items, setItems] = useState(initialItems || []);   
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop: (item) => {
        setItems((p) => [...p, item]);
        return {
          name: `${allowedDropEffect} Droppable`,
          allowedDropEffect,
        };
      },
      collect: (monitor) => {
        if (monitor.didDrop()) {
         
        }
        return {
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        };
      },
    }),
    [allowedDropEffect],
  );
  const isActive = canDrop && isOver;
  const backgroundColor = selectBackgroundColor(isActive, canDrop);
  return (
    <div ref={drop} style={{ ...style, backgroundColor }} className='shadow-md rounded-md  '>
      <div>


      {`Task`}{' '}
          {name}
      </div>
      <br />
      <div className='w-full ' style={{maxHeight:'50vh' ,overflowY:'scroll'}}>
        {items.map((item, index) => {
          return (
            <Draggable
              key={item.name}
              name={item.name}
              onDrop={(it, dropResult) => {
                console.log(`items in the ${name}`, { it, dropResult });
                if (dropResult) {
                  setItems((p) => p.filter((i) => i.name !== it.name));
                }
              }}
            />
          );
        })}
      </div>
      <br />
      {/* {isActive     ? 'Release to drop' : 'Drag a box here'} */}
    </div>
  );
};

export default Droppable;
