import LoginButton from '../components/LoginButton';
import cookie from 'cookie';
import Link from 'next/link';

export default function HomePage({ isLoggedIn, visitCount, isCrawler }) {
  if (isCrawler) {
    return (
      <div className="container">
        <h1>Public Content for Crawler</h1>
        <p>This content is specifically served to Google crawlers for SEO purposes.</p>
      </div>
    );
  }

  if (!isLoggedIn && visitCount >= 5) {
    return (
      <div className="container">
        <h1>Public Content</h1>
        <p>You have reached the visit limit. Please log in to continue accessing more content.</p>
        <LoginButton />
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Home Page</h1>
      <p>Welcome to the home page. Enjoy full content!</p>
      {!isLoggedIn && <LoginButton />}
      <NavigationLinks />
    </div>
  );
}

function NavigationLinks() {
    return (
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/services">Services</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
    );
  }

export async function getServerSideProps(context) {
  const { req, res } = context;
  const cookies = cookie.parse(req.headers.cookie || '');
  let visitCount = 0;
  let isLoggedIn = cookies.loggedIn === 'true';
  let ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  if (cookies.visitData) {
    try {
      const parsedData = JSON.parse(cookies.visitData);
      visitCount = parsedData.visitCount;
    } catch (e) {
      // Handle parsing error
    }
  }

  // Increment visit count if not logged in
  if (!isLoggedIn) {
    visitCount += 1;

    // Store IP address and visit count in cookie
    res.setHeader('Set-Cookie', [
      cookie.serialize('visitData', JSON.stringify({ visitCount, ipAddress }), {
        maxAge: 60 * 60 * 24 * 365, // 1 year
        path: '/',
      }),
    ]);
  }

  // Detect if the request is coming from a Google crawler
  const userAgent = req.headers['user-agent'] || '';
  const isCrawler = /Googlebot|Bingbot|Slurp|DuckDuckBot|Baiduspider|YandexBot|Sogou/.test(userAgent);

  return {
    props: { isLoggedIn, visitCount, isCrawler },
  };
}
