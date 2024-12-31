import { AutoMap } from '@automapper/classes'

import moongose, { Document, Schema } from 'mongoose'

export class Parking extends Document {
  @AutoMap()
  _id!: string

  @AutoMap()
  plate!: string

  @AutoMap()
  paid!: boolean

  @AutoMap()
  entranceDate!: Date

  @AutoMap()
  exitDate!: Date
}

const ParkingSchema = new Schema<Parking>({
  plate: { type: String, required: true },
  paid: { type: Boolean },
  entranceDate: { type: Date, default: Date.now },
  exitDate: { type: Date }
})

export default moongose.model<Parking>('Parking', ParkingSchema)
