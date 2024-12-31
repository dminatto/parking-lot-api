import { describe, it, expect } from '@jest/globals'
import IParkingRepository from '../../../src/application/interfaces/repositories/parking.interface'
import ParkingListUsecase from '../../../src/domain/usecases/parking/list/parkingList.usecase'
import ParkingEntranceUsecase from '../../../src/domain/usecases/parking/entrance/parkingEntrance.usecase'
import ParkingRepository from '../../../src/infrastructure/repositories/parking.repository'
import ParkingCreateRequest from '../../../src/application/dtos/parkingCreateRequest.dto'
import ParkingCreateResponse from '../../../src/application/dtos/parkingCreateResponse.dto'
import ParkingListResponse from '../../../src/application/dtos/parkingListResponse.dto'
import ParkingEntity from '../../../src/domain/entities/parking.entity'
import parkingEntranceUsecase from '../../../src/domain/usecases/parking/entrance/parkingEntrance.usecase'
import ParkingInfoResponse from '../../../src/application/dtos/parkingInfoResponse.dto'

jest.mock('./../../../src/infrastructure/repositories/parking.repository')

describe('ParkingListUsecase', () => {
  let parkingListUsecase: ParkingListUsecase
  let parkingRepository: jest.Mocked<IParkingRepository>

  beforeEach(() => {
    parkingRepository = new (<new () => ParkingRepository>(
      ParkingRepository
    ))() as jest.Mocked<ParkingRepository>
    parkingListUsecase = new ParkingListUsecase()
    parkingListUsecase['parkingRepository'] = parkingRepository
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should list parking records and return ParkingListResponse', async () => {
    const mockMappedResponse = new ParkingInfoResponse()
    const mockParkingEntity = new ParkingEntity()
    const mockParkingListEntity = [mockParkingEntity]
    const plate = 'AAA-6666'

    parkingRepository.list.mockResolvedValue(mockParkingListEntity)

    jest.mock('./../../../src/infrastructure/mappers/index.mapper', () => ({
      mapArrayAsync: () => [mockMappedResponse]
    }))

    const result = await parkingListUsecase.execute(plate)

    expect(parkingRepository.list).toHaveBeenCalledWith(plate)

    expect(result).toBeInstanceOf(ParkingListResponse)
  })
})
