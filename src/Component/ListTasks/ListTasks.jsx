import './ListTasks.css'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import {useState , useContext,useEffect } from 'react'
import { useNotifications } from '@toolpad/core/useNotifications';

import { ContextList } from '../ContextList/ContextList';


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';

export default function ListTasks({ListVisibleIs}) {

    const { TaskList, setTaskList, IndexEdit, setIndexEdit } = useContext(ContextList);

    const taskTable = [
        {title : "Task 1", content: "Content for task 1" , status : false},
        {title : "Task 2", content: "Content for task 2" , status : false},
        {title : "Task 3", content: "Content for task 3" , status : false},
        {title : "Task 4", content: "Content for task 4" , status : false}
    ]

    const [newTask , setNewTask]=useState({
        title:"",
        content:"",
        status:false
    })

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("TaskList"))
        if (!storedTasks || storedTasks.length === 0) {
            localStorage.setItem("TaskList", JSON.stringify(taskTable));
        }
        setTaskList(storedTasks );
    },[]);
    

    function handleChange(event) {
        const { name, value } = event.target;
        setNewTask(prevData => ({
            ...prevData,
            [name]: value
        }))
        
    }

    const notifications = useNotifications();
    console.log(notifications);

    function handleSubmit(event){
        event.preventDefault()
        console.log(newTask)
        if(newTask.title === "" || newTask.content === ""){
            notifications.show('Please Fill All Fields', {
                autoHideDuration: 3000,
            });
            return;
        }
        const updatedTaskList = [...TaskList , newTask];
        setTaskList(updatedTaskList)
        localStorage.setItem("TaskList",JSON.stringify(updatedTaskList))
        setNewTask({
            title:"",
            content:"",
            status:false
        })
        notifications.show('Succufully Aded Task', {
            autoHideDuration: 3000,

          });
    }

    function handleDeleteTask(index){
        console.log([index])
        const newTaskTable = [...TaskList]
        newTaskTable.splice(index,1)
        setTaskList(newTaskTable)
        localStorage.setItem("TaskList",JSON.stringify(newTaskTable))
        notifications.show('Task Deleted Succufully', {
            autoHideDuration: 3000,

          });
    }

    function CheckedClick(index){
        const newTable = [...TaskList]
        newTable[index].status = !newTable[index].status
        setTaskList(newTable)
        localStorage.setItem("TaskList",JSON.stringify(newTable))
        if(newTable[index].status){
            notifications.show('Task Finished Succufully', {
            autoHideDuration: 3000,
          })
        }else{
            notifications.show('Task Unfinished ', {
                autoHideDuration: 3000,

            });
        }
        console.log(newTable[index])
    }


    function HandleEdit(index) {
        setIndexEdit(index);

    }
    
    
    const [task, setTask] = useState({ id:'-1', title: 'not found', content: 'not found' });

    useEffect(() => {
        if (IndexEdit !== -1) {
            const currentTask = TaskList[IndexEdit];
            setTask({ id: IndexEdit, title: currentTask.title, content: currentTask.content });
        }
    }, [IndexEdit, TaskList]);


    const handleSave = () => {
        const updatedTaskList = [...TaskList];
        updatedTaskList[IndexEdit] = task; 
        setTaskList(updatedTaskList);
        localStorage.setItem("TaskList", JSON.stringify(updatedTaskList));
        setIndexEdit(-1);

    };
    const open = IndexEdit !== -1; 
    const onClose = () => {
        setIndexEdit(-1); 
        setTask({ id:'-1', title: 'not found', content: 'not found' }); 
    };

    const TasksListAll = TaskList.map((task,index) => {
        return (
            <div key={index}>
                {(ListVisibleIs != 'all')?(
                <>
                    {(ListVisibleIs == "finished" && task.status) || (ListVisibleIs == "unfinished" && !task.status) ? (
                        <div className="Tasks" >
                            <div className='Task'>
                                <h4>{task.title}</h4>
                                <p style={{fontSize:"16px"}}>{task.content}</p>
                            </div>
                            <div className='ButtonGroup'>
                                <IconButton  style={{border:"1px solid red",color:"red",background:"white"}}>
                                    <DeleteIcon onClick={()=>handleDeleteTask(index)} />
                                </IconButton>
                                <IconButton  style={{border:"1px solid blue",color:"blue" ,background:"white"}}>
                                    <EditRoundedIcon onClick={()=>HandleEdit(index)}/>
                                </IconButton>
                                {(task.status)?(
                                    <IconButton  style={{border:"1px solid green",color:"white",background:"green"}}>                    
                                        <CheckRoundedIcon onClick={()=>CheckedClick(index)} /> 
                                    </IconButton>
                                ):(
                                    <IconButton  style={{border:"1px solid green",color:"green",background:"white"}}>                    
                                        <CheckRoundedIcon onClick={()=>CheckedClick(index)}/> 
                                    </IconButton>
                                )}
                                
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                </>
                ):(
                <div className="Tasks" >
                    <div className='Task'>
                        <h4>{task.title}</h4>
                        <p style={{fontSize:"16px"}}>{task.content}</p>
                    </div>
                    <div className='ButtonGroup'>
                        <IconButton  style={{border:"1px solid red",color:"red",background:"white"}}>
                            <DeleteIcon onClick={()=>handleDeleteTask(index)} />
                        </IconButton>
                        <IconButton  style={{border:"1px solid blue",color:"blue" ,background:"white"}}>
                            <EditRoundedIcon onClick={()=>HandleEdit(index)}/>
                        </IconButton>
                        {(task.status)?(
                            <IconButton  style={{border:"1px solid green",color:"white",background:"green"}}>                    
                                <CheckRoundedIcon onClick={()=>CheckedClick(index)} /> 
                            </IconButton>
                        ):(
                            <IconButton  style={{border:"1px solid green",color:"green",background:"white"}}>                    
                                <CheckRoundedIcon onClick={()=>CheckedClick(index)}/> 
                            </IconButton>
                        )}
                        
                    </div>
                </div>
                )}
            </div>   
                
        )
    })
        return (
        <>
        <Dialog fullWidth open={open} onClose={onClose}>
                    <DialogTitle>Edit Tasks : </DialogTitle>
                    <div className="EditTasks">
                        <input type="text"  className='EditTask' name="title"  value={task.title}
                            onChange={(e) => setTask({ ...task, title: e.target.value })} />
                        <input type="text"  className='EditTask' name="content" value={task.content}
                            onChange={(e) => setTask({ ...task, content: e.target.value })} />
                    </div>
        
                        
                    <DialogActions>
                        <Button onClick={() => onClose()}>Close me</Button>
                        <Button onClick={handleSave} >Save</Button>
                        
                    </DialogActions>
        </Dialog>
        
            <div className="Task-container">
                <div className='ListTasks'>
                    {TasksListAll }
                </div>
                <form className='AddTask' onSubmit={handleSubmit}>
                    <input type="text" placeholder='Add title' className='InputTask' name="title" value={newTask.title} onChange={handleChange}/>
                    <input type="text" placeholder='Add content' className='InputTask' name="content" value={newTask.content} onChange={handleChange}/>
                    <button className='Add' type='submit'>Add</button>
                </form>

            </div>
        </>

        )
    }
   


