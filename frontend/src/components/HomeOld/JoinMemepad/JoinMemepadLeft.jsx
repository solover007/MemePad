import TwoBox from "@/public/icons/JoinMemepadIcons/TwoBox";
import joinMemepadImg from "@/public/images/JoinMemepad.png"

const JoinMemepadLeft = () => {
    return(
        <div className="relative flex-1 rounded-tl-3xl rounded-bl-3xl bg-[#09080F]">

            <div className="flex justify-end items-center mr-6 py-10">
            <img className="w-[450px]" src={joinMemepadImg} alt="join memepad img" />
            </div>
             <TwoBox/>
        </div>
    )}
export default JoinMemepadLeft;