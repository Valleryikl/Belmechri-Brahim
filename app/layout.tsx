import "./globals.css";

export const metadata = { title: 'Portfolio', description: 'First cut' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  )
}
