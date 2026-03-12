/* eslint-disable react/prop-types */
import { PieChart, Pie, Tooltip, Cell } from "recharts";

import "./Token.Module.css";

const data = [
  {
    name: "KOLS",
    value: 5,
  },
  {
    name: "MARKETING",
    value: 15,
  },
  {
    name: "EARLY COMMUNITY INVESTORS",
    value: 2,
  },
  {
    name: "ECOSYSTEM REWARDS",
    value: 14.5,
  },
  {
    name: "STRATEGIC",
    value: 12.5,
  },
  {
    name: "DEVELOPMENT",
    value: 9,
  },
  {
    name: "OUR LAUNCHPAD",
    value: 4,
  },
  {
    name: "AIRDROP",
    value: 6,
  },
  {
    name: "PUBLIC",
    value: 4,
  },
  {
    name: "DEX LIQUIDITY",
    value: 8,
  },
  {
    name: "TEAM",
    value: 12,
  },
  {
    name: "CEX LIQUIDITY",
    value: 8,
  },
];

const COLORS = [
  "#DFB4FB",
  "#95E4D6",
  "#B3F9CF",
  "#FCE894",
  "#D187FF",
  "#A0CEF9",
  "#FAE4A4",
  "#F49BCC",
  "#D1E395",
  "#A5E1E9",
  "#F6C4DB",
  "#FFBA94",
];

const RADIAN = Math.PI / 181;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 1.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <>
      <text
        x={x}
        y={y}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        <tspan
          x={x}
          style={{ color: "black" }}
          className="label-name text-xs font-bold text-black"
        >
          {(percent * 100).toFixed(0)}%
        </tspan>

        <tspan x={x} dy="1.2em" className="font-broad text-xs text-[#CECECE]">
          {data[index].name}
        </tspan>
      </text>
    </>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>{payload[0].value}</p>
        {/* <p className="intro">{getIntroOfPage(label)}</p> */}
        <p className="desc">{payload[0].name}</p>
      </div>
    );
  }

  return null;
};

const Chart = () => {
  return (
    <div className="shadow bg-white mt-8">
      {/* header */}
      <div>
        <h1 className="font-broad text-center text-3xl py-5 border-b-2 border-dotted border-[#e0dcdc] text-[#452BC0]">
          ToKENOMIC
        </h1>
      </div>
      <div className="flex justify-center items-center -my-24 md:-my-0">
        <PieChart width={800} height={450}>
          <Pie
            data={data}
            innerRadius={100}
            outerRadius={150}
            labelLine={false}
            label={renderCustomizedLabel}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </div>
    </div>
  );
};
export default Chart;
