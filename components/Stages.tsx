import React from "react";
import { useContractRead } from "wagmi";

import { useRouter } from "next/router";
import { SoulFactory } from "@/config/contracts";

const Stages = () => {
  const router = useRouter();
  const { data, isLoading, refetch } = useContractRead({
    ...SoulFactory,
    functionName: "getSouls",
  });

  console.log(isLoading, data);

  return (
    <div>
      <h2>Souls</h2>
      {isLoading ? (
        <></>
      ) : (
        <div className="flex flex-col gap-2">
          {data &&
            data.map((el) => (
              <div key={el.addr} className="flex">
                <div
                  className="w-[100px] cursor-pointer"
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
      )}
    </div>
  );
};

export default Stages;
