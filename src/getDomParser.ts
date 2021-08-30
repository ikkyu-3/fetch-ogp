export const getDomParser = () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const jsdom = require('jsdom')
  const { JSDOM } = jsdom
  return new JSDOM().window.DOMParser as typeof DOMParser
}
