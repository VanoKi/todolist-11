export type FieldError = {
  error: string
  field: string
}

export type BaseResponce<T = {}> = {
  data: T
  resultCode: number
  messages: string[]
  fieldsErrors: FieldError[]
}
