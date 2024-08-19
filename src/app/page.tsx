import { getStocks, TICKERS } from "../lib/stocks";

interface HomeProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ searchParams }: HomeProps) {
  if (searchParams["error"] === "true") {
    throw new Error("manual error");
  }
  const stockData = await getStocks(TICKERS);
  console.log(stockData);

  return <div></div>;
}
