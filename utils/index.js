function pureColorString(colorString) {
  let origin = `${colorString}`.replaceAll('\u001b', '').replaceAll('\x1B', '') || ''
  let mapper = origin
  let res = origin || ''
  let length = mapper.length
  let before = -1
  let after = -1
  for (let i = 0; i < length; i++) {
    if (mapper.charAt(i) === '[') {
      before = i
    }
    if (before !== -1 && mapper.charAt(i) === 'm') {
      after = i
    }
    if (before !== -1 && after !== -1) {
      let deleteStr = mapper.slice(before, after + 1)
      res = res.replace(`${deleteStr}`, '')
      before = -1
      after = -1
    }
  }
  return res;
}
module.exports = {
  pureColorString
}