import { APIData } from "@/lib/types";
import React from "react";
import StockCard from "./ui/stockCard";

type Props = {
  data: APIData[];
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function Picker({ data }: Props) {
  console.log(data);
  await delay(100);
  return (
    <div className="grid grid-cols-5 gap-4 m-8">
      {data.map((stockData, i) => (
        <StockCard data={stockData} key={Math.random() * 100000} />
      ))}
    </div>
  );
}

export default Picker;
