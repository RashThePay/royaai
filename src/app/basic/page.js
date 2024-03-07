'use client'
import Icon from "@/components/Icon";
import { Textarea } from "@nextui-org/input";
import Styles from "@/components/Forms/Styles";
import { Dimensions } from "@/components/Forms/Orientation";
import { Button, Card, CardFooter } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { addArt, getArts } from "@/storage";
import Art from "@/components/Art";
export default function App() {
    const [isLoading, setIsLoading] = useState(false)
    const [dream, setDream] = useState(null)
    const [history, setHistory] = useState([])
    
    async function submitForm(formData) {
        const res = await fetch('/api/generate', { method: 'POST', body: formData });
        const result = await res.json();
        setDream({
            img: result.data,
            prompt: formData.get('prompt'),
            style: formData.get('style'),
            orientation: formData.get('orientation')
        });
        addArt({
            img: result.data,
            prompt: formData.get('prompt'),
            style: formData.get('style'),
            orientation: formData.get('orientation')
        })
        setIsLoading(false);
    }
    useEffect(() => {
        let history = getArts().splice(-5)
        setHistory(history.reverse())
    }, [dream])
    return (
        <section className="w-full p-[2dvw] gap-2 flex flex-col md:flex-row h-[80dvh]">
            <div className="flex-1 flex flex-col gap-2">
                <form className="gap-2 flex-col flex" action={submitForm} onSubmit={() => setIsLoading(true)}>
                    <Textarea
                        startContent={<Icon name="circle-question" color="primary" />}
                        placeholder="جادوگر با ردای آبی و گوی بلورین..."
                        label="شرح تصویر"
                        size='sm'
                        name="prompt"
                        classNames={{ inputWrapper: "w-full rounded-xl" }}
                    />
                    <div className="flex flex-col md:flex-row gap-2">
                        <Styles />
                        <Dimensions />
                        <Button type="submit"
                            size="lg"
                            isLoading={isLoading}
                            className="flex-1 text-right gap-0 min-h-[60px]" color="primary"
                            startContent={!isLoading && <Icon name="sparkle" color="default" />}
                        >{!isLoading && 'بباف!'}</Button>
                    </div>
                </form>
                <div dir='ltr' className="grid grid-cols-5 gap-2">
                    {history.length ? history.map((item) => {
                        if (item.img != dream) return (
                        <div onClick={()=>setDream(item)}>
                                <Art item={item}/>
                            </div>
                    )}) : ''}
                </div>
            </div>
            <div className="output">
                <div className="relative overflow-hidden w-auto h-[80dvw] md:h-[75dvh] md:w-[75dvh] bg-default-100 rounded-xl">
                    {dream ? (<Art item={dream} className="h-full"/>) : ""}
                </div>
            </div>
        </section>
    )
}