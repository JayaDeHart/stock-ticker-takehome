import Picker from "@/components/picker";
import { getStocks, TICKERS, transformAPIData } from "../lib/stocks";
import { Suspense } from "react";
import LoadingSkeleton from "@/components/loadingSkeleton";

export default async function Home() {
  // const stockData = await getStocks(TICKERS);
  const sampleData = await fetch(
    "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&outputsize=full&apikey=demo"
  );

  const sampleDataJSON = await sampleData.json();
  const processedData = transformAPIData(sampleDataJSON);

  return (
    <div className="text-center m-8">
      <h1 className="text-xl">Click A Stock For More Information</h1>
      <Suspense fallback={<LoadingSkeleton />}>
        <Picker
          data={[
            processedData,
            processedData,
            processedData,
            processedData,
            processedData,
            processedData,
            processedData,
            processedData,
            processedData,
            processedData,
            processedData,
            processedData,
            processedData,
            processedData,
            processedData,
            processedData,
            processedData,
            processedData,
            processedData,
            processedData,
          ]}
        />
      </Suspense>
    </div>
  );
}
