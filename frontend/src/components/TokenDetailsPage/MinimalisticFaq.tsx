/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState } from "react";

import Icons from "../../components/Icons";

import "./Token.Module.css";

const items = [
  {
    title: "A question people usually ask?",
    content:
      "Nunc non blandit massa enim nec dui nunc mattis enim. Etiam sit amet nisl purus. Duis convallis convallis tellus id. Ultricies integer quis auctor elit sed vulputate mi sit.",
  },
  {
    title: "A question people usually ask?",
    content:
      "Nunc non blandit massa enim nec dui nunc mattis enim. Etiam sit amet nisl purus. Duis convallis convallis tellus id. Ultricies integer quis auctor elit sed vulputate mi sit.",
  },
  {
    title: "A question people usually ask?",
    content:
      "Nunc non blandit massa enim nec dui nunc mattis enim. Etiam sit amet nisl purus. Duis convallis convallis tellus id. Ultricies integer quis auctor elit sed vulputate mi sit.",
  },
  {
    title: "A question people usually ask?",
    content:
      "Nunc non blandit massa enim nec dui nunc mattis enim. Etiam sit amet nisl purus. Duis convallis convallis tellus id. Ultricies integer quis auctor elit sed vulputate mi sit.",
  },
];

type props = {
  items: {
    title: string;
    content: string;
  }[];
};

export default function MinimalisticFaq({ items }: props) {
  const [activeIndex, setActiveIndex] = useState(null);

  const onItemClick = (index: any) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="shadow bg-white">
      {/* Content */}
      <div className="text-white w-full flex items-center justify-center">
        <div className=" z-20">
          <h3 className="font-broad text-4xl text-center py-6 border-b-2 border-dotted border-[#e0dcdc] text-[#452BC0]">
            FAQS
          </h3>
          <div className="flex flex-col gap-5 px-4 py-4 pb-10">
            {items?.map((item, index) => (
              <div
                key={index}
                className="faq-box flex items-center gap-4 relative pb-4 border-b border-[#e0dcdc]"
              >
                <div className="w-[calc(100%-86px)]">
                  <div
                    className="p-4 cursor-pointer transition-all text-[#202020]"
                    onClick={() => onItemClick(index)}
                  >
                    <span className="text-[20px] text-stroke-1-black">{`${
                      index + 1
                    }. ${item.title}`}</span>
                  </div>
                  <div
                    className={`overflow-hidden px-4 text-black transition-all ${
                      index === activeIndex ? "max-h-[500px]" : "max-h-0"
                    }`}
                  >
                    {item.content}
                  </div>
                </div>

                <div
                  className={`absolute right-0 border border-black rounded-full w-[62px] flex justify-center cursor-pointer transition-all ${
                    index === activeIndex
                      ? "h-[90%] items-end mt-4 pb-4"
                      : "h-[62px] items-center"
                  }`}
                  onClick={() => onItemClick(index)}
                >
                  {index === activeIndex ? (
                    <Icons.ArrowUp />
                  ) : (
                    <Icons.ArrowDown />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
