import { ForHomePage } from './Pages/HomePage' 
import { ForTodoList } from './Pages/TodoList'
import { Routes ,Route} from 'react-router'
import { ForLocation } from './Pages/Location'
import './index.css'


function App() {
  return(
    <>
      
     
     <Routes>
      <Route path='checklocation' element={<ForLocation />}>
        
        </Route>
      <Route path='/' element={ <ForHomePage /> }></Route>
     
      <Route path='todolist' element={ <ForTodoList /> }></Route>

       
     </Routes>
     </>
     

    
  )

}

export default App


