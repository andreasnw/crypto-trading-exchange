export type WebsocketMessage = {
  data: string;
  isTrusted: false;
};

export type HeartBeat = [
  number, // CHANNEL_ID
  "hb"
];

export type EventInfo = {
  chanId: number;
  channel: string;
  event: string;
  key: string;
};

export type EventSubscribe = {
  event: string;
  platform: { status: number };
  serverId: string;
  version: number;
};

export enum ResponseDataType {
  HEARTBEAT = "heartbeat",
  EVENT_INFO = "event_info",
  EVENT_SUBSCRIBE = "event_subscribe",
  INITIAL = "initial",
  UPDATE = "update",
}
