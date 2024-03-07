'use client'
import Art from "@/components/Art";
import { getArts } from "@/storage";
import { useEffect, useState } from "react";

export default function App(){
    const [gallery, setGallery] = useState(null)
    useEffect(()=>{
        setGallery(getArts().reverse());
    }, [])
    return (
        <section>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(1dvw,1px))] gap-2 items-center min-w-[90dvw]">
                {gallery?.map(art => (
                    <div className={" "+((art.orientation == 'portrait')? 'col-span-11 row-[span_16_/_span_16]': 'col-span-11 row-span-11')}>
                        <Art item={art}  />
                        </div>
                    
                ))}
            </div>
        </section>
    )
}