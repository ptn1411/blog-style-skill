# Xây dựng Real-time App với WebSocket: Từ Zero đến Production

## Giới thiệu

Bạn đã bao giờ tự hỏi tại sao chat app của mình cứ phải refresh mới thấy tin nhắn mới? Hoặc dashboard analytics cứ phải F5 liên tục để cập nhật số liệu?

Vấn đề nằm ở HTTP - giao thức request-response truyền thống. Client phải chủ động hỏi server mới có data. WebSocket giải quyết điều này bằng cách tạo kết nối hai chiều, server có thể push data xuống client bất cứ lúc nào.

Bài này mình sẽ chia sẻ cách build real-time features với WebSocket. Không chỉ là code, mà còn là những bài học từ production.

## Vấn đề thực tế

### Polling - Cách làm cũ

Trước WebSocket, chúng ta thường dùng polling. Cứ mỗi vài giây, client gửi request hỏi server có gì mới không.

```javascript
// Polling approach - không hiệu quả
setInterval(async () => {
  const response = await fetch('/api/messages');
  const messages = await response.json();
  updateUI(messages);
}, 3000);
```

Vấn đề với polling:
- Tốn bandwidth vì request liên tục
- Delay từ 0 đến N giây (N là interval)
- Server phải handle nhiều request không cần thiết

### Long Polling - Cải tiến nhưng chưa đủ

Long polling giữ connection mở cho đến khi có data mới. Tốt hơn polling nhưng vẫn có overhead của HTTP headers mỗi lần reconnect.

Với real-time chat hay live dashboard, bạn cần giải pháp tốt hơn.

## Cách tiếp cận

### Tại sao chọn WebSocket?

WebSocket tạo persistent connection giữa client và server. Sau handshake ban đầu, cả hai bên có thể gửi data bất cứ lúc nào mà không cần request-response cycle.

Ưu điểm chính:
- Latency thấp - data đến ngay lập tức
- Tiết kiệm bandwidth - không có HTTP headers mỗi message
- Bi-directional - server push data chủ động

### Khi nào nên dùng WebSocket?

WebSocket phù hợp cho:
- Chat applications
- Live notifications
- Real-time dashboards
- Collaborative editing
- Gaming

Không cần WebSocket cho:
- CRUD operations thông thường
- Data ít thay đổi
- One-time requests

## Ví dụ triển khai

### Server với Node.js

```typescript
import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

// Store connected clients
const clients = new Set<WebSocket>();

wss.on('connection', (ws: WebSocket) => {
  clients.add(ws);
  console.log('Client connected. Total:', clients.size);

  ws.on('message', (data: Buffer) => {
    const message = JSON.parse(data.toString());
    
    // Broadcast to all clients
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  });

  ws.on('close', () => {
    clients.delete(ws);
    console.log('Client disconnected. Total:', clients.size);
  });
});
```

### Client với React

```typescript
import { useEffect, useState, useCallback } from 'react';

function useWebSocket(url: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(url);
    
    socket.onopen = () => {
      console.log('Connected to WebSocket');
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages(prev => [...prev, message]);
    };

    socket.onclose = () => {
      console.log('Disconnected from WebSocket');
    };

    setWs(socket);

    return () => socket.close();
  }, [url]);

  const sendMessage = useCallback((content: string) => {
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ content, timestamp: Date.now() }));
    }
  }, [ws]);

  return { messages, sendMessage };
}
```

### Xử lý Reconnection

Production app cần handle reconnection khi mất kết nối:

```typescript
function createReconnectingWebSocket(url: string) {
  let ws: WebSocket;
  let reconnectAttempts = 0;
  const maxAttempts = 5;

  function connect() {
    ws = new WebSocket(url);

    ws.onopen = () => {
      reconnectAttempts = 0;
      console.log('Connected');
    };

    ws.onclose = () => {
      if (reconnectAttempts < maxAttempts) {
        const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000);
        setTimeout(connect, delay);
        reconnectAttempts++;
      }
    };
  }

  connect();
  return ws;
}
```

Exponential backoff giúp tránh overwhelm server khi nhiều clients cùng reconnect.

## Kết luận

WebSocket là công cụ mạnh cho real-time features. Nhưng không phải lúc nào cũng cần dùng.

Những điểm cần nhớ:
- Dùng WebSocket khi cần real-time, bi-directional communication
- Implement reconnection logic cho production
- Consider scaling với Redis pub/sub khi có nhiều server instances

Bước tiếp theo: thử build một chat app đơn giản với code examples trên. Bạn sẽ hiểu rõ hơn khi tự tay implement.
