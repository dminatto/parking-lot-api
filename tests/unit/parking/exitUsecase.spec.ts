import { describe, it, expect } from '@jest/globals'
import ParkingEntity from './../../../src/domain/entities/parking.entity'
import ParkingExitUsecase from './../../../src/domain/usecases/parking/exit/parkingExit.usecase'
import IParkingRepository from './../../../src/application/interfaces/repositories/parking.interface'
import ParkingRepository from './../../../src/infrastructure/repositories/parking.repository'
import ParkingInfoResponse from './../../../src/application/dtos/parkingInfoResponse.dto'
import mapper from './../../../src/infrastructure/mappers/index.mapper'
import { Dictionary, Mapper } from '@automapper/core'

jest.mock('./../../../src/infrastructure/repositories/parking.repository')

describe('ParkingExitUsecase', () => {
  let parkingExitUsecase: ParkingExitUsecase
  let parkingRepository: jest.Mocked<IParkingRepository>

  beforeEach(() => {
    parkingRepository = new (<new () => ParkingRepository>(
      ParkingRepository
    ))() as jest.Mocked<ParkingRepository>
    parkingExitUsecase = new ParkingExitUsecase()
    parkingExitUsecase['parkingRepository'] = parkingRepository
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should update the parking record with exit date and return ParkingInfoResponse', async () => {
    const mockId = '12345'
    const mockMappedResponse = new ParkingInfoResponse()
    const mockParkingEntity = new ParkingEntity()
    mockParkingEntity._id = mockId
    mockParkingEntity.paid = true

    parkingRepository.findById.mockResolvedValue(mockParkingEntity)
    parkingRepository.update.mockResolvedValue(mockParkingEntity)

    jest.mock('./../../../src/infrastructure/mappers/index.mapper', () => ({
      mapAsync: () => mockMappedResponse
    }))

    const result = await parkingExitUsecase.execute(mockId)

    expect(parkingRepository.update).toHaveBeenCalledWith(mockId, {
      exitDate: expect.any(Date)
    })

    expect(result).toBeInstanceOf(ParkingInfoResponse)
  })

  it('should throw PARKING_NOT_PAID error when parking fee has not been paid', async () => {
    const mockId = '123456'
    const unpaidParkingRecord = new ParkingEntity()
    unpaidParkingRecord._id = mockId
    unpaidParkingRecord.paid = false

    parkingRepository.findById.mockResolvedValue(unpaidParkingRecord)

    await expect(parkingExitUsecase.execute(mockId)).rejects.toMatchObject({
      name: 'PARKING_NOT_PAID',
      message: 'Parking fee has not been paid.',
      statusCode: 402
    })

    expect(parkingRepository.findById).toHaveBeenCalledWith(mockId)
    expect(parkingRepository.update).not.toHaveBeenCalled()
  })

  it('should throw PARKING_RECORD_NOT_FOUND error when parking record does not exist', async () => {
    const mockId = 'nonexistent-id'

    parkingRepository.findById.mockImplementation()

    await expect(parkingExitUsecase.execute(mockId)).rejects.toMatchObject({
      name: 'PARKING_RECORD_NOT_FOUND',
      message: 'Parking record not found.',
      statusCode: 404
    })

    expect(parkingRepository.findById).toHaveBeenCalledWith(mockId)
    expect(parkingRepository.update).not.toHaveBeenCalled()
  })
})
