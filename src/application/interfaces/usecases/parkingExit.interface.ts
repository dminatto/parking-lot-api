interface IParkingExitUsecase {
  execute: (id: number) => Promise<boolean>
}

export default IParkingExitUsecase
