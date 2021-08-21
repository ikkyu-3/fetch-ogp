import axios from 'axios'
import { retrieveOgp } from './retrieveOgp'

export async function fetchOgp(url: string) {
  const result = await axios.get(url)
  return retrieveOgp(result.data)
}
