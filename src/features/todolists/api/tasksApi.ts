import { instance } from "@/common/instance/instance.ts"
import {
  DomainTask,
  GetTasksResponse,
} from "@/features/todolists/api/tasksApi.types.ts"
import { BaseResponce } from "@/common/types"

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(
      `/todo-lists/${todolistId}/tasks`,
    )
  },
  createTask({
    todolistId,
    title,
  }: {
    todolistId: string
    title: string
  }) {
    return instance.post<BaseResponce<{ item: DomainTask }>>(
      `/todo-lists/${todolistId}/tasks`,
      {
        title,
      },
    )
  },
}
