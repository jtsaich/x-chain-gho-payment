import { ERC721_Factory_ADDRESS } from "@/config/contracts";
import { concatAddress } from "@/helpers";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Log, parseAbiItem } from "viem";
import { usePublicClient } from "wagmi";

export interface CreateNFTCollectionEvent {
  creator: string;
  collection: string;
}

export interface CreateNFTCollectionEventLog extends Log {
  args: CreateNFTCollectionEvent;
}

const NFTCollections = () => {
  const client = usePublicClient();
  const [logs, setLogs] = useState<CreateNFTCollectionEventLog[]>();

  useEffect(() => {
    const getLogs = async () => {
      const logs = await client.getLogs({
        address: ERC721_Factory_ADDRESS,
        event: parseAbiItem(
          "event CreateNFTCollection(address creator, address collection)"
        ),
        fromBlock: BigInt(5122652),
      });
      setLogs(logs as CreateNFTCollectionEventLog[]);
    };
    if (client) {
      getLogs();
    }
  }, [client]);

  return (
    <div className="w-full p-4">
      <h2 className="text-3xl mb-4 font-bold">NFT Collections</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Collection</th>
              <th>Creator</th>
            </tr>
          </thead>
          <tbody>
            {logs?.map((log) => {
              const { logIndex, args } = log;

              return (
                <tr key={logIndex}>
                  <td>
                    <Link
                      href={`/collections/${args.collection}`}
                      className="link"
                    >
                      {concatAddress(args.collection)}
                    </Link>
                  </td>
                  <td>{concatAddress(args.creator)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NFTCollections;
9;
