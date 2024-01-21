import NFTCard from "@/components/NFTCard";
import { ERC721_ADDRESS } from "@/config/contracts";
import {
  useErc721MintNft,
  useErc721Name,
  useErc721SalePrice,
} from "@/generated";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Log, hexToNumber, parseAbiItem, parseEther, zeroAddress } from "viem";
import { Address, useAccount, usePublicClient } from "wagmi";

interface TransferEvent {
  from: string;
  to: string;
  tokens: BigInt;
}

interface TransferEventLog extends Log {
  args: TransferEvent;
}

const CollectionPage = () => {
  const router = useRouter();
  const { address: nftAddress } = router.query;

  const client = usePublicClient();
  const [mintNFTLogs, setMintNFTLogs] = useState<TransferEventLog[]>();

  useEffect(() => {
    const getLogs = async () => {
      const logs = await client.getLogs({
        address: nftAddress as Address,
        event: parseAbiItem(
          "event Transfer(address indexed from, address indexed to, uint256 tokens)"
        ),
        args: {
          from: zeroAddress,
        },
        fromBlock: BigInt(5122652),
      });
      setMintNFTLogs(logs as TransferEventLog[]);
    };
    if (client && nftAddress) {
      getLogs();
    }
  }, [client, nftAddress]);

  const { address: walletAddress } = useAccount();

  const { data: name } = useErc721Name({
    address: nftAddress as Address,
  });

  const { data: salePrice } = useErc721SalePrice({
    address: nftAddress as Address,
  });

  const { write } = useErc721MintNft({
    address: nftAddress as Address,
    value: salePrice,
    args: walletAddress ? [walletAddress] : undefined,
  });

  // Fetch NFT collection data based on the address

  // Render the NFT collection in a grid view

  const handleMint = () => {
    // Handle minting logic here
    write();
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl">{name}</h2>

      <ul className="flex flex-row gap-8">
        {mintNFTLogs?.map((log) => {
          const { logIndex, topics } = log;
          const [, from, to, tokens] = topics;
          // {hexToNumber(tokens!)}

          return (
            <NFTCard
              key={logIndex}
              address={nftAddress as Address}
              tokenId={hexToNumber(tokens!)}
            />
          );
        })}
      </ul>

      <button className="btn btn-primary" onClick={handleMint}>
        Mint
      </button>
    </div>
  );
};

export default CollectionPage;
