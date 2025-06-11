import {
  type ChangeEvent,
  type CSSProperties,
  useEffect,
  useState,
} from "react"
import Checkbox from "@mui/material/Checkbox"
import { CreateItemForm, EditableSpan } from "@/common/components"
import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"
import { tasksApi } from "@/features/todolists/api/tasksApi.ts"
import {
  DomainTask,
  UpdateTaskModel,
} from "@/features/todolists/api/tasksApi.types.ts"

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([])
  const [tasks, setTasks] = useState<Record<string, DomainTask[]>>({})

  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      const todolists = res.data
      setTodolists(todolists)

      todolists.forEach((todolist) => {
        tasksApi.getTasks(todolist.id).then((res) => {
          // console.log(res.data)
          setTasks((prevTasks) => ({
            ...prevTasks,
            [todolist.id]: res.data.items,
          }))
        })
      })
    })
  }, [])

  const createTodolist = (title: string) => {
    todolistsApi.createTodolist(title).then((res) => {
      const todolist = res.data.data.item
      setTodolists([todolist, ...todolists])
    })
  }

  const deleteTodolist = (id: string) => {
    todolistsApi.deleteTodolist(id).then(() => {
      setTodolists(todolists.filter((tl) => tl.id !== id))
    })
  }

  const changeTodolistTitle = (id: string, title: string) => {
    todolistsApi.changeTodolistTitle({ id, title }).then(() =>
      setTodolists(
        todolists.map((tl) =>
          tl.id === id
            ? {
                ...tl,
                title,
              }
            : tl,
        ),
      ),
    )
  }

  const createTask = (todolistId: string, title: string) => {
    tasksApi.createTask({ title, todolistId }).then((res) => {
      // console.log(res)
      const newTask = res.data.data.item
      setTasks({
        ...tasks,
        [todolistId]: [newTask, ...tasks[todolistId]],
      })
    })
  }

  const deleteTask = (todolistId: string, taskId: string) => {}

  const changeTaskStatus = (
    e: ChangeEvent<HTMLInputElement>,
    task: DomainTask,
  ) => {
    const todolistId = task.todoListId

    const model: UpdateTaskModel = {
      title: task.title,
      priority: task.priority,
      description: task.description,
      startDate: task.startDate,
      deadline: task.deadline,
      status: e.target.checked ? 2 : 0,
    }

    tasksApi
      .changeTaskStatus({ todolistId, taskId: task.id, model })
      .then((res) => {
        setTasks({
          ...tasks,
          [todolistId]: tasks[todolistId].map((el) =>
            el.id === task.id ? res.data.data.item : el,
          ),
        })
      })
  }

  const changeTaskTitle = (task: any, title: string) => {}

  return (
    <div style={{ margin: "20px" }}>
      <CreateItemForm onCreateItem={createTodolist} />
      {todolists.map((todolist: Todolist) => (
        <div key={todolist.id} style={container}>
          <div>
            <EditableSpan
              value={todolist.title}
              onChange={(title) =>
                changeTodolistTitle(todolist.id, title)
              }
            />
            <button onClick={() => deleteTodolist(todolist.id)}>
              x
            </button>
          </div>
          <CreateItemForm
            onCreateItem={(title) => createTask(todolist.id, title)}
          />
          {tasks[todolist.id]?.map((task) => (
            <div key={task.id}>
              <Checkbox
                checked={task.status === 2}
                onChange={(e) => changeTaskStatus(e, task)}
              />
              <EditableSpan
                value={task.title}
                onChange={(title) => changeTaskTitle(task, title)}
              />
              <button
                onClick={() => deleteTask(todolist.id, task.id)}
              >
                x
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

const container: CSSProperties = {
  border: "1px solid black",
  margin: "20px 0",
  padding: "10px",
  width: "300px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
}
