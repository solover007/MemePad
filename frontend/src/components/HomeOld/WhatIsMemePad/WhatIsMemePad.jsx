import WhatIsMemePadLeft from "./WhatIsMemePadLeft";
import WhatIsMemePadRight from "./WhatIsMemePadRight";

const WhatIsMemePad = () => {
  return (
    <div className="flex h-fit lg:h-[768px] rounded-tl-3xl overflow-hidden">
      <WhatIsMemePadLeft />
      <WhatIsMemePadRight />
    </div>
  );
};
export default WhatIsMemePad;
