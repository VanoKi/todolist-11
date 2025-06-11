import { instance } from "@/common/instance/instance.ts"
import { GetTasksResponse } from "@/features/todolists/api/tasksApi.types.ts"

export const tasksApi = {
  getTasks(todolistID: string) {
    return instance.get<GetTasksResponse>(
      `/todo-lists/${todolistID}/tasks`,
    )
  },
}
