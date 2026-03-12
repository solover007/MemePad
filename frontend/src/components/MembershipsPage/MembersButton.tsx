"use client";

import { toast } from "react-toastify";

export default function MembersButton() {
  return (
    <button className="w-full my-6" onClick={() => toast("Coming soon!")}>
      {/* // TODO: use box shadow instead, hide on hover */}
      <div className="w-full bg-black rounded-lg py-2">
        <div className="font-broad box w-full text-[14px] 2xl:text-nowrap rounded-lg px-2 py-2 -mt-2 -ml-1 bg-[#A393FE] text-white group-hover:bg-white group-hover:text-[#452BC0] duration-150">
          BeCOME A MeMBER
        </div>
      </div>
    </button>
  );
}
