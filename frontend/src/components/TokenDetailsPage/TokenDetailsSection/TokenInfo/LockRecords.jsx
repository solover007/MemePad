const LockRecords = ({symbol}) => {
  return (
    <div className="shadow my-7 pt-6 bg-white">
      <h1 className="font-broad text-3xl text-stroke-1-[#452BC0] text-center pb-4 border-b-2 border-dotted border-[#e0dcdc] text-[#452BC0]">
        LoCK RECORDS
      </h1>
      <div className="overflow-x-auto mx-4 py-6">
        <table className="table rounded-none font-bold bg-[#F0F0F0]">
          {/* head */}
          <thead>
            <tr className="font-bold text-base">
              <th className="text-black border-r border-[#dedcf0]">Title</th>
              <th className="text-black border-r border-[#dedcf0]">
                Amount ({symbol})
              </th>
              <th className="text-black border-r border-[#e4e2f2]">
                Unlock date
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr className="border-b border-[#e4e2f2]">
              <td>Marketing & CEX</td>
              <td>926,100,000</td>
              <td>2024.06.01 19:00</td>
              <td className="text-[#DE9CFD]">View</td>
            </tr>
            {/* row 2 */}
            <tr className="border-b border-[#e4e2f2]">
              <th>Staking Protocol</th>
              <td>525,000,000</td>
              <td>2024.06.01 19:00</td>
              <td className="text-[#DE9CFD]">View</td>
            </tr>
            {/* row 3 */}
            <tr className="border-b border-[#e4e2f2]">
              <th>Fire wallet</th>
              <td>441,000,000</td>
              <td>2024.06.01 19:00</td>
              <td className="text-[#DE9CFD]">View</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default LockRecords;
