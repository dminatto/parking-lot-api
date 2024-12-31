export default function dateToMinutes(entrance: Date, exit?: Date) {
  var timeLimit = exit ?? new Date()

  var diff = Math.abs(timeLimit.getTime() - entrance.getTime())
  var minutes = Math.floor(diff / 1000 / 60)
  return minutes + ' minutes'
}
