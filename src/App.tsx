import React, { useState } from 'react';
import './App.css';

const laptopList = [
  {
    name:' Asus Laptop',
    model: 'model 1'
  },
  {
    name:' Apple Laptop',
    model: 'model 2'
  },
  {
    name:' Dell Laptop',
    model: 'model 3'
  },
];

function App() {
  const [items, setItems] = useState([...laptopList]);
  const [newIndex, setNewIndex] = useState<null | number>(null);
  console.log("🚀 ~ App ~ newIndex:", newIndex);

  const handleDragStart =(index:number)=>{
    setNewIndex(index);   
  }

  const handleDragEnd =(event:React.DragEvent)=>{
     event.preventDefault();
  }

  const handleDrag = (index:number)=>{
    console.log("🚀 ~ handleDrag ~ index:", index);
    if (newIndex === null) return;

    const newItems = [...items];
    const draggedItem = newItems.splice(newIndex, 1)[0]; // Remove dragged item
    newItems.splice(index, 0, draggedItem); // Insert at new position

    setItems(newItems);
    setNewIndex(null);
  }

  return (
    <>
     {
      items.map((laptop, key)=>{
        return <div key={key} style={{background:'red', borderRadius:'10px', padding:'5px', marginBottom:'5px'}} 
           onDragStart={()=>handleDragStart(key)}
           onDragOver={handleDragEnd}
           onDrop={()=>handleDrag(key)}
           draggable>
           <h4>{laptop.name}</h4>
           <p>{laptop.model}</p>
        </div>
      })
     }
    </>
  )
}

export default App
