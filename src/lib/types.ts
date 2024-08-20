export interface TimeSeriesDataPoint {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface MetaData {
  information: string;
  symbol: string;
  lastRefreshed: string;
  interval: string;
  outputSize: string;
  timeZone: string;
}

export interface TimeSeries {
  time: string;
  data: TimeSeriesDataPoint;
}

export interface APIData {
  metaData: MetaData;
  timeSeries: TimeSeries[];
}
