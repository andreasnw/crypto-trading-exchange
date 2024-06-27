export type InitialData = [
  number, // CHANNEL_ID
  Snapshot // SNAPSHOT
];

type Snapshot = Candle[];

export type Candle = [
  number, // MTS (timestamp)
  number, // OPEN
  number, // CLOSE
  number, // HIGH
  number, // LOW
  number // VOLUME
];

export type UpdateData = [
  number, // CHANNEL_ID
  Candle // CANDLE
];

export type FormattedCandle = {
  timestamp: number;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
};
