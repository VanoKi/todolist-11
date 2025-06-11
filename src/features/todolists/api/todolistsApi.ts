import { instance } from "@/common/instance/instance.ts"
import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"
import { BaseResponce } from "@/common/types"

export const todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>("/todo-lists")
  },
  changeTodolistTitle({ id, title }: { id: string; title: string }) {
    return instance.put<BaseResponce>(`/todo-lists/${id}`, { title })
  },
  createTodolist(title: string) {
    return instance.post<BaseResponce<{ item: Todolist }>>("/todo-lists", { title })
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponce>(`/todo-lists/${id}`)
  },
}
