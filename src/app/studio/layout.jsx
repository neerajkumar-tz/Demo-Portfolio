export default function StudioLayout({ children }) {
  return <>{children}</>;
}

export const metadata = { title: 'Sanity Studio' };
export default function StudioLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}