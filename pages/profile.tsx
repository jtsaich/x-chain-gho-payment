import { useState, useRef } from "react";

import Avatar from "@/components/Avatar";
import { useSearchParams } from "next/navigation";

const profile = () => {
  const searchParams = useSearchParams();
  const address = searchParams.get("address");
  const name = searchParams.get("name");

  return (
    <div className="flex justify-center">
      <div className="w-[960px] py-12">
        <div className="w-[296px]">
          <Avatar />
          <p className="text-3xl">{name}</p>
          <p className="text-lg w-[296px] text-ellipsis overflow-hidden">
            {address}
          </p>
        </div>
      </div>
    </div>
  );
};

export default profile;
