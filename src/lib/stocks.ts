import "server-only";
import { APIData, TimeSeriesDataPoint } from "./types";
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
  if (process.env.NODE_ENV === "development") {
    const sampleData = await fetch(
      "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&outputsize=full&apikey=demo"
    );
    const sampleDataJSON = await sampleData.json();
    const processedData = transformAPIData(sampleDataJSON);
    const processedDataArray = Array(20).fill(processedData);
    return processedDataArray;
  } else {
    const stockDataArray = await Promise.all(
      tickers.map(async (ticker) => {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=${ALPHA_API_KEY}`,
          { cache: "force-cache" }
        );
        const data = await response.json();
        return transformAPIData(data);
      })
    );

    return stockDataArray;
  }
}

export function transformAPIData(data: any): APIData {
  return {
    metaData: {
      information: data["Meta Data"]["1. Information"],
      symbol: data["Meta Data"]["2. Symbol"],
      lastRefreshed: data["Meta Data"]["3. Last Refreshed"],
      interval: data["Meta Data"]["4. Interval"],
      outputSize: data["Meta Data"]["5. Output Size"],
      timeZone: data["Meta Data"]["6. Time Zone"],
    },
    timeSeries: Object.entries(data["Time Series (5min)"]).map(
      ([time, details]: [string, any]) => ({
        time,
        data: {
          open: parseFloat(details["1. open"]),
          high: parseFloat(details["2. high"]),
          low: parseFloat(details["3. low"]),
          close: parseFloat(details["4. close"]),
          volume: parseInt(details["5. volume"], 10),
        } as TimeSeriesDataPoint,
      })
    ),
  };
}
