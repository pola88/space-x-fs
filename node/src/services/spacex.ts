import axios, { AxiosResponse } from 'axios';
import { Launch } from '../types/launch';
import { Rocket } from '../types/rocket';

const fetchData = async <T>(url: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    return [] as T;
  }
};

export const fetchLaunches = async (): Promise<Launch[]> => fetchData<Launch[]>(`${process.env.SPACEX_API_URL}/launches`);
export const fetchRockets = async (): Promise<Rocket[]> => fetchData<Rocket[]>(`${process.env.SPACEX_API_URL}/rockets`);
