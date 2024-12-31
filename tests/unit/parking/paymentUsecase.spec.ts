import { describe, it, expect } from '@jest/globals'
import IParkingRepository from '../../../src/application/interfaces/repositories/parking.interface'
import ParkingRepository from '../../../src/infrastructure/repositories/parking.repository'
import ParkingPaymentUsecase from '../../../src/domain/usecases/parking/payment/parkingPayment.usecase'
import ParkingInfoResponse from '../../../src/application/dtos/parkingInfoResponse.dto'
import ParkingEntity from '../../../src/domain/entities/parking.entity'

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
    const mockMappedResponse = new ParkingInfoResponse()
    const mockParkingEntity = new ParkingEntity()

    parkingRepository.update.mockResolvedValue(mockParkingEntity)

    const mockId = '12345'

    jest.mock('./../../../src/infrastructure/mappers/index.mapper', () => ({
      mapAsync: () => mockMappedResponse
    }))

    const result = await parkingPaymentUsecase.execute(mockId)

    expect(parkingRepository.update).toHaveBeenCalledWith(mockId, {
      paid: true
    })

    expect(result).toBeInstanceOf(ParkingInfoResponse)
  })
})
