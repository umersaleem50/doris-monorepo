import NextReduxProvider from '../Providers/redux-provider';
import './global.scss';

export const metadata = {
  title: 'Welcome to frontend',
  description: 'Generated by create-nx-workspace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextReduxProvider>{children}</NextReduxProvider>
      </body>
    </html>
  );
}
