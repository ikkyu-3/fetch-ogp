export const getDomParser = () => {
  if (typeof DOMParser !== 'undefined') {
    return DOMParser
  } else {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const jsdom = require('jsdom')
    const { JSDOM } = jsdom
    return new JSDOM().window.DOMParser as typeof DOMParser
  }
}
