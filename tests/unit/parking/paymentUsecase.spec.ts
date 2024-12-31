import { describe, it, expect } from '@jest/globals'
import IParkingRepository from '../../../src/application/interfaces/repositories/parking.interface'
import ParkingRepository from '../../../src/infrastructure/repositories/parking.repository'
import ParkingPaymentUsecase from '../../../src/domain/usecases/parking/payment/parkingPayment.usecase'
import ParkingInfoResponse from '../../../src/application/dtos/parkingInfoResponse.dto'
import ParkingEntity from '../../../src/domain/entities/parking.entity'
import { ErrorCodes } from '../../../src/application/helpers/error.helper'

jest.mock('./../../../src/infrastructure/repositories/parking.repository')

describe('ParkingPaymentUsecase', () => {
  let parkingPaymentUsecase: ParkingPaymentUsecase
  let parkingRepository: jest.Mocked<IParkingRepository>

  beforeEach(() => {
    parkingRepository = new (<new () => ParkingRepository>(
      ParkingRepository
    ))() as jest.Mocked<ParkingRepository>
    parkingPaymentUsecase = new ParkingPaymentUsecase()
    parkingPaymentUsecase['parkingRepository'] = parkingRepository
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should update the parking record with paiyment and return ParkingInfoResponse', async () => {
    const mockId = '12345'

    const mockMappedResponse = new ParkingInfoResponse()
    const mockParkingEntity = new ParkingEntity()
    mockParkingEntity._id = mockId
    mockParkingEntity.paid = false

    parkingRepository.findById.mockResolvedValue(mockParkingEntity)
    parkingRepository.update.mockResolvedValue(mockParkingEntity)

    jest.mock('./../../../src/infrastructure/mappers/index.mapper', () => ({
      mapAsync: () => mockMappedResponse
    }))

    const result = await parkingPaymentUsecase.execute(mockId)

    expect(parkingRepository.update).toHaveBeenCalledWith(mockId, {
      paid: true
    })

    expect(result).toBeInstanceOf(ParkingInfoResponse)
  })

  it('should throw PARKING_RECORD_NOT_FOUND error when parking record does not exist', async () => {
    const mockId = 'nonexistent-id'

    parkingRepository.findById.mockImplementation()

    await expect(parkingPaymentUsecase.execute(mockId)).rejects.toMatchObject({
      name: ErrorCodes.PARKING_RECORD_NOT_FOUND,
      message: 'Parking record not found.',
      statusCode: 404
    })

    expect(parkingRepository.findById).toHaveBeenCalledWith(mockId)
    expect(parkingRepository.update).not.toHaveBeenCalled()
  })

  it('should throw PARKING_ALREADY_PAID error when parking fee has already been paid', async () => {
    const mockId = '12345'
    const paidParkingRecord = new ParkingEntity()
    paidParkingRecord._id = mockId
    paidParkingRecord.paid = true

    parkingRepository.findById.mockResolvedValue(paidParkingRecord)

    await expect(parkingPaymentUsecase.execute(mockId)).rejects.toMatchObject({
      name: ErrorCodes.PARKING_ALREADY_PAID,
      message: 'Parking fee has already been paid.',
      statusCode: 400
    })

    expect(parkingRepository.findById).toHaveBeenCalledWith(mockId)
    expect(parkingRepository.update).not.toHaveBeenCalled()
  })
})
