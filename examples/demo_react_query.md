# Sử dụng React Query để quản lý API calls: Từ Chaos đến Clean Code

## Giới thiệu

Bạn đã bao giờ viết một React component mà phải handle loading, error, caching, refetching... và cuối cùng code trở nên rối như mì spaghetti chưa? Mình cũng từng như vậy.

Vấn đề không phải bạn code dở. Vấn đề là việc quản lý server state trong React vốn dĩ phức tạp. Và đó là lý do React Query ra đời.

Bài viết này sẽ giúp bạn hiểu vì sao React Query giải quyết được vấn đề này, và cách áp dụng nó vào project thực tế.

## Vấn đề thực tế

Hãy xem một component fetch data "truyền thống":

```typescript
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchUser(userId)
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  return <UserCard user={user} />;
}
```

Code này có vẻ ổn, nhưng thiếu nhiều thứ quan trọng:

- **Không có caching**: Mỗi lần mount lại fetch mới
- **Không có deduplication**: 10 components cùng fetch = 10 requests
- **Không có background refetch**: Data cũ mãi mãi
- **Không có retry**: Network fail = user thấy error
- **Race conditions**: userId thay đổi nhanh = bug

Và khi bạn thêm tất cả những thứ đó, component sẽ phình to gấp 3-4 lần.

## Cách tiếp cận

React Query giải quyết vấn đề bằng cách tách biệt hai loại state. Client state là những thứ như UI state và form inputs - synchronous và bạn own nó hoàn toàn. Server state là data từ API - asynchronous và server own nó, cần caching và sync.

Thay vì tự quản lý server state với useState và useEffect, bạn chỉ cần khai báo "tôi cần data này" và React Query lo phần còn lại.

Vì sao approach này tốt hơn?

1. **Declarative**: Bạn nói cần gì, không phải làm như thế nào
2. **Automatic caching**: Không cần viết cache logic
3. **Smart refetching**: Tự biết khi nào cần fetch lại
4. **DevTools**: Debug dễ dàng

## Ví dụ triển khai

### Setup cơ bản

```typescript
// main.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}
```

### Fetch data với useQuery

```typescript
function UserProfile({ userId }: { userId: string }) {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  return <UserCard user={user} />;
}
```

So sánh với code ban đầu: từ 15 dòng xuống còn 8 dòng. Và bạn được thêm caching, retry, deduplication miễn phí.

### Mutation với useMutation

```typescript
function UpdateUserForm({ userId }: { userId: string }) {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (data: UpdateUserData) => updateUser(userId, data),
    onSuccess: () => {
      // Invalidate cache để fetch data mới
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
    },
  });

  const handleSubmit = (data: UpdateUserData) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button disabled={mutation.isPending}>
        {mutation.isPending ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
}
```

### Optimistic Updates

Khi bạn muốn UI update ngay lập tức, không đợi server:

```typescript
const mutation = useMutation({
  mutationFn: updateUser,
  onMutate: async (newData) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: ['user', userId] });
    
    // Snapshot previous value
    const previousUser = queryClient.getQueryData(['user', userId]);
    
    // Optimistically update
    queryClient.setQueryData(['user', userId], newData);
    
    return { previousUser };
  },
  onError: (err, newData, context) => {
    // Rollback on error
    queryClient.setQueryData(['user', userId], context?.previousUser);
  },
});
```

## Kết luận

React Query không chỉ là một library để fetch data. Nó thay đổi cách bạn nghĩ về server state trong React.

**Những điểm quan trọng cần nhớ:**

Hãy tách biệt client state và server state trong ứng dụng của bạn. Khai báo data bạn cần thay vì viết code để lấy nó. Caching và sync sẽ được React Query handle tự động cho bạn. Kết quả là code ít hơn và bugs cũng ít hơn.

**Những điều bạn nên làm tiếp theo:**

Đầu tiên, cài đặt package với lệnh `npm install @tanstack/react-query`. Sau đó wrap app của bạn với QueryClientProvider. Tiếp theo, thay thế các useEffect kết hợp useState bằng useQuery. Cuối cùng, cài React Query DevTools để debug dễ dàng hơn.

Nếu bạn đang dùng Redux chỉ để cache API data, hãy thử React Query. Bạn sẽ ngạc nhiên vì code clean hơn bao nhiêu.
