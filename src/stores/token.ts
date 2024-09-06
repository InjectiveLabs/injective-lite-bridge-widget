import { defineStore } from "pinia";
import { tokenPriceService } from "../app/service";
import { injErc20Token, injToken, usdtToken } from "../app/data/tokens";

export const useTokenStore = defineStore("token", {
  state: () => ({
    tokens: [injToken, injErc20Token, usdtToken],
    tokenUsdPriceMap: {},
  }),
  actions: {
    async fetchTokenUsdPriceMap(coinGeckoIdList: string[]) {
      const tokenStore = useTokenStore();

      const tokenUsdPriceMap = {
        ...tokenStore.tokenUsdPriceMap,
        ...(await tokenPriceService.fetchUsdTokensPrice(coinGeckoIdList)),
      };

      tokenStore.$patch({
        tokenUsdPriceMap,
      });
    },
  },
});
