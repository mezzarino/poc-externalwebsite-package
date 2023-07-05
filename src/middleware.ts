import { NextResponse, type NextRequest } from 'next/server';

export function generateCsp() {
  const nonce = crypto.randomUUID();

  const devScriptPolicy = "'unsafe-eval'";
  const isProduction = process.env.NODE_ENV === 'production';

  const csp = [
    { name: 'default-src', values: ["'none'"] },
    {
      name: 'script-src',
      values: [
        "'self'",
        `'unsafe-inline'`,
      ].concat(isProduction ? [] : devScriptPolicy),
    },
    {
      name: 'style-src',
      values: ["'self'", `'nonce-${nonce}'`],
    },
    {
      name: 'connect-src',
      values: ["'self'", '*.vercel.app'],
    },
    { name: 'font-src', values: ["'self'", 'data:'] },
    { name: 'img-src', values: ["'self'", 'data:'] },
    { name: 'worker-src', values: ["'self'", 'blob:'] },
    { name: 'media-src', values: ["'none'"] },
    { name: 'object-src', values: ["'none'"] },
    { name: 'frame-ancestors', values: ["'none'"] },
    { name: 'form-action', values: ["'self'"] },
    { name: 'base-uri', values: ["'none'"] },
  ];

  const cspString = csp
    .map((directive) => {
      return `${directive.name} ${directive.values.join(' ')}`;
    })
    .join('; ');

  return { csp: cspString, nonce };
}

export async function middleware(request: NextRequest) {
  // generate CSP and nonce
  const { csp, nonce } = generateCsp();

  // Clone the request headers
  const requestHeaders = new Headers(request.headers);

  // set nonce request header to read in pages if needed
  requestHeaders.set('x-nonce', nonce);

  const headerKey = 'content-security-policy';

  requestHeaders.set(headerKey, csp);

  // create new response
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });

  response.headers.set(headerKey, csp);

  return response;
}
