import { getStocks, TICKERS } from "../lib/stocks";

interface HomeProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ searchParams }: HomeProps) {
  if (searchParams["error"] === "true") {
    throw new Error("manual error");
  }
  const stockData = await getStocks(TICKERS);
  const sampleData = await fetch(
    "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&outputsize=full&apikey=demo"
  );

  console.log(stockData);

  return <div></div>;
}
