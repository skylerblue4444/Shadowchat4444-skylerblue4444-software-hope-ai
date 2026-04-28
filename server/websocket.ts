import { Server as HTTPServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import type { IncomingMessage } from "http";

interface ClientMessage {
  type: "subscribe" | "unsubscribe" | "ping";
  channel: string;
  data?: unknown;
}

interface ServerMessage {
  type: "price_update" | "portfolio_update" | "social_update" | "notification" | "pong";
  channel: string;
  data: unknown;
  timestamp: number;
}

class RealtimeServer {
  private wss: WebSocketServer;
  private clients: Map<string, Set<WebSocket>> = new Map();
  private priceSimulation: NodeJS.Timeout | null = null;

  constructor(server: HTTPServer) {
    this.wss = new WebSocketServer({ server, path: "/ws" });
    this.setupConnections();
    this.startPriceSimulation();
  }

  private setupConnections() {
    this.wss.on("connection", (ws: WebSocket) => {
      const clientId = `${Date.now()}-${Math.random()}`;
      console.log(`[WebSocket] Client ${clientId} connected`);

      ws.on("message", (message: string) => {
        try {
          const msg: ClientMessage = JSON.parse(message);
          this.handleMessage(ws, msg, clientId);
        } catch (error) {
          console.error("[WebSocket] Message parse error:", error);
          ws.send(JSON.stringify({ type: "error", message: "Invalid message format" }));
        }
      });

      ws.on("close", () => {
        console.log(`[WebSocket] Client ${clientId} disconnected`);
        this.removeClientFromChannels(ws);
      });

      ws.on("error", (error: Error) => {
        console.error(`[WebSocket] Client ${clientId} error:`, error);
      });
    });
  }

  private handleMessage(ws: WebSocket, msg: ClientMessage, clientId: string) {
    switch (msg.type) {
      case "subscribe":
        this.subscribe(ws, msg.channel);
        console.log(`[WebSocket] Client ${clientId} subscribed to ${msg.channel}`);
        break;
      case "unsubscribe":
        this.unsubscribe(ws, msg.channel);
        console.log(`[WebSocket] Client ${clientId} unsubscribed from ${msg.channel}`);
        break;
      case "ping":
        ws.send(JSON.stringify({ type: "pong", timestamp: Date.now() }));
        break;
      default:
        console.warn(`[WebSocket] Unknown message type: ${msg.type}`);
    }
  }

  private subscribe(ws: WebSocket, channel: string) {
    if (!this.clients.has(channel)) {
      this.clients.set(channel, new Set());
    }
    this.clients.get(channel)!.add(ws);

    // Send initial data
    this.sendInitialData(ws, channel);
  }

  private unsubscribe(ws: WebSocket, channel: string) {
    const subscribers = this.clients.get(channel);
    if (subscribers) {
      subscribers.delete(ws);
      if (subscribers.size === 0) {
        this.clients.delete(channel);
      }
    }
  }

  private removeClientFromChannels(ws: WebSocket) {
    this.clients.forEach((subscribers) => {
      subscribers.delete(ws);
    });
  }

  private sendInitialData(ws: WebSocket, channel: string) {
    if (channel.startsWith("price:")) {
      const symbol = channel.replace("price:", "");
      ws.send(
        JSON.stringify({
          type: "price_update",
          channel,
          data: {
            symbol,
            price: this.generatePrice(symbol),
            change24h: Math.random() * 10 - 5,
            timestamp: Date.now(),
          },
          timestamp: Date.now(),
        })
      );
    }
  }

  private startPriceSimulation() {
    this.priceSimulation = setInterval(() => {
      const priceUpdates = this.generatePriceUpdates();
      this.broadcast("price:*", {
        type: "price_update",
        channel: "price:*",
        data: priceUpdates,
        timestamp: Date.now(),
      });
    }, 1000);
  }

  private generatePriceUpdates() {
    return {
      BTC: {
        price: 67500 + (Math.random() - 0.5) * 500,
        change24h: 2.1 + (Math.random() - 0.5) * 0.5,
      },
      ETH: {
        price: 3500 + (Math.random() - 0.5) * 50,
        change24h: -1.3 + (Math.random() - 0.5) * 0.5,
      },
      SKY: {
        price: 0.045 + (Math.random() - 0.5) * 0.001,
        change24h: 5.2 + (Math.random() - 0.5) * 0.5,
      },
    };
  }

  private generatePrice(symbol: string): number {
    const prices: Record<string, number> = {
      BTC: 67500,
      ETH: 3500,
      SKY: 0.045,
    };
    return prices[symbol] || 0;
  }

  private broadcast(channel: string, message: ServerMessage) {
    const subscribers = this.clients.get(channel);
    if (subscribers) {
      const payload = JSON.stringify(message);
      subscribers.forEach((ws) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(payload);
        }
      });
    }
  }

  public broadcastToChannel(channel: string, data: unknown) {
    this.broadcast(channel, {
      type: "price_update",
      channel,
      data,
      timestamp: Date.now(),
    });
  }

  public shutdown() {
    if (this.priceSimulation) {
      clearInterval(this.priceSimulation);
    }
    this.wss.close();
  }
}

export { RealtimeServer, ClientMessage, ServerMessage };
