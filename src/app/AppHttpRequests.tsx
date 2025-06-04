import {type ChangeEvent, type CSSProperties, useEffect, useState} from 'react'
import Checkbox from '@mui/material/Checkbox'
import {CreateItemForm} from '@/common/components/CreateItemForm/CreateItemForm'
import {EditableSpan} from '@/common/components/EditableSpan/EditableSpan'
import axios from 'axios'

const token = '448e0d12-136a-4f40-9ff3-99347c703a57'
const apiKey = '14d62fb0-7776-4500-94b8-5e06e7d229ae'

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([])
  const [tasks, setTasks] = useState<any>({})

  useEffect(() => {
    // get todolists
    axios.get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {headers: {Authorization: `Bearer ${token}`}})
      .then((res) => setTodolists(res.data))
  }, [])

  const createTodolist = (title: string) => {
    axios.post<BaseResponce<{item: Todolist}>>('https://social-network.samuraijs.com/api/1.1/todo-lists',{title}, {headers: {Authorization: `Bearer ${token}`, "API-KEY": apiKey}})
      .then((res) => {
        const todolist = res.data.data.item
        setTodolists([todolist, ...todolists])
      })
  }

  const deleteTodolist = (id: string) => {
    axios.delete<BaseResponce<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'API-KEY': apiKey,
      }
    }).then(() => {
      setTodolists(todolists.filter(tl => tl.id !== id))
    })
  }

  const changeTodolistTitle = (id: string, title: string) => {
    axios.put<BaseResponce<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {title}, {
      headers: {
        Authorization: `Bearer ${token}`,
        'API-KEY': apiKey,
      }
    }).then(() => setTodolists(todolists.map(tl => tl.id === id ? {...tl, title} : tl)))
  }

  const createTask = (todolistId: string, title: string) => {
  }

  const deleteTask = (todolistId: string, taskId: string) => {
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, task: any) => {
  }

  const changeTaskTitle = (task: any, title: string) => {
  }

  return (
    <div style={{margin: '20px'}}>
      <CreateItemForm onCreateItem={createTodolist}/>
      {todolists.map((todolist:Todolist) => (
        <div key={todolist.id} style={container}>
          <div>
            <EditableSpan value={todolist.title}
                          onChange={title => changeTodolistTitle(todolist.id, title)}/>
            <button onClick={() => deleteTodolist(todolist.id)}>x</button>
          </div>
          <CreateItemForm onCreateItem={title => createTask(todolist.id, title)}/>
          {tasks[todolist.id]?.map((task: any) => (
            <div key={task.id}>
              <Checkbox checked={task.isDone}
                        onChange={e => changeTaskStatus(e, task)}/>
              <EditableSpan value={task.title}
                            onChange={title => changeTaskTitle(task, title)}/>
              <button onClick={() => deleteTask(todolist.id, task.id)}>x</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

const container: CSSProperties = {
  border: '1px solid black',
  margin: '20px 0',
  padding: '10px',
  width: '300px',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
}

export type Todolist = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type FieldError = {
  error: string
  field: string
}

export type BaseResponce<T> = {
  data: T
  resultCode: number
  messages: string[]
  fieldsErrors: FieldError[]
}

type CreateTodolistResponse = {
  data: { item: Todolist }
  fieldsErrors: FieldError[]
}
type DeleteTodolistResponse = {
  data: {}
  fieldsErrors: FieldError[]
}
type UpdateTodolistResponse = {
  data: {}
}