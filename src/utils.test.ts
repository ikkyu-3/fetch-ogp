import { isObject } from './utils'

describe('utils', () => {
  describe('isObject', () => {
    it('引数が連想配列の場合、true を返す', () => {
      expect(isObject({})).toBeTruthy()
      expect(isObject({ key: 'value' })).toBeTruthy()
    })

    it('引数がString型の場合、false を返す', () => {
      expect(isObject('')).toBeFalsy()
    })

    it('引数がNumber型の場合、false を返す', () => {
      expect(isObject(0)).toBeFalsy()
    })

    it('引数がBoolean型の場合、false を返す', () => {
      expect(isObject(false)).toBeFalsy()
    })

    it('引数がFunction型の場合、false を返す', () => {
      expect(
        isObject(() => {
          /**/
        }),
      ).toBeFalsy()
    })

    it('引数がArray型の場合、false を返す', () => {
      expect(isObject([])).toBeFalsy()
    })

    it('引数がnullの場合、false を返す', () => {
      expect(isObject(null)).toBeFalsy()
    })

    it('引数がundefinedの場合、false を返す', () => {
      expect(isObject(undefined)).toBeFalsy()
    })
  })
})
