export const getResult = 'data string'

export default {
  get() {
    if (process.env.AXIOS_GET === 'ERROR') {
      return Promise.reject(new Error('test'))
    }

    return Promise.resolve({ data: getResult })
  },
}
