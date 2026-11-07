  import { Link } from "react-router"; 
  import  todolistimg from '../assets/todolist.jpg'
  import locationimg from '../assets/locationimage.jpg'

 export function ForHomePage () {
    return (
      <>
   
      
     <p className="mt-[90px] text-center text-[30px] font-['Plus_Jakarta_Sans']  mb-[50px] border-b w-[80%] mx-auto "> CHETA ASSIST</p>

     <div className="flex flex-col justify-center items-center gap-[150px]">

     <div className="h-[400px] bg-black w-[90%] rounded-[20px]  relative ">
      <img className="h-[100%] w-[100%] rounded-[20px] brightness-50" src={todolistimg}/>
      <div className="h-[200px] bg-white w-[90%] absolute left-[5%] bottom-[-20%] rounded-[20px] flex flex-col  justify-center pl-[30px]">
     
        <p className="text-[30px] font-['Plus_Jakarta_Sans']">Your Todolist List</p> 
         <a href="/todolist"  className="text-[22px] font-['Plus_Jakarta_Sans'] text-yellow-500">Click Here</a>
     
      </div>

      
       
     </div>


     <div className="h-[400px] bg-black w-[90%] rounded-[20px]  relative ">
      <img className="h-[100%] w-[100%] rounded-[20px] brightness-50" src={locationimg}/>
      <div className="h-[200px] bg-white w-[90%] absolute left-[5%] bottom-[-20%] rounded-[20px] flex flex-col  justify-center pl-[30px]">
     
        <p className="text-[30px] font-['Plus_Jakarta_Sans']">Check Location</p> 
         <Link to='/checklocation' className="text-[22px] font-['Plus_Jakarta_Sans'] text-yellow-500">Click Here</Link>
     
      </div>

      
       
     </div>

     </div>

    
     


        

    
   
   
    </>
    );
  }