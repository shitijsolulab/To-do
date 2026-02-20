import { Button } from './ui/button.jsx'
import { Card, CardContent } from './ui/card.jsx'

function TaskCard({ task, onDelete, onUpdate }) {
  const handleDragStart = (event) => {
    event.dataTransfer.setData('taskId', task.id)
  }

  const handleUpdate = () => {
    const newTitle = prompt('Edit task:', task.title)
    if (newTitle?.trim()) onUpdate(task.id, newTitle.trim())
  }





  const priorityColors = {
    low: 'text-green-600',
    medium: 'text-yellow-600',
    high: 'text-red-600',
  }

  return (
    <Card 
      className={`border-slate-300 bg-white shadow-sm cursor-grab active:cursor-grabbing ${priorityColors[task.priority] || ''}`}
      draggable={true}
      onDragStart={handleDragStart}>
      <CardContent className="p-3">
      <div className="relative">
        <p className="text-sm font-medium text-slate-800">{task.title}</p>
        <span className="absolute top-0 right-0 text-sm font-medium">{task.priority}</span>
      </div>
      </CardContent>

      <div className="p-2 flex gap-2">
        <Button onClick={() => onDelete(task.id)}>Delete</Button>
        <Button onClick={handleUpdate}>Update</Button>
      </div>
    </Card>
  )
}

export default TaskCard
