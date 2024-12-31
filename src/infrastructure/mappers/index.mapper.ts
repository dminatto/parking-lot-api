import { createMapper, addProfile } from '@automapper/core'
import { classes } from '@automapper/classes'
import ParkingProfile from './profiles/parking.profile'
import ParkingCreateResponseProfile from './profiles/parkingCreateResponse.profile'
import ParkingListResponseProfile from './profiles/parkingListResponse.profile'

const mapper = createMapper({
  strategyInitializer: classes()
})

addProfile(mapper, ParkingProfile)
addProfile(mapper, ParkingCreateResponseProfile)
addProfile(mapper, ParkingListResponseProfile)

export default mapper
