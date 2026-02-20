import { useState, useEffect } from 'react'
import Row from './components/Row.jsx'
import { Button } from './components/ui/button.jsx'

function App() {
  const [priority, setPriority] = useState('low')
  const [title, setTitle] = useState('')
  
  const [tasks, setTasks] = useState(() => {     
    const savedTasks = localStorage.getItem("tasks")   
    return savedTasks ? JSON.parse(savedTasks) : [] 
  })

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const handleAddTask = () => { // Add a new task to the list
    if (title.trim() === "") {
      return;
    }
    const newTask = {
      id: Date.now().toString(),
      title: title,
      status: 'todo',
      priority: priority
    }

    setTasks([...tasks, newTask]) 
    setTitle('')
  }

  const clearAll = () => {
  setTasks([])
}


 const handleDrop = (taskId, newStatus) => {   
  const updatedTasks = tasks.map((task) => {
    if (task.id === taskId) {
      return { ...task, status: newStatus }
    }
    return task
  })

  setTasks(updatedTasks)
}

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id)
    setTasks(updatedTasks)
  }


  const handleUpdate = (taskId, newTitle) =>{
    const updatedTasks =tasks.map((task) =>{
      if(task.id ===taskId) {
        return {...task,title: newTitle}
      }
      return task
    })
    setTasks(updatedTasks)
  }




  const priorityRank = {
    high: 3,
    medium: 2,
    low: 1,
  }

  const todoTasks = tasks.filter(task => task.status === 'todo').sort((task1, task2) => priorityRank[task2.priority] - priorityRank[task1.priority])
  const inProgressTasks = tasks.filter(task => task.status === 'inprogress').sort((task1, task2) => priorityRank[task2.priority] - priorityRank[task1.priority])
  const completedTasks = tasks.filter(task => task.status === 'completed').sort((task1, task2) => priorityRank[task2.priority] - priorityRank[task1.priority])

  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-2xl font-bold mb-4">TODO LIST</h1>
      <div className="flex gap-3 mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task"
          className="border p-2 flex-1"
        />


        <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="border p-2"
        >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      
        <Button onClick={handleAddTask}>
          Add
        </Button>

        <Button onClick={clearAll}>
          Clear All</Button>
      </div>


       {/* props pass  */}
      
      <div className="grid grid-cols-3 gap-4">
        <Row title="To Do" status="todo" tasks={todoTasks} onDrop={handleDrop} onDelete={handleDeleteTask} onUpdate={handleUpdate}/>
        <Row title="In Progress" status="inprogress" tasks={inProgressTasks} onDrop={handleDrop} onDelete={handleDeleteTask}  onUpdate={handleUpdate} />
        <Row title="Completed" status="completed" tasks={completedTasks} onDrop={handleDrop} onDelete={handleDeleteTask}  onUpdate={handleUpdate} />
      </div>
      

    </main>
  )
}

export default App
