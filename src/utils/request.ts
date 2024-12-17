import { message } from 'antd'
import axios, { type AxiosInstance, type AxiosResponse } from 'axios'

const tokenKey = 'userToken'
const { VITE_API_HOST } = import.meta.env

export interface ResponseData<T> {
  code: number
  data: T
  message: string
}

const RestRequest: AxiosInstance = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

RestRequest.interceptors.response.use(
  async (response: AxiosResponse) => {
    if (response.data.code === 200) {
      return response
    }
    response.data.message && message.error(response.data.message as string)
    return await Promise.reject(response.data)
  },
  async (error) => {
    const { response } = error
    if (response) {
      response.data.message && message.error(response.data.message as string)
      return await Promise.reject(response.data)
    } else {
      void message.error('网络连接异常,请稍后再试!')
    }
  }
)

RestRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(tokenKey)
    if (token && config.headers) {
      config.headers.Authorization = `bearer ${token}`
    }
    return config
  },
  async (error) => {
    return await Promise.reject(error)
  }
)

export function apiUrl(url: string): string {
  return VITE_API_HOST ? `${VITE_API_HOST}${url}` : url
}

export async function swrFetcher<T>(url: string, params: T): Promise<any> {
  return await RestRequest.get(apiUrl(url), { params }).then((res) => res.data.data)
}

export async function sendRequest<T = unknown, U = unknown>(
  url: string,
  { arg }: { arg: U }
): Promise<ResponseData<T> | undefined> {
  const res = await RestRequest.post<ResponseData<T>>(apiUrl(url), arg)
  return res.data
}

export async function reqGet<U = unknown, T = unknown>(
  url: string,
  params?: T
): Promise<ResponseData<U> | undefined> {
  try {
    const res = await RestRequest.get<ResponseData<U>>(apiUrl(url), { params })
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export async function reqPost<U = unknown, T = unknown>(
  url: string,
  params?: T
): Promise<ResponseData<U> | undefined> {
  try {
    const res = await RestRequest.post<ResponseData<U>>(apiUrl(url), params)
    return res.data
  } catch (error) {
    console.log(error)
  }
}
