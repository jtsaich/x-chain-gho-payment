import { ERC721_Factory_ADDRESS } from "@/config/contracts";
import { useErc721FactorySetupNftCollection } from "@/generated";
import React, { useEffect, useState } from "react";
import { numberToHex, parseAbiItem, parseEther, toBytes, toHex, zeroHash } from "viem";
import { CreateNFTCollectionEventLog } from "./NFTCollections";
import { usePublicClient } from "wagmi";

const CreateNFTCollection: React.FC = () => {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [maxSupply, setMaxSupply] = useState("");

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

  const { write } = useErc721FactorySetupNftCollection({
    address: ERC721_Factory_ADDRESS,
  })

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    if (!logs) return;

    write({
      args: [name, symbol, parseEther(salePrice), BigInt(maxSupply), toHex(toBytes(logs.length, { size: 32}))]
    })
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-3xl mb-4 font-bold">Create Your NFT Collection</h2>
      <div className="w-full max-w-screen-sm">
        <form onSubmit={handleSubmit}>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Name:</span>
            </div>
            <div className="relative w-full">
              <input
                type="text"
                className="input input-bordered w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Symbol:</span>
            </div>
            <div className="relative w-full">
              <input
                type="text"
                className="input input-bordered w-full"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
              />
            </div>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Sale Price:</span>
            </div>
            <div className="relative w-full">
              <input
                type="text"
                className="input input-bordered w-full"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
              />
            </div>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Max Supply:</span>
            </div>
            <div className="relative w-full">
              <input
                type="text"
                className="input input-bordered w-full"
                value={maxSupply}
                onChange={(e) => setMaxSupply(e.target.value)}
              />
            </div>
          </label>

          <button type="submit" className="btn btn-primary mt-4 shadow-solid">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateNFTCollection;
