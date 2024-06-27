import { DimensionValue } from "react-native";

export type InitialData = [
  number, // CHANNEL_ID
  Snapshot // SNAPSHOT
];

type Snapshot = Book[];

export type Book = [
  number, // PRICE
  number, // COUNT
  number // AMOUNT
];

export type FormattedBook = {
  bids: LineItem[];
  asks: LineItem[];
};

export type LineItem = {
  price: string;
  order: number;
  volume: string;
  percent: DimensionValue;
};
