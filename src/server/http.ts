import * as http from 'http';
import express from 'express';
import dotenv from "dotenv";


export class HTTPServer {
  private readonly _port: string;
  private readonly _app: express.Application;
  private _httpServer?: http.Server;

  get app (): express.Application {
    return this._app;
  }

  get httpServer (): http.Server {
    return this._httpServer as http.Server;
  }

  constructor (port: string) {
    this._port = port;
    this._app = express();
    this._httpServer = http.createServer(this._app );
    dotenv.config();
  }

  async listen (): Promise<void> {
    return await new Promise((resolve, reject) => {
      this._app.listen(this._port, () => {
        console.log(`Server ${this._port} started`);
        return resolve();
      });
    });
  }

  async close (): Promise<void> {
    return await new Promise((resolve, reject) => {
      this._httpServer?.close(() => {
        console.log(`Server ${this._port} closed`);
        return resolve();
      });
    });
  }
}
