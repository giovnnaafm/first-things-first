export interface ApiResponse<T> {
    success: boolean
    payload: T
  }
  
  export type QueryParams = {
    key:string
    value?:number | string
  }
  