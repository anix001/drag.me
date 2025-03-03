import React, { Children, useState } from 'react';
import './App.css';

const accessoriesList = [
  {
   title:'Group A-Laptops',
   children:[
    {
      name:' Apple Laptop',
      model: 'model 2'
    },
    {
      name:' Dell Laptop',
      model: 'model 3'
    },
   ]
  },
  {
    title:'Group B-Mobiles',
    children:[
     {
       name:'IPhone',
       model: '16 Pro Max'
     },
     {
       name:'Samsung',
       model: 'S25'
     },
    ]
   },
];

interface IBox{
  groupIndex:number | null;
  boxIndex:number | null;
}

function App() {
  const [items, setItems] = useState([...accessoriesList]);
  const [newIndex, setNewIndex] = useState<IBox>({
    groupIndex:null,
    boxIndex:null
  });
  console.log("🚀 ~ App ~ newIndex:", newIndex);

  const handleDragStart =(groupIndex:number, boxIndex:number)=>{
    setNewIndex({
      groupIndex,
      boxIndex
    });   
  }

  const handleDragEnd =(event:React.DragEvent)=>{
     event.preventDefault();
  }

  const handleDrag = (groupIndex:number, boxIndex:number)=>{
    if (newIndex.groupIndex === null || newIndex.boxIndex === null) return;

    const newItems = [...items];
    const draggedItem = newItems[newIndex.groupIndex].children.splice(newIndex.boxIndex, 1)[0]; // Remove dragged item
    newItems[groupIndex].children.splice(boxIndex, 0, draggedItem); // Insert at new position

    setItems(newItems);
    setNewIndex({
      groupIndex:null,
      boxIndex:null
    });
  }

  return (
    <>
     {
      items.map((accessories, key)=>{
        return <div key={key} style={{border: '1px dotted gray', borderRadius:'10px', padding:'10px', marginBottom:'10px'}}>
             <h5>{accessories.title}</h5>
             <div>
              {
               accessories.children.map((items, index)=>{
                return <div key={index} style={{background:'red', borderRadius:'10px', padding:'5px', marginBottom:'5px'}} 
                  onDragStart={()=>handleDragStart(key,index)}
                  onDragOver={handleDragEnd}
                  onDrop={()=>handleDrag(key, index)}
                  draggable>
                  <h4>{items.name}</h4>
                  <p>{items.model}</p>
                </div>
               })
              }
             </div>
        </div>
      })
     }
    </>
  )
}

export default App
