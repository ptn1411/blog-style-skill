# API Design Patterns: Những Nguyên tắc Giúp API Dễ Dùng và Dễ Maintain

## Giới thiệu

API là cầu nối giữa frontend và backend, giữa service này với service khác. Một API được thiết kế tốt giúp team làm việc hiệu quả hơn. Ngược lại, API tệ tạo ra technical debt và frustration cho cả người build lẫn người dùng.

Mình đã từng maintain những API mà mỗi lần đọc docs là một lần đau đầu. Endpoint naming không nhất quán, response format thay đổi tùy hứng, error handling mỗi nơi một kiểu.

Bài này chia sẻ những patterns giúp thiết kế API rõ ràng và dễ maintain hơn.

## Vấn đề thực tế

### Inconsistent Naming

Đây là ví dụ về API naming không nhất quán:

```
GET /getUsers
GET /user/list
GET /fetch-all-users
POST /createNewUser
POST /user/add
```

Người dùng API phải đoán xem endpoint nào làm gì. Không có pattern rõ ràng để follow.

### Response Format Không Thống Nhất

```json
// Endpoint A
{ "data": [...], "total": 100 }

// Endpoint B
{ "users": [...], "count": 100 }

// Endpoint C
{ "result": { "items": [...], "pagination": {...} } }
```

Frontend phải viết logic khác nhau cho mỗi endpoint. Maintenance nightmare.

### Error Handling Mỗi Nơi Một Kiểu

```json
// Endpoint A
{ "error": "User not found" }

// Endpoint B
{ "message": "Not found", "code": 404 }

// Endpoint C
{ "errors": [{ "field": "email", "message": "Invalid" }] }
```

Client code phải handle nhiều format khác nhau. Dễ miss edge cases.

## Cách tiếp cận

### RESTful Resource Naming

Dùng nouns cho resources, HTTP methods cho actions:

```
GET    /users          # List users
GET    /users/:id      # Get single user
POST   /users          # Create user
PUT    /users/:id      # Update user
DELETE /users/:id      # Delete user
```

Nested resources cho relationships:

```
GET /users/:id/orders     # User's orders
GET /orders/:id/items     # Order's items
```

### Consistent Response Envelope

Định nghĩa một response format và dùng cho tất cả endpoints:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: ApiError | null;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}
```

Mọi response đều có cùng structure. Client code đơn giản hơn nhiều.

### Standardized Error Codes

Định nghĩa error codes có ý nghĩa:

```typescript
const ErrorCodes = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  RATE_LIMITED: 'RATE_LIMITED',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const;
```

Client có thể handle errors dựa trên code, không phải parse message string.

## Ví dụ triển khai

### Response Helper Functions

```typescript
// utils/response.ts
export function successResponse<T>(data: T, meta?: object): ApiResponse<T> {
  return {
    success: true,
    data,
    error: null,
    meta,
  };
}

export function errorResponse(
  code: string,
  message: string,
  details?: Record<string, string[]>
): ApiResponse<null> {
  return {
    success: false,
    data: null,
    error: { code, message, details },
  };
}

export function paginatedResponse<T>(
  items: T[],
  page: number,
  limit: number,
  total: number
): ApiResponse<T[]> {
  return {
    success: true,
    data: items,
    error: null,
    meta: { page, limit, total },
  };
}
```

### Controller Implementation

```typescript
// controllers/users.ts
import { successResponse, errorResponse, paginatedResponse } from '../utils/response';

export async function getUsers(req: Request, res: Response) {
  const { page = 1, limit = 20 } = req.query;
  
  const users = await userService.findAll({ page, limit });
  const total = await userService.count();

  return res.json(paginatedResponse(users, page, limit, total));
}

export async function getUser(req: Request, res: Response) {
  const user = await userService.findById(req.params.id);

  if (!user) {
    return res.status(404).json(
      errorResponse('NOT_FOUND', 'User not found')
    );
  }

  return res.json(successResponse(user));
}

export async function createUser(req: Request, res: Response) {
  const validation = validateUserInput(req.body);
  
  if (!validation.valid) {
    return res.status(400).json(
      errorResponse('VALIDATION_ERROR', 'Invalid input', validation.errors)
    );
  }

  const user = await userService.create(req.body);
  return res.status(201).json(successResponse(user));
}
```

### Client-side Usage

```typescript
// Client code trở nên đơn giản
async function fetchUsers(): Promise<User[]> {
  const response = await api.get<ApiResponse<User[]>>('/users');
  
  if (!response.data.success) {
    throw new ApiError(response.data.error);
  }
  
  return response.data.data;
}
```

Một function handle tất cả API calls. Không cần logic riêng cho từng endpoint.

## Kết luận

API design tốt không phải về việc dùng công nghệ mới nhất. Nó về consistency và predictability.

Những nguyên tắc cơ bản:
- RESTful naming với nouns và HTTP methods
- Consistent response envelope cho tất cả endpoints
- Standardized error codes thay vì error messages

Khi bắt đầu project mới, hãy định nghĩa API conventions trước. Document rõ ràng và enforce trong code review. Team sẽ cảm ơn bạn sau này.
