import "./globals.css";

export const metadata = {
  title: "Kanban Notepadd",
  description: "Kanban Notepadd App",
  icons: {
    icon: "/images/rigby.jpg",   // ya da "/mylogo.png"
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.cdnfonts.com/css/sf-pro-display" rel="stylesheet"></link>
      </head>
      <body className="">{children}</body>
    </html>
  );
}
