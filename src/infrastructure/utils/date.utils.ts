export default function dateToMinutes(entrance: Date, exit?: Date) {
  console.log('entrance', entrance)
  console.log('exit', exit)

  var timeLimit = exit ?? new Date()

  console.log('timeLimit', timeLimit)

  var diff = Math.abs(timeLimit.getTime() - entrance.getTime())
  var minutes = Math.floor(diff / 1000 / 60)
  return minutes + ' minutes'
}
