import './globals.css';

export const metadata = {
  title: 'Sentimental Grid | Admin Console',
  description: 'LexiPost admin management platform',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL@20..48,100..700,0..1" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: `
          html:not(.fonts-ready) body { opacity: 0; }
          html.fonts-ready body { opacity: 1; transition: opacity 0.15s ease; }
        `}} />
      </head>
      <body>
        {children}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            function addReadyClass() {
              document.documentElement.classList.add('fonts-ready');
            }
            // Wait for fonts and hydration
            if (document.readyState === 'complete') {
              document.fonts.ready.then(addReadyClass);
              setTimeout(addReadyClass, 1500);
            } else {
              window.addEventListener('load', function() {
                document.fonts.ready.then(addReadyClass);
                setTimeout(addReadyClass, 1500);
              });
            }
          })();
        `}} />
      </body>
    </html>
  );
}
