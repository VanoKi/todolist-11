import { instance } from "@/common/instance/instance.ts"
import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"
import { BaseResponce } from "@/common/types"

export const tasksApi = {
  getTasks(todolistID: string) {
    return instance.get<any>(`/todo-lists/${todolistID}/tasks`)
  },
}
