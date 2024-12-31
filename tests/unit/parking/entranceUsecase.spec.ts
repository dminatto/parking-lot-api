import { describe, it, expect } from '@jest/globals'
import ParkingEntranceUsecase from '../../../src/domain/usecases/parking/entrance/parkingEntrance.usecase'
import IParkingRepository from '../../../src/application/interfaces/repositories/parking.interface'
import ParkingRepository from '../../../src/infrastructure/repositories/parking.repository'
import ParkingCreateRequest from '../../../src/application/dtos/parkingCreateRequest.dto'
import ParkingCreateResponse from '../../../src/application/dtos/parkingCreateResponse.dto'
import ParkingEntity from '../../../src/domain/entities/parking.entity'

jest.mock('./../../../src/infrastructure/repositories/parking.repository')

describe('ParkingEntranceUsecase', () => {
  let parkingEntranceUsecase: ParkingEntranceUsecase
  let parkingRepository: jest.Mocked<IParkingRepository>

  beforeEach(() => {
    parkingRepository = new (<new () => ParkingRepository>(
      ParkingRepository
    ))() as jest.Mocked<ParkingRepository>
    parkingEntranceUsecase = new ParkingEntranceUsecase()
    parkingEntranceUsecase['parkingRepository'] = parkingRepository
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should create a parking record and return ParkingCreateResponse', async () => {
    const mockMappedResponse = new ParkingCreateResponse()
    const mockParkingEntity = new ParkingEntity()
    var mockNewParking: ParkingCreateRequest = {
      plate: 'AAA-6666'
    }

    parkingRepository.create.mockResolvedValue(mockParkingEntity)

    jest.mock('./../../../src/infrastructure/mappers/index.mapper', () => ({
      mapAsync: () => mockMappedResponse
    }))

    const result = await parkingEntranceUsecase.execute(mockNewParking)

    expect(parkingRepository.create).toHaveBeenCalledWith(mockNewParking)

    expect(result).toBeInstanceOf(ParkingCreateResponse)
  })
})
