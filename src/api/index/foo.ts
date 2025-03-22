import { fetcher } from '@/utils/fetcher'
export interface IFooItem {
  id: string
  name: string
}

/** GET 请求 */
export const getFooAPI = (name: string) => {
  return fetcher.get<IFooItem>('/foo', { name })
}

/** POST 请求 */
export const postFooAPI = (name: string) => {
  return fetcher.post<IFooItem>('/foo', { name }, { name })
}
