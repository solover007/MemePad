import TokenStatusCardOne from "./TokenStatusCardOne";
import TokenStatusCardTwo from "./TokenStatusCardTwo";
import AdminCard from "./AdminCard";

const TokenStatusCards = () => {
  return (
    <div className="col-span-4 lg:col-span-2 w-full">
      <TokenStatusCardOne />
      <TokenStatusCardTwo />
      <AdminCard />
    </div>
  );
};
export default TokenStatusCards;
