import TaskCard from './TaskCard.jsx'

function Row({ title, status, tasks, onDrop, onDelete , onUpdate }) {

  
  const handleDragOver = (event) => {
    event.preventDefault()
  }

  
  const handleDrop = (event) => {
    event.preventDefault()

    const taskId = event.dataTransfer.getData('taskId')
    if (!taskId) return

    onDrop(taskId, status)
  }

  return (
    <div
      className="bg-white p-4 border min-h-[300px]"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <h2 className="font-semibold mb-3">{title}</h2>

      {tasks.length === 0 ? (
        <p className="text-gray-400">No tasks</p>
      ) : (
        <div className="space-y-2">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onDelete={onDelete} onUpdate={onUpdate} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Row
