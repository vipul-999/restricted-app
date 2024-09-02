// import { NextResponse } from 'next/server';

// export async function middleware(req) {
//   const url = req.nextUrl.clone();
//   const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown';
//   const cookieStore = req.cookies;
//   const visitDataCookie = cookieStore.get('visitData');

//   let visitData = { ip, visitCount: 0 };

//   if (visitDataCookie) {
//     try {
//       visitData = JSON.parse(visitDataCookie.value);
//       if (visitData.ip === ip) {
//         visitData.visitCount += 1;
//       } else {
//         visitData = { ip, visitCount: 1 };
//       }
//     } catch (e) {
//       visitData = { ip, visitCount: 1 };
//     }
//   } else {
//     visitData = { ip, visitCount: 1 };
//   }

//   const response = NextResponse.next();
//   response.cookies.set('visitData', JSON.stringify(visitData), { httpOnly: true });

//   return response;
// }

// export const config = {
//   matcher: ['/((?!api|_next|static|favicon.ico).*)'],
// };
import { NextResponse } from "next/server";

export async function middleware(req) {
  console.log(`Request URL: ${req.url}`);
  console.log(`Request Method: ${req.method}`);
//   return NextResponse.next();
  const ip = req.ip || req.headers.get("x-forwarded-for") || "unknown";
  const cookieStore = req.cookies;
  const visitDataCookie = cookieStore.get("visitData");

  let visitData = { ip, visitCount: 0 };

  if (visitDataCookie) {
    try {
      visitData = JSON.parse(visitDataCookie.value);
      if (visitData.ip === ip) {
        visitData.visitCount += 1; // Increment only if the IP matches
      } else {
        visitData = { ip, visitCount: 1 };
      }
    } catch (e) {
      visitData = { ip, visitCount: 1 };
    }
  } else {
    visitData = { ip, visitCount: 1 };
  }

  const response = NextResponse.next();
  response.cookies.set("visitData", JSON.stringify(visitData), {
    httpOnly: true,
  });

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"], // Apply middleware to all pages except API routes and static files
};
