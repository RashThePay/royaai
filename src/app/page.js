import Art from "@/components/Art";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
  return (
      <div className="flex flex-col-reverse sm:flex-row w-[90dvw] p-[2dvw] sm:h-[75dvh] gap-2">
        <div className="flex-1">
          <Art className="object-contain w-[100%] sm:w-[100%] h-fit sm:max-h-[50dvh] sm:max-w-[50dvh] aspect-square" 
          item={{img:"/images/landing.jpeg", prompt:"پیک‌نیک رویایی در غروب آفتاب", style:'133', orientation:'square'}}/>
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-bold">رویا.<span className="text-primary">آ</span>.یی</h1>
          <br/>
          <h6 className="text-xl">
            اولین هوش مصنوعی مولد تصویر 
            </h6>
            <h6 className="text-xl text-primary">
            با پشتیبانی از زبان فارسی
          </h6>
          <br/>
          <blockquote className="italic">«
            کافی‌ست تصویر رویایی‌تان را بنویسید و بگذارید برایتان رویا ببافد...
          »</blockquote>
          <Button as={Link} href="/basic" color="primary" className="float-left mt-2">
            شروع
          </Button>
        </div>
      </div>
  );
}
