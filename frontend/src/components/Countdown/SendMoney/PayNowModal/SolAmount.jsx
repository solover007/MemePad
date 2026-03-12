/* eslint-disable react/prop-types */
// import solana logo
import logo from "@/public/images/solana-logo-round-black.png"

const SolAmount = ({amount, handleSolAmount, solSelected}) => {
    return(
       <button onClick={()=> handleSolAmount(amount)} className={`flex items-center justify-center border-2 w-full border-pink ${solSelected === amount && "bg-pink"}`}>
         <div className="flex items-center justify-center gap-2 w-20 h-16  md:w-[120px] md:h-[75px]">
             <img className="w-[18px] h-[18px]" src={logo} alt="solana pay now modal logo" />
             <p className="text-[21px] text-black font-extrabold">{amount}</p>
        </div>
       </button>
    )}
export default SolAmount;