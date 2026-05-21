import { Coin, multiCoinService, supportedCoins } from "./multi-coin";

export { supportedCoins, type Coin };

/**
 * Compatibility wrapper kept for older imports from the live feature branch.
 * New code should use multiCoinService directly.
 */
export const multiCoinEngine = {
  async transfer(senderId: number, recipientId: number, coin: Coin, amount: number, type = "transfer") {
    return multiCoinService.transfer({ user: { id: senderId } }, coin, amount, recipientId, type);
  },

  async getBalances(userId: number) {
    return multiCoinService.getBalances(userId);
  },

  async swap(senderId: number, fromCoin: Coin, toCoin: Coin, amount: number, slippage = 0.5) {
    return multiCoinService.swap({ user: { id: senderId } }, fromCoin, toCoin, amount, slippage);
  },
};
