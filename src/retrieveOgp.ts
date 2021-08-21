import { isObject } from './utils'
import { getDomParser } from './getDomParser'

export interface Ogp {
  ogp?: {
    [key: string]: string | { [key: string]: string }
  }
  twitter?: {
    [key: string]: string
  }
}

export function retrieveOgp(html: string) {
  const DomParser = getDomParser()
  const doc = new DomParser().parseFromString(html, 'text/html')
  const metaElements = Array.from(doc.getElementsByTagName('meta'))
  return convertToOgp(metaElements)
}

export function convertToOgp(metaElements: HTMLMetaElement[]) {
  const ogp: Ogp = {}

  metaElements.forEach((metaElement) => {
    const property = metaElement.getAttribute('property')
    const name = metaElement.getAttribute('name')
    const content = metaElement.getAttribute('content')

    if (!content) return

    const metaKey = property || name

    if (metaKey?.startsWith('og:') || metaKey?.startsWith('twitter:')) {
      const keys = metaKey.split(':')

      let schema: { [key: string]: any } = ogp

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i] === 'og' ? 'ogp' : keys[i]
        if (i < keys.length - 1) {
          if (!schema[key]) {
            schema[key] = {}
          } else if (schema[key] && !isObject(schema[key])) {
            schema[key] = {}
          }

          schema = schema[key]
        } else if (i === keys.length - 1) {
          schema[key] = content
        }
      }
    }
  })

  return ogp
}
