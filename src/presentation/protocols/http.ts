export class HttpRequest implements Express.Request {
  body?: any
  params?: any
  query?: any
  headers?: any
  userId?: string
}

export class HttpResponse implements Express.Response {
  statusCode: number
  body?: any

  status: (num: number) => this
  json: (json: object) => this
}
