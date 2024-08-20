import "server-only";
const ALPHA_API_KEY = process.env.ALPHA_API_KEY;

export const TICKERS = [
  "NVDA",
  "TSLA",
  "AMD",
  "AAPL",
  "MSFT",
  "META",
  "AMZN",
  "SMCI",
  "AVGO",
  "PANW",
  "GOOG",
  "NFLX",
  "LLY",
  "V",
  "PLTR",
  "MU",
  "MCD",
  "XOM",
  "ASTS",
  "CRWD",
];

export async function getStocks(tickers: string[]) {
  const stockDataArray = await Promise.all(
    tickers.map(async (ticker) => {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=${ALPHA_API_KEY}`,
        { next: { revalidate: 86400 } }
      );
      const data = await response.json();
      return {
        symbol: ticker,
        data,
      };
    })
  );

  return stockDataArray;
}
