import { NextResponse } from "next/server";

const blockedIps = ["192.0.2.1", "198.51.100.1"]; // Blocked IPs
const rateLimit = {};
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 1000;

export function middleware(req) {
  const ip = req.headers.get("x-forwarded-for") || req.ip;

  if (blockedIps.includes(ip)) {
    return new Response("Forbidden", { status: 403 });
  }

  const now = Date.now();

  if (!rateLimit[ip]) {
    rateLimit[ip] = [];
  }

  // Filter requests within the time window
  rateLimit[ip] = rateLimit[ip].filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
  );

  if (rateLimit[ip].length >= MAX_REQUESTS) {
    return new Response("Rate limit exceeded", { status: 429 });
  }

  rateLimit[ip].push(now);

  return NextResponse.next();
}
