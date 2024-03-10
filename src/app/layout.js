import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "../components/Navbar"
import Script from "next/script";
const vazir = Vazirmatn({ subsets: ["arabic"] });

export const metadata = {
  title: "رویا.آ.یی",
  description: "هوش مصنوعی مولد تصویر با پشتیبانی از زبان فارسی",
};



export default function RootLayout({ children }) {
  return (
    <html lang="fa-IR" dir="rtl" className="purple-dark">
            <Script id="yektanet">
            {`!function(e,t,n){e.yektanetAnalyticsObject=n,e[n]=e[n]||function(){e[n].q.push(arguments)},e[n].q=e[n].q||[];var a=t.getElementsByTagName("head")[0],r=new Date,c="https://cdn.yektanet.com/superscript/h1dloEgK/native-royaai.ir-36735/yn_pub.js?v="+r.getFullYear().toString()+"0"+r.getMonth()+"0"+r.getDate()+"0"+r.getHours(),s=t.createElement("link");s.rel="preload",s.as="script",s.href=c,a.appendChild(s);var l=t.createElement("script");l.async=!0,l.src=c,a.appendChild(l)}(window,document,"yektanet");`}
            </Script>
      <body className={vazir.className}>
        <Providers>
          <Navbar/>
          <main className="p-6 flex justify-center items-start">
          {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
