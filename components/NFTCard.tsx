import {
  GhoToken_ADDRESS,
  TradeWithERC20Token_ADDRESS,
} from "@/config/contracts";
import {
  useErc20Approve,
  useErc721Approve,
  useErc721OwnerOf,
  useErc721TokenUri,
  useTradeWithErc20TokenBuy,
  useTradeWithErc20TokenListings,
  useTradeWithErc20TokenSell,
} from "@/generated";
import React, { useState } from "react";
import { Address, parseUnits } from "viem";
import { useAccount, useWaitForTransaction } from "wagmi";

type NFTCardProps = {
  address: Address;
  tokenId: number;
};

const NFTCard = ({ address, tokenId }: NFTCardProps) => {
  const { address: walletAddress } = useAccount();
  const [buyInitiated, setBuyInitiated] = useState(false);
  const [buyApproved, setBuyApproved] = useState(false);

  const [sellInitiated, setSellInitiated] = useState(false);
  const [sellApproved, setSellApproved] = useState(false);
  const [sellPrice, setSellPrice] = useState("");

  // read
  const { data: listing } = useTradeWithErc20TokenListings({
    address: TradeWithERC20Token_ADDRESS,
    args: [address, BigInt(tokenId)],
  });

  const { data: tokenOwnerAddress, refetch: refetchOwner } = useErc721OwnerOf({
    address,
    args: [BigInt(tokenId)],
  });

  const { data: tokenUri } = useErc721TokenUri({
    address,
    args: [BigInt(tokenId)],
  });

  // write
  const { write: approveSpend, data: approveSpendTx } = useErc20Approve({
    address: listing ? listing?.[2] : undefined,
    args: listing ? [TradeWithERC20Token_ADDRESS, listing?.[1]] : undefined,
    onError(error) {
      setBuyInitiated(false);
    },
  });

  const { write: buy, data: buyTx } = useTradeWithErc20TokenBuy({
    address: TradeWithERC20Token_ADDRESS,
    args: [address, BigInt(tokenId)],
    onError(error) {
      setBuyInitiated(false);
    },
  });

  const { write: approveSelling, data: approveTx } = useErc721Approve({
    address,
    args: [TradeWithERC20Token_ADDRESS, BigInt(tokenId)],
    onError(error) {
      setSellInitiated(false);
    },
  });

  const { write: sell, data: sellTx } = useTradeWithErc20TokenSell({
    address: TradeWithERC20Token_ADDRESS,
    args: [
      address,
      BigInt(tokenId),
      parseUnits(sellPrice, 18), // hard-coded. can fetch from erc20 contract
      GhoToken_ADDRESS,
    ],
    onError(error) {
      setSellInitiated(false);
    },
  });

  // wait for transactions
  useWaitForTransaction({
    hash: approveSpendTx?.hash,
    onSuccess(data) {
      setBuyApproved(true);
      buy();
    },
  });

  useWaitForTransaction({
    hash: buyTx?.hash,
    onSuccess(data) {
      refetchOwner();

      setBuyApproved(false);
      setBuyInitiated(false);
    },
  });

  useWaitForTransaction({
    hash: approveTx?.hash,
    onSuccess(data) {
      setSellApproved(true);
      setSellInitiated(false);
    },
  });

  useWaitForTransaction({
    hash: sellTx?.hash,
    onSuccess(data) {
      refetchOwner();

      setSellApproved(false);
      setSellInitiated(false);
    },
  });

  const showBuyButton = () => {
    if (!tokenOwnerAddress) {
      return false;
    }
    return tokenOwnerAddress === TradeWithERC20Token_ADDRESS;
  };

  const showSellButton = () => {
    if (!tokenOwnerAddress) {
      return false;
    }
    return tokenOwnerAddress === walletAddress;
  };

  const onBuyClick = () => {
    setBuyInitiated(true);

    if (!buyApproved) {
      approveSpend();
    } else {
      buy();
    }
  };

  const onSellClick = () => {
    setSellInitiated(true);

    if (!sellApproved) {
      approveSelling();
    } else {
      sell();
    }
  };

  return (
    <li className="card border-solid border-black border-4 shadow-solid flex flex-col w-56 gap-2 p-4 justify-between">
      <div className="flex flex-col gap-2">
        <div className="font-semibold">Token #{tokenId}</div>
        <div>
          <img src="/gho.svg" alt="NFT" className="mx-auto" />
        </div>
      </div>

      {showBuyButton() &&
        (!buyApproved ? (
          <button
            className="btn btn-primary w-full shadow-solid"
            disabled={buyInitiated}
            onClick={onBuyClick}
          >
            {buyInitiated ? (
              <>
                <span className="loading loading-spinner"></span>
                approving
              </>
            ) : (
              "Buy"
            )}
          </button>
        ) : (
          <button
            className="btn btn-primary w-full shadow-solid"
            disabled={buyInitiated}
            onClick={onBuyClick}
          >
            {buyInitiated ? (
              <>
                <span className="loading loading-spinner"></span>
                loading
              </>
            ) : (
              "Buy"
            )}
          </button>
        ))}
      {showSellButton() &&
        (!sellApproved ? (
          <button
            className="btn btn-secondary w-full shadow-solid"
            disabled={sellInitiated}
            onClick={onSellClick}
          >
            {sellInitiated ? (
              <>
                <span className="loading loading-spinner"></span>
                approving
              </>
            ) : (
              "Sell"
            )}
          </button>
        ) : (
          <div>
            <input
              type="text"
              className="input input-bordered w-full mb-2"
              placeholder="Sell Price in GHO"
              value={sellPrice}
              onChange={(e) => setSellPrice(e.target.value)}
            />
            <button
              className="btn btn-secondary w-full shadow-solid"
              disabled={sellInitiated}
              onClick={onSellClick}
            >
              {sellInitiated ? (
                <>
                  <span className="loading loading-spinner"></span>
                  loading
                </>
              ) : (
                "Sell"
              )}
            </button>
          </div>
        ))}
    </li>
  );
};

export default NFTCard;
