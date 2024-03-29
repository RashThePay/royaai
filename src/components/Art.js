import { Card, CardFooter } from "@nextui-org/card"
import Image from "next/image"

export default function Art({item, className}) {
    return (
        <Card isFooterBlurred  className={className+" object-contain m-auto bg-transparent " + ((item.orientation == 'portrait') ? 'aspect-[11/18]' : 'aspect-square')}>
            <Image src={item.img ? item.img : ''} hidden={!item.img}  alt={item.prompt} className="object-contain" sizes="100%" fill />
            <CardFooter dir="rtl" className="text-tiny bottom-0 absolute h-[20px] truncate inline-flex">{item.prompt}</CardFooter>
        </Card>
    )
}