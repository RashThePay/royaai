'use client'
import { Select, SelectItem } from "@nextui-org/select"
import { styles } from "@/styles"
import Image from "next/image"
import Icon from "../Icon"
import { useState } from "react"
export default function Styles() {
    const [selected, setSelected] = useState(130)
    return (
        <>
        <input type="hidden" value={selected} name="style" />
        <Select
            onChange={(e)=>setSelected(e.target.value)}
            items={styles}
            className="lg:max-w-[400px] h-[60px] flex-1"
            classNames={{selectorIcon: "left-3 right-auto", value:"text-right", popoverContent:"bg-default-100/100 w-full"}}
            startContent={<Icon name="palette" color="primary" />}
            label="انتخاب سبک دلخواه"
            placeholder="یک سبک دلخواه انتخاب کنید."
            renderValue={(styles) => styles.map((style) => {
                return(
                    <div
                    className="text-right flex items-center gap-2"
                    key={style.data.id}
                    textValue={style.data.name}
                    >
                    <Image
                        alt={style.data.name}
                        width={30}
                        height={30}
                        className="rounded-lg"
                        src={style.data.photo_url}
                    />
                    <span>{style.data.name}</span>
                </div>
                )
            })}
        >
            {(style) => (
                <SelectItem
                    key={style.id}
                    textValue={style.name}
                    startContent={<Image
                        alt={style.name}
                        width={30}
                        height={30}
                        className="rounded-lg"
                        src={style.photo_url}
                    />}>

                    <span>{style.name}</span>
                </SelectItem>
            )}
        </Select>
        </>
    )
}