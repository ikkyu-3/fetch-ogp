import { convertToOgp, retrieveOgp } from './retrieveOgp'
import jsdom from 'jsdom'

describe('retrieveOgp', () => {
  describe('retrieveOgp', () => {
    it('ogp, twitter情報を返す', () => {
      const htmlStr = `
        <!doctype html>
        <html>
          <head>
            <title>Title</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=1">
            <meta name="description" content="description">
            <meta property="og:title" content="ogp title">
            <meta property="og:type" content="website">
            <meta property="og:image" content="https://example.com/ogp.png">
            <meta property="og:url" content="example.com">
            <meta property="og:description" content="ogp description">
            <meta name="twitter:card" content="summary_large_image">
          </head>
          <body>
            <div>Test</div>
          </body>
        </html>
      `

      expect(retrieveOgp(htmlStr)).toEqual({
        ogp: {
          title: 'ogp title',
          type: 'website',
          image: 'https://example.com/ogp.png',
          url: 'example.com',
          description: 'ogp description',
        },
        twitter: {
          card: 'summary_large_image',
        },
      })
    })

    it('ogp, twitter情報がない場合は空オブジェクトを返す', () => {
      const htmlStr = `
        <!doctype html>
        <html>
          <head>
            <title>Title</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=1">
            <meta name="description" content="description">
          </head>
          <body>
            <div>Test</div>
          </body>
        </html>
      `
      expect(retrieveOgp(htmlStr)).toEqual({})
    })
  })

  describe('convertToOgp', () => {
    it('ogp or twitterのメタタグがある場合、情報を抜き出したオブジェクトを返す', () => {
      const DomParser = new jsdom.JSDOM().window.DOMParser
      const doc = new DomParser().parseFromString('', 'text/html')
      const metaElements: HTMLMetaElement[] = []
      const testData = [
        [{ key: 'charset', value: 'utf-8' }],
        [
          { key: 'name', value: 'viewport-8' },
          { key: 'content', value: 'width=device-width,initial-scale=1' },
        ],
        [
          { key: 'name', value: 'description' },
          { key: 'content', value: 'description' },
        ],
        [
          { key: 'property', value: 'og:title' },
          { key: 'content', value: 'ogp title' },
        ],
        [
          { key: 'property', value: 'og:type' },
          { key: 'content', value: 'website' },
        ],
        [
          { key: 'property', value: 'og:image' },
          { key: 'content', value: 'https://example.com/ogp.png' },
        ],
        [
          { key: 'property', value: 'og:url' },
          { key: 'content', value: 'https://example.com' },
        ],
        [
          { key: 'property', value: 'og:description' },
          { key: 'content', value: 'ogp description' },
        ],
        [
          { key: 'name', value: 'twitter:card' },
          { key: 'content', value: 'summary_large_image' },
        ],
      ]

      testData.forEach((attributes) => {
        const element = doc.createElement('meta')
        attributes.forEach((attribute) => {
          element.setAttribute(attribute.key, attribute.value)
        })
        metaElements.push(element)
      })

      expect(convertToOgp(metaElements)).toEqual({
        ogp: {
          title: 'ogp title',
          type: 'website',
          image: 'https://example.com/ogp.png',
          url: 'https://example.com',
          description: 'ogp description',
        },
        twitter: {
          card: 'summary_large_image',
        },
      })
    })

    it('ogp or twitterのメタタグがない場合、空のオブジェクトを返す', () => {
      expect(convertToOgp([])).toEqual({})
    })
  })
})
