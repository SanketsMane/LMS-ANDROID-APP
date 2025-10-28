import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ELearning Admin" />
        <meta name="description" content="ELearning Admin Dashboard - Manage courses, users, and analytics" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/touch-icon-ipad.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/touch-icon-iphone-retina.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/touch-icon-ipad-retina.png" />
        
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#3b82f6" />
        <link rel="shortcut icon" href="/favicon.ico" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://elearning-admin.com" />
        <meta name="twitter:title" content="ELearning Admin" />
        <meta name="twitter:description" content="ELearning Admin Dashboard - Manage courses, users, and analytics" />
        <meta name="twitter:image" content="https://elearning-admin.com/icons/android-chrome-192x192.png" />
        <meta name="twitter:creator" content="@elearning" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="ELearning Admin" />
        <meta property="og:description" content="ELearning Admin Dashboard - Manage courses, users, and analytics" />
        <meta property="og:site_name" content="ELearning Admin" />
        <meta property="og:url" content="https://elearning-admin.com" />
        <meta property="og:image" content="https://elearning-admin.com/icons/apple-touch-icon.png" />
      </Head>
      <body className="bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}