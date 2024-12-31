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
import mapper from '../../../src/infrastructure/mappers/index.mapper'
import { ErrorCodes } from '../../../src/application/helpers/error.helper'

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

  it('should successfully return a list of parking records', async () => {
    const plate = 'ABC-1234'
    const page = 1
    const limit = 10

    const mockParkingEntities: ParkingEntity[] = [
      new ParkingEntity(),
      new ParkingEntity()
    ]
    mockParkingEntities[0]._id = '1'
    mockParkingEntities[0].plate = 'ABC-1234'
    mockParkingEntities[1]._id = '2'
    mockParkingEntities[1].plate = 'ABC-1234'

    const mockParkingInfoResponses: ParkingInfoResponse[] = [
      new ParkingInfoResponse(),
      new ParkingInfoResponse()
    ]
    mockParkingInfoResponses[0].id = '1'
    mockParkingInfoResponses[0].plate = 'ABC-1234'
    mockParkingInfoResponses[0].paid = false
    mockParkingInfoResponses[0].left = false
    mockParkingInfoResponses[1].id = '2'
    mockParkingInfoResponses[1].plate = 'ABC-1234'
    mockParkingInfoResponses[1].paid = false
    mockParkingInfoResponses[1].left = false

    parkingRepository.list.mockResolvedValue(mockParkingEntities)

    jest.mock('./../../../src/infrastructure/mappers/index.mapper', () => ({
      mapArrayAsync: () => mockParkingInfoResponses
    }))

    const result = await parkingListUsecase.execute(plate, page, limit)

    expect(parkingRepository.list).toHaveBeenCalledWith(plate, page, limit)
    expect(result).toBeInstanceOf(ParkingListResponse)
    expect(result.page).toBe(page)
  })

  it('should throw PARKING_RECORD_NOT_FOUND error when no records are found', async () => {
    const plate = 'XYZ-9999'
    const page = 1
    const limit = 10

    parkingRepository.list.mockImplementation()

    await expect(
      parkingListUsecase.execute(plate, page, limit)
    ).rejects.toMatchObject({
      name: ErrorCodes.PARKING_RECORD_NOT_FOUND,
      message: 'Parking records not found.',
      statusCode: 404
    })

    expect(parkingRepository.list).toHaveBeenCalledWith(plate, page, limit)
  })
})
