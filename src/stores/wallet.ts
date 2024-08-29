import { defineStore } from "pinia";
import { EventBus, WalletConnectStatus } from "../types";
import {
  isCosmosBrowserWallet,
  isEthWallet,
  Wallet,
} from "@injectivelabs/wallet-ts";
import { StatusType } from "@injectivelabs/utils";
import {
  getDefaultSubaccountId,
  getEthereumAddress,
  getInjectiveAddress,
  Msgs,
} from "@injectivelabs/sdk-ts";
import { isMetamaskInstalled, validateMetamask } from "../app/wallet/metamask";
import {
  confirmCorrectKeplrAddress,
  validateCosmosWallet,
} from "../app/wallet/cosmos";
import { getAddresses, walletStrategy } from "../app/wallet/walletStrategy";
import { useEventBus } from "@vueuse/core";
import { msgBroadcaster } from "../app/wallet/walletService";

type WalletStoreState = {
  walletConnectStatus: WalletConnectStatus;
  address: string;
  injectiveAddress: string;
  addressConfirmation: string;
  session: string;
  addresses: string[];
  hwAddresses: string[];
  bitGetInstalled: boolean;
  phantomInstalled: boolean;
  metamaskInstalled: boolean;
  okxWalletInstalled: boolean;
  trustWalletInstalled: boolean;
  wallet: Wallet;
  queueStatus: StatusType;
};

const initialStateFactory = (): WalletStoreState => ({
  walletConnectStatus: WalletConnectStatus.Idle,
  address: "",
  injectiveAddress: "",
  addressConfirmation: "",
  session: "",
  addresses: [],
  hwAddresses: [],
  wallet: Wallet.Metamask,
  bitGetInstalled: false,
  phantomInstalled: false,
  metamaskInstalled: false,
  okxWalletInstalled: false,
  trustWalletInstalled: false,
  queueStatus: StatusType.Idle,
});

