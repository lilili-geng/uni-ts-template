export const prototypeInterceptor = {
  install() {
    if (typeof Array.prototype.at !== 'function') {
      // eslint-disable-next-line no-extend-native
      Array.prototype.at = function (index: number) {
        if (index < 0) return this[this.length + index]
        if (index >= this.length) return undefined
        return this[index]
      }
    }
  },
}
