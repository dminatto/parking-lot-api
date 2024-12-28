export default interface ParkingDto {
  _id?: number
  plate: string
  time: number
  paid: boolean
  left: boolean
  createdDate?: Date
  updatedDate?: Date
}
