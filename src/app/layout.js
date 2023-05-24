import Menu from "@/components/Menu";
import "./globals.css";
import { Inter } from "next/font/google";
import { DataProvider } from "@/context/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chat",
  description: "Un ejemplo de un chat...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <DataProvider>
          <Menu></Menu>
          {children}
        </DataProvider>
      </body>
    </html>
  );
}
