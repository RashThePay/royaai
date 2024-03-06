import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "../components/Navbar"
const vazir = Vazirmatn({ subsets: ["arabic"] });

export const metadata = {
  title: "رویا.آ.یی",
  description: "هوش مصنوعی مولد تصویر با پشتیبانی از زبان فارسی",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa-IR" dir="rtl" className="purple-dark">
      <body className={vazir.className+" overflow-hidden"}>
        <Providers>
          <Navbar/>
          {children}
        </Providers>
      </body>
    </html>
  );
}
