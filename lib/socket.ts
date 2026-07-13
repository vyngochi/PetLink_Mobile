import { useAuthStore } from "@/features/authentication/shared/stores/auth.store";
import { io, Socket } from "socket.io-client";

// Strip /api from baseURL if it exists, because Socket.IO interprets it as a namespace
const rawBaseURL = process.env.EXPO_PUBLIC_BASE_URL || "http://localhost:5500";
const socketURL = rawBaseURL.replace(/\/api\/?$/, "");

class SocketService {
  public socket: Socket | null = null;

  connect() {
    if (this.socket?.connected) return;

    const token = useAuthStore.getState().accessToken;
    if (!token) {
      console.warn("Socket connection failed: No access token");
      return;
    }

    this.socket = io(socketURL, {
      auth: {
        token,
      },
      transports: ["websocket"],
    });

    this.socket.on("connect", () => {
      console.log("[Socket] Connected:", this.socket?.id);
    });

    this.socket.on("disconnect", (reason) => {
      console.log("[Socket] Disconnected:", reason);
    });

    this.socket.on("connect_error", (error) => {
      console.error("[Socket] Connection Error:", error);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Helper method to emit events safely
  emit(event: string, data?: any) {
    if (!this.socket?.connected) {
      console.warn(`[Socket] Cannot emit ${event}: Socket not connected`);
      return;
    }
    this.socket.emit(event, data);
  }

  // Helper method to listen to events
  on(event: string, callback: (...args: any[]) => void) {
    if (!this.socket) {
      // Connect automatically if attempting to listen but no socket exists
      this.connect();
    }
    this.socket?.on(event, callback);
  }

  // Helper method to remove listeners
  off(event: string, callback?: (...args: any[]) => void) {
    this.socket?.off(event, callback);
  }
}

export const socketService = new SocketService();
