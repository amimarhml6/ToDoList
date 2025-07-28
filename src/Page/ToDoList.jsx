import './ToDoList.css'
import ListTasks from '../Component/ListTasks/ListTasks'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {useState } from 'react'
import {ContextList} from '../Component/ContextList/ContextList'

export default function ToDoList() {
    const task = [
        {title : "Task 1", content: "Content for task 1" , status : false},
        {title : "Task 2", content: "Content for task 2" , status : false},
        {title : "Task 3", content: "Content for task 3" , status : false},
        {title : "Task 4", content: "Content for task 4" , status : false}
    ]
    const [TaskList , setTaskList]=useState(task)
    const [IndexEdit , setIndexEdit] = useState(-1)
    const [ListVisible , setListVisible] = useState("all")


    return(
        <ContextList.Provider value={{  TaskList, setTaskList, IndexEdit,  setIndexEdit }}>
            <div className='TodoList' >
                <h2 style={{margin:"0px",color:"black"}}>To Do List</h2>
                <div className='ButtonGroup'>
                    <ButtonGroup variant="outlined" aria-label="Basic button group" color="secondary">
                        <Button onClick={()=>{setListVisible("finished")}}>Finished</Button>
                        <Button onClick={()=>{setListVisible("unfinished")}}>Unfinished</Button>
                        <Button onClick={()=>{setListVisible("all")}}>All</Button>
                    </ButtonGroup>
                </div>
                <div className="ListTasks">
                    <ListTasks ListVisibleIs={ListVisible} />
                </div>
            </div>
        </ContextList.Provider>

    )
}