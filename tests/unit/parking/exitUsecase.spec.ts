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
    const mockMappedResponse = new ParkingInfoResponse()
    const mockParkingEntity = new ParkingEntity()

    parkingRepository.update.mockResolvedValue(mockParkingEntity)

    const mockId = '12345'

    jest.mock('./../../../src/infrastructure/mappers/index.mapper', () => ({
      mapAsync: () => mockMappedResponse
    }))

    const result = await parkingExitUsecase.execute(mockId)

    expect(parkingRepository.update).toHaveBeenCalledWith(mockId, {
      exitDate: expect.any(Date)
    })

    expect(result).toBeInstanceOf(ParkingInfoResponse)
  })
})
