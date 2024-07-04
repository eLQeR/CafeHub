import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Clone the request headers and set a new header `x-hello-from-middleware1`
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-hello-from-middleware1', 'hello');
  const userToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIwNTIyNTQ1LCJpYXQiOjE3MTk5MTc3NDUsImp0aSI6IjVkM2I2NmJhNzE2YzQ3NGI5NmM5NTI3MjgwNTMzYTllIiwidXNlcl9pZCI6MTV9.h-YLrunG-yA9p3Nbc4Y7p9JW5aSpWiLbO7f9SU_01Fo';

  requestHeaders.set('Authorization2', `Bearer ${userToken}`);
  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });

  // Set a new response header `x-hello-from-middleware2`
  response.headers.set('x-hello-from-middleware2', 'hello');
  return response;
}
