import Picker from "@/components/picker";
import { getStocks, TICKERS, transformAPIData } from "../lib/stocks";
import { Suspense } from "react";
import LoadingSkeleton from "@/components/loadingSkeleton";

export default async function Home() {
  const stockData = await getStocks(TICKERS);

  return (
    <div className="text-center m-8">
      <h1 className="text-xl">Click A Stock For More Information</h1>
      <Suspense fallback={<LoadingSkeleton />}>
        <Picker data={stockData} />
      </Suspense>
    </div>
  );
}
