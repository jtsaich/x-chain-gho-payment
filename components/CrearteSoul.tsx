import React from "react";
import { useContractRead, useContractWrite } from "wagmi";

import { SoulFactory } from "@/config/contracts";

interface CrearteSoulProps {
  name: string;
}

const CrearteSoul = ({ name: _stageName }: CrearteSoulProps) => {
  const { writeAsync } = useContractWrite({
    ...SoulFactory,
    functionName: "createSoul",
  });

  const { refetch } = useContractRead({
    ...SoulFactory,
    functionName: "getSouls",
  });

  const createSoul = async () => {
    if (_stageName === "") return;

    try {
      await writeAsync({ args: [_stageName] });
      refetch();
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  return (
    <button
      className="px-4 py-1 bg-sky-500/75 hover:bg-sky-500/50 rounded-lg"
      onClick={createSoul}
    >
      Create soul
    </button>
  );
};

export default CrearteSoul;
