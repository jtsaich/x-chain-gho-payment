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

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2">
        <div className="flex justify-end px-4 py-5 gap-3">
          <input
            type="text"
            className="bg-gray-500 px-4 py-2 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <CrearteSoul name={name} />
        </div>
        <div className="flex">
          <div className="w-[100px] font-bold">stage</div>
          <div className="font-bold">address</div>
        </div>
        {data &&
          data.map((el) => (
            <div key={el.addr} className="flex">
              <div
                className="w-[100px] hover:text-sky-500 cursor-pointer"
                onClick={() =>
                  router.push(`/profile?name=${el.name}&address=${el.addr}}`)
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
