const ButtonRow = () => {
  return (
    <div className="flex gap-4 items-center justify-center">
      <button className="btn-shadow font-bold px-3 py-1 text-white bg-[#6922FF]">
        Doxx
      </button>
      <button className="btn-shadow font-bold px-3 py-1 text-white bg-[#8B5CF6]">
        BASED
      </button>
      <button className="btn-shadow font-bold px-3 py-1 text-white bg-[#8432ED]">
        Audit
      </button>
      <button className="btn-shadow font-bold px-3 py-1 text-white bg-[#194AA6]">
        KYC
      </button>
    </div>
  );
};
export default ButtonRow;
