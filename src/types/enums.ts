export enum WalletConnectStatus {
  Idle = "Idle",
  Connected = "Connected",
  Connecting = "Connecting",
  Disconnected = "Disconnected",
}

export enum EventBus {
  WalletConnected = "wallet-connected",
  SubaccountChange = "subaccount-change",
}
