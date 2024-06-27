export const ORDERBOOK_MESSAGE = JSON.stringify({
  event: "subscribe",
  channel: "book",
  symbol: "tBTCUSD",
  freq: "F1",
});

export const ORDERBOOK_CONF = JSON.stringify({
  event: "conf",
  flags: 536870912,
});
