import fetch from "cross-fetch";

export type Box = { id: BoxId; key?: BoxKey };
export type BoxKey = string;
export type BoxId = string;

export type Log = LogText | LogObject;
export type LogText = string;
export type LogObject = Record<string, any>;
export enum LogSeverity {
  debug = "debug",
  info = "info",
  warning = "warning",
  error = "error",
  fatal = "fatal",
}

export default class Client {
  private box: Box;

  constructor(box: Box) {
    this.box = box;
  }

  async log(data: Log) {
    const method = "POST";
    const headers = this.mountHeaders(data);
    const body = this.stringifyLog(data);

    return fetch(this.url, {
      headers,
      method,
      body,
    });
  }

  async debug(data: Log) {
    return this.logWithSeverity(data, LogSeverity.debug);
  }

  async info(data: Log) {
    return this.logWithSeverity(data, LogSeverity.info);
  }

  async warning(data: Log) {
    return this.logWithSeverity(data, LogSeverity.warning);
  }

  async error(data: Log) {
    return this.logWithSeverity(data, LogSeverity.error);
  }

  async fatal(data: Log) {
    return this.logWithSeverity(data, LogSeverity.fatal);
  }

  private async logWithSeverity(data: Log, severity: LogSeverity) {
    if (typeof data === "string") {
      return this.log({ severity, message: data });
    }

    return this.log({ ...data, severity });
  }

  private get url(): string {
    return `https://logre.io/api/boxes/${this.box.id}/logs`;
  }

  private mountHeaders(data: Log): RequestInit["headers"] {
    let headers = {};

    if (typeof data === "object") {
      headers = {
        "Content-Type": "application/json",
      };
    }

    if (this.box.key) {
      headers = {
        ...headers,
        authorization: this.box.key,
      };
    }

    return headers;
  }

  private stringifyLog(data: Log): string {
    if (typeof data === "object") {
      return JSON.stringify(data);
    }

    return data;
  }
}
