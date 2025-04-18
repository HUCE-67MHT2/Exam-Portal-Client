import { Injectable } from '@angular/core';
import { Client, CompatClient, Stomp, IMessage, StompSubscription } from '@stomp/stompjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

// Interface message
export interface NotificationMessage {
  type: 'WARNING' | 'FORCE_SUBMIT' | 'INFO' | 'ERROR';
  message: string;
  payload?: any;
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private stompClient: CompatClient | null = null;
  private connectionState = new BehaviorSubject<boolean>(false);
  private messageSubject = new BehaviorSubject<NotificationMessage | null>(null);
  private subscription: StompSubscription | null = null;
  authToken = localStorage.getItem('authToken');

  public connectionState$: Observable<boolean> = this.connectionState.asObservable();
  public message$: Observable<NotificationMessage> = this.messageSubject.asObservable().pipe(
    filter((msg): msg is NotificationMessage => msg !== null)
  );

  constructor() {}

  connect(authToken?: string): void {
    if (this.isConnected()) {
      console.log('WebSocket already connected.');
      return;
    }
    console.log('Initiating WebSocket connection (native)...');

    const socketUrl = 'ws://localhost:8081/ws';
    console.log('Attempting to connect to:', socketUrl);

    try {
      // Thay đổi cách tạo stompClient sử dụng factory function
      this.stompClient = Stomp.over(() => {
        const socket = new WebSocket(socketUrl);
        socket.onopen = () => console.log('WebSocket connection opened');
        socket.onerror = (error) => console.error('WebSocket Error:', error);
        socket.onclose = (event) => console.log(`WebSocket closed: code=${event.code}, reason=${event.reason || 'No reason provided'}`);
        return socket;
      });

      // Optional: Bật debug log để xem chi tiết stomp frames
      this.stompClient.debug = (str) => { console.log('STOMP DEBUG:', str); };

      const token = localStorage.getItem('authToken');
      const headers = {
        'Origin': 'http://localhost:4200'
      };
      if (authToken) {
        // @ts-ignore
        headers['Authorization'] = `Bearer ${authToken}`;
      }

      console.log('Connecting STOMP over WebSocket...');
      this.stompClient.connect(
        headers,  // Truyền headers chứa token
        (frame: any) => {
          console.log('WebSocket and STOMP Connected:', frame); // Log rõ hơn
          this.connectionState.next(true);

          this.subscription = this.stompClient!.subscribe('/user/queue/notifications', (message: IMessage) => {
            console.log('Received message:', message.body);
            try {
              const parsedMessage: NotificationMessage = JSON.parse(message.body);
              this.messageSubject.next(parsedMessage);
            } catch (e) {
              console.error("Could not parse WebSocket message:", message.body, e);
              this.messageSubject.next({ type: 'ERROR', message: 'Received invalid message format' });
            }
          });

          console.log('Subscribed to /user/queue/notifications');
        },
        (error: any) => {
          // Log chi tiết lỗi STOMP connect
          console.error('STOMP Connection Error:', error);
          this.connectionState.next(false);
        },
        (closeEvent: any) => { // Đây là close của STOMP client
          console.log('STOMP Connection Closed:', closeEvent);
          this.connectionState.next(false);
          this.stompClient = null; // Quan trọng: đặt lại client khi đóng
        }
      );


    } catch (e) {
      console.error("Error creating WebSocket:", e); // Bắt lỗi nếu new WebSocket() thất bại
      this.connectionState.next(false);
    }
  }

  disconnect(): void {
    if (this.stompClient && this.stompClient.connected) {
      if (this.subscription) {
        this.subscription.unsubscribe();
        console.log('Unsubscribed from /user/queue/notifications');
        this.subscription = null;
      }
      this.stompClient.disconnect(() => {
        console.log('WebSocket Disconnected');
        this.connectionState.next(false);
        this.stompClient = null;
      });
    } else {
      console.log('WebSocket not connected or already disconnecting.');
    }
  }

  isConnected(): boolean {
    return this.stompClient?.connected ?? false;
  }

  sendMessage(destination: string, body: any): void {
    if (this.isConnected() && this.stompClient) {
      this.stompClient.publish({ destination: destination, body: JSON.stringify(body) });
    } else {
      console.error('Cannot send message, WebSocket is not connected.');
    }
  }
}
