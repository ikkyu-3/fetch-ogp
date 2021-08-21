import { fetchOgp } from './fetch-ogp'
import axios from 'axios'
import * as retrieveOgp from './retrieveOgp'

const mockAxiosGet = jest.spyOn(axios, 'get')
const mockRetrieveOgp = jest.spyOn(retrieveOgp, 'retrieveOgp').mockReturnValue({})

const url = 'https://example.com'
let result: any

describe('fetch-ogp', () => {
  describe('通信が成功する場合', () => {
    it('retrieveOgpの結果を返す', async () => {
      result = await fetchOgp(url)

      expect(result).toEqual({})
      expect(mockAxiosGet).toBeCalled()
      expect(mockRetrieveOgp).toBeCalled()

      mockRetrieveOgp.mockClear()
    })
  })

  describe('通信が失敗する場合', () => {
    it('例外がスローされる', async () => {
      process.env.AXIOS_GET = 'ERROR'

      await expect(fetchOgp(url)).rejects.toThrow()
      expect(mockAxiosGet).toBeCalled()
      expect(mockRetrieveOgp).not.toBeCalled()

      mockRetrieveOgp.mockClear()
      delete process.env.AXIOS_GET
    })
  })
})
