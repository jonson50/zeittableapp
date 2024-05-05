export function errorHandler(error: any) {
  console.log('this is a error ' + error.code)
  console.error(error.message)
}
