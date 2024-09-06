import { defineStore } from "pinia";
import { web3Client } from "../app";
import { useWalletStore } from "./wallet";
import { usdtToken } from "../app/data/tokens";

interface StoreState {
  denomBalanceMap: Record<string, { balance: string; allowance: string }>;
  account: string | null;
}

export const useAccountStore = defineStore("account", {
  state: (): StoreState => ({
    denomBalanceMap: {},
    account: null,
  }),
  actions: {
    async fetchBalanceAndAllowance() {
      const walletStore = useWalletStore();

      if (!walletStore.address) {
        return;
      }

      const { balance, allowance } =
        await web3Client.fetchTokenBalanceAndAllowance({
          address: walletStore.address,
          contractAddress: usdtToken.denom.replace("peggy", ""),
        });

      this.denomBalanceMap[usdtToken.denom] = {
        balance,
        allowance,
      };
    },
  },
});
