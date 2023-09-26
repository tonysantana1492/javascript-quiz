import { Question } from '../types'

const API_URL = 'http://localhost:5173/'

const test = import.meta.env.TEST as string

export const getAllQuestions = async () => {
  const response = await fetch(`${API_URL}/data.json`)
  const json = (await response.json()) as Question[]

  return json
}
