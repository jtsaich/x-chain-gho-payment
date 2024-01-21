import React, { useState } from "react";
import { useContractRead } from "wagmi";

import { useRouter } from "next/router";
import { SoulFactory } from "@/config/contracts";
import CrearteSoul from "@/components/CrearteSoul";

const Stages = () => {
  const [name, setName] = useState("");
  const router = useRouter();
  const { data } = useContractRead({
    ...SoulFactory,
    functionName: "getSouls",
  });

  const dataToRender = data as any[];

  return (
    <div className="w-full p-4">
      <h2 className="text-3xl mb-4 font-bold">Create Soulbound Token</h2>

      <div className="flex flex-col gap-2">
        <div className="flex gap-3">
          <input
            type="text"
            className="input input-bordered"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <CrearteSoul name={name} />
        </div>
        <div className="flex">
          <div className="w-[100px] font-bold">stage</div>
          <div className="font-bold">address</div>
        </div>
        {dataToRender &&
          dataToRender.map((el) => (
            <div key={el.addr} className="flex">
              <div
                className="w-[100px] hover:text-sky-500 cursor-pointer"
                onClick={() =>
                  router.push(`/profile?name=${el.name}&address=${el.addr}`)
                }
              >
                {el.name}
              </div>
              <div>{el.addr}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Stages;
