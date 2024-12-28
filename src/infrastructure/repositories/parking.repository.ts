import * as mongoose from 'mongoose'
import Parking from '../models/parking.model'
import ParkingDto from '../../application/interfaces/dtos/parking.dto'
import IParkingRepository from '../../application/interfaces/repositories/parking.interface'

class ParkingRepository implements IParkingRepository {
  create(item: ParkingDto, callback: (error: any, result: any) => void): void {
    const newParking = new Parking(item)
    newParking.save()
  }

  list(): Promise<any> {
    return Parking.find({})
  }

  update(
    _id: number,
    item: ParkingDto,
    callback: (error: any, result: any) => void
  ): void {
    Parking.findByIdAndUpdate(
      _id,
      { $set: { ...item, updatedDate: new Date() } },
      { new: true }
    )
  }

  delete(_id: number, callback: (error: any, result: any) => void): void {
    Parking.findByIdAndDelete(_id, callback)
  }
}

export default ParkingRepository
