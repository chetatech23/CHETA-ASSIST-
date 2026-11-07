  import { useState , useEffect } from "react"
 
 export function ForTodoList () {
      const [todolist, setTodolist]  =  useState('');

      const [check , setCheck] = useState(false);

      const [date , setDate] = useState('');
    
       const [mainarray, setMainarray] = useState(() => {
         const savedTasks = localStorage.getItem('mytasks');
         return savedTasks ? JSON.parse(savedTasks) : [];
     });
       

      useEffect(() => {
         localStorage.setItem('mytasks', JSON.stringify(mainarray));
     }, [mainarray]); 


      function typedtext (event) {
         setTodolist(event.target.value);
      };

      function pickeddate (event) {
        setDate(event.target.value);
      }
       

      function addtolist () {
          console.log(todolist);
          console.log(date);

          if (todolist.trim() === '' || date === '') {
             alert('Please enter a task and pick a date!');
             return; 
         }

         const updatedArray =  [...mainarray ,{text : todolist  , date : date}]
         
        

         setMainarray(updatedArray);

         setTodolist('');
         setDate('');
         setCheck(false);
      };

      function deletetask(taskToDelete) {
        const updatedArray = mainarray.filter((item) => item !== taskToDelete);
        setMainarray(updatedArray);

        
        
     };  


      return (
        <>
        <a href="/" className="mt-[50px] text-[20px] font-['Plus_Jakarta_Sans'] ml-[15px] border-b w-[100px]">Go Back</a>

      <div className="mt-[46px] flex  justify-between">
        <p className="text-[25px] ml-[20px] font-bold font-['Plus_Jakarta_Sans'] "> My Todolist</p>
        <div className="mr-[20px] bg-black rounded-full w-[50px] h-[50px] flex justify-center items-center " >
        <button  className="text-[30px] text-white" onClick={() => setCheck(true)}>+</button>
        </div>
      </div>

      <div className="bg-black mt-[100px] min-h-[1000px]  text-white pt-[40px] flex flex-col  gap-[40px] rounded-[20px]">
     {mainarray.map((item) => (
      <div className="flex justify-between  ">
        <p className="ml-[20px]">{item.date}</p>

        <div className="min-h-[100px] bg-yellow-500 w-[65%] flex flex-col justify-center items-center mr-[20px] text-black gap-[10px] rounded-[10px]">
      <p className="text-[20px] w-[90%] max-w-[400px] break-words  mt-[10px] font-['Plus_Jakarta_Sans'] rounded-[10px]" >{item.text}</p>

      <div className="mt-[20px] flex  gap-[30px]">
      <button className="h-[40px] w-[90px] bg-white text-black mb-[10px] rounded-[10px]" onClick={() => { deletetask(item) , alert('Congratulations on completing your task!')}}>DONE</button>
      <button className="h-[40px] w-[90px] bg-black text-white mb-[10px] rounded-[10px]"  onClick={() => deletetask(item)}>DELETE</button>
     </div>



      </div>

      </div>
     
      
     )) } 

      </div> 
      

      <div  >
        {
         check && (
          <div className="fixed  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2   inset-0 bg-white w-[90%] h-[80%]  flex flex-col  justify-center items-center gap-[90px] rounded-[20px]">
            
         <p className="text-[30px] font-['Plus_Jakarta_Sans']  border-black font-bold bg-yellow-500 w-[80%] text-center h-[50px] rounded-[4px]">Add New-Task</p>
         <textarea placeholder="write new task" className=" border-[2px] border-yellow-500 w-[90%] h-[90px] rounded-[10px] pt-[10px] pl-[10px] pr-[10px] text-[20px] bg-black text-yellow-500 " onChange={typedtext} type="text" />
         <p className="font-['Plus_Jakarta_Sans'] text-[23px]">Pick a Date -<input onChange={pickeddate } type="date" /></p> 
         <button  className="bg-black text-white h-[100px] w-[80%] text-[20px] font-['Plus_Jakarta_Sans'] rounded-[20px]" onClick={addtolist}>ADD TO TODOLIST</button>

          </div>
         ) 
        }
      </div>
      </>
      );

  }