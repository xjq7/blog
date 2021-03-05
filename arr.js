function toThousands(num) {
  let [prefix, suffix] = num.toString().split('.')
  let i = 0
  prefix = Array.from(prefix).reverse().join('')
  let formatPrefix = ''
  while (i < prefix.length) {
    formatPrefix = prefix[i++] + formatPrefix
    if (i % 3 === 0) {
      formatPrefix = ',' + formatPrefix
    }
  }
  return formatPrefix + '.' + suffix
}

const a = toThousands(3213123199001.32113)
console.log(a)