export const useWalletStore = defineStore("wallet-inj", {
  state: () => initialStateFactory(),
  getters: {
    isUserConnected: (state) => {
      const addressConnectedAndConfirmed =
        !!state.address && !!state.addressConfirmation && !!state.session;
      const hasAddresses = state.addresses.length > 0;

      const isConnected =
        state.walletConnectStatus !== WalletConnectStatus.Connecting &&
        hasAddresses &&
        addressConnectedAndConfirmed &&
        !!state.injectiveAddress;

      return isConnected;
    },

    defaultSubaccountId: (state) => {
      if (!state.injectiveAddress) {
        return undefined;
      }

      return getDefaultSubaccountId(state.injectiveAddress);
    },
  },
  actions: {
    async validate() {
      const walletStore = useWalletStore();

      if (walletStore.wallet === Wallet.Metamask) {
        await validateMetamask(walletStore.address);
      }

      if (isCosmosBrowserWallet(walletStore.wallet)) {
        await validateCosmosWallet({
          wallet: walletStore.wallet,
          address: walletStore.injectiveAddress,
        });
      }

      // if (walletStore.wallet === Wallet.TrustWallet) {
      //   await validateTrustWallet(walletStore.address);
      // }

      // if (walletStore.wallet === Wallet.OkxWallet) {
      //   await validateOkxWallet(walletStore.address);
      // }

      // if (walletStore.wallet === Wallet.BitGet) {
      //   await validateBitGet(walletStore.address);
      // }

      // if (walletStore.wallet === Wallet.Phantom) {
      //   await validatePhantom(walletStore.address);
      // }
    },

    queue() {
      const walletStore = useWalletStore();

      if (walletStore.queueStatus === StatusType.Loading) {
        throw new Error("You have a pending transaction.");
      } else {
        walletStore.$patch({
          queueStatus: StatusType.Loading,
        });
      }
    },

    async validateAndQueue() {
      const walletStore = useWalletStore();

      await walletStore.validate();

      walletStore.queue();
    },

    async init() {
      const walletStore = useWalletStore();

      walletStrategy.setWallet(walletStore.wallet);
    },

    onConnect() {
      const walletStore = useWalletStore();

      walletStore.$patch({
        walletConnectStatus: WalletConnectStatus.Connected,
      });

      useEventBus(EventBus.WalletConnected).emit();
    },

    async checkIsMetamaskInstalled() {
      const walletStore = useWalletStore();

      walletStore.$patch({
        metamaskInstalled: await isMetamaskInstalled(),
      });
    },

    async connectWallet(
      wallet: Wallet,
      options?: { privateKey: string; isAutoSign: boolean }
    ) {
      const walletStore = useWalletStore();

      await walletStrategy.disconnect();
      await walletStrategy.setWallet(wallet);

      if (options?.privateKey) {
        walletStrategy.setOptions({ privateKey: options.privateKey });
      }

      if (!options?.isAutoSign && wallet !== Wallet.PrivateKey) {
        walletStore.$patch({
          walletConnectStatus: WalletConnectStatus.Connecting,
          wallet,
        });
      }
    },

    async getHWAddresses(wallet: Wallet) {
      const walletStore = useWalletStore();

      if (
        walletStore.hwAddresses.length === 0 ||
        walletStore.wallet !== wallet
      ) {
        walletStrategy.disconnect();
        walletStrategy.setWallet(wallet);

        walletStore.$patch({
          wallet,
        });

        const addresses = await getAddresses();

        const injectiveAddresses = isEthWallet(wallet)
          ? addresses.map(getInjectiveAddress)
          : addresses;

        walletStore.$patch({
          hwAddresses: injectiveAddresses,
        });
      } else {
        const addresses = await getAddresses();
        const injectiveAddresses = isEthWallet(wallet)
          ? addresses.map(getInjectiveAddress)
          : addresses;

        walletStore.$patch({
          hwAddresses: [...walletStore.hwAddresses, ...injectiveAddresses],
        });
      }
    },

    async connectKeplr() {
      const walletStore = useWalletStore();

      await walletStore.connectWallet(Wallet.Keplr);

      const injectiveAddresses = await getAddresses();
      const [injectiveAddress] = injectiveAddresses;
      const session = await walletStrategy.getSessionOrConfirm();

      await confirmCorrectKeplrAddress(injectiveAddress);

      walletStore.$patch({
        injectiveAddress,
        addresses: injectiveAddresses,
        address: getEthereumAddress(injectiveAddress),
        addressConfirmation: await walletStrategy.getSessionOrConfirm(
          injectiveAddress
        ),
        session,
      });

      walletStore.onConnect();
    },

    async connectMetamask() {
      const walletStore = useWalletStore();

      await walletStore.connectWallet(Wallet.Metamask);

      const addresses = await getAddresses();
      const [address] = addresses;
      const session = await walletStrategy.getSessionOrConfirm(address);

      walletStore.$patch({
        addresses,
        address,
        injectiveAddress: getInjectiveAddress(address),
        addressConfirmation: await walletStrategy.getSessionOrConfirm(address),
        session,
      });

      await walletStore.onConnect();
    },

    async prepareBroadcastMessages(messages: Msgs | Msgs[], memo?: string) {
      const walletStore = useWalletStore();
      const msgs = Array.isArray(messages) ? messages : [messages];

      if (!walletStore.isUserConnected) {
        return;
      }

      const broadcastOptions = {
        msgs,
        injectiveAddress: walletStore.injectiveAddress,
        memo,
      };

      return broadcastOptions;
    },

    async broadcastMessages(messages: Msgs | Msgs[], memo?: string) {
      const walletStore = useWalletStore();
      const broadcastOptions = await walletStore.prepareBroadcastMessages(
        messages,
        memo
      );

      if (!broadcastOptions) {
        return;
      }

      const response = await msgBroadcaster.broadcast(broadcastOptions);

      return response;
    },

    async logout() {
      const walletStore = useWalletStore();

      await walletStrategy.disconnect();

      walletStore.$patch({
        ...initialStateFactory(),
        queueStatus: StatusType.Idle,
        bitGetInstalled: walletStore.bitGetInstalled,
        phantomInstalled: walletStore.phantomInstalled,
        metamaskInstalled: walletStore.metamaskInstalled,
        okxWalletInstalled: walletStore.okxWalletInstalled,
        walletConnectStatus: WalletConnectStatus.Disconnected,
        trustWalletInstalled: walletStore.trustWalletInstalled,
      });
    },
  },
});
