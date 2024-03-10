'use client'
import Icon from "@/components/Icon";
import { Textarea } from "@nextui-org/input";
import Styles from "@/components/Forms/Styles";
import { Dimensions } from "@/components/Forms/Orientation";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import { addArt, getArts } from "@/storage";
import Art from "@/components/Art";
import { usePiwikPro } from '@piwikpro/next-piwik-pro'
import { getStyle } from "@/utils";

export default function App() {
    const [isLoading, setIsLoading] = useState(false)
    const [dream, setDream] = useState(null)
    const [history, setHistory] = useState([])
    const { PageViews } = usePiwikPro()
    const { CustomEvent } = usePiwikPro()
    useEffect(() => {
        PageViews.trackPageView('basic view')
    },[])
    async function submitForm(formData) {

        if (formData.get('style').length == 0 || formData.get('prompt').length < 3) {
            setIsLoading(false);
            return false;
        }
        
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
        CustomEvent.trackEvent('Basic', 'generate', 'style', getStyle(formData.get('style')).name)
    }
    useEffect(() => {
        let history = getArts().splice(-5)
        setHistory(history.reverse())
    }, [dream])
    return (
        <section className="w-full p-[2dvw] gap-2 flex flex-col md:flex-row h-[70dvh]">
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
                    <div className="flex flex-col lg:flex-row gap-2">
                        <Styles />
                        <Dimensions />
                        <Button type="submit"
                            size="lg"
                            isLoading={isLoading}
                            className="flex-0 text-right gap-0 min-h-[60px]" color="primary"
                            startContent={!isLoading && <Icon name="sparkle" color="default" />}
                        >{!isLoading && 'بباف!'}</Button>
                    </div>
                </form>
                <div dir='ltr' className="grid grid-cols-5 gap-2">
                    {history.length ? history.map((item) => {
                        if (item != dream) return (
                            <div key={item.prompt} onClick={() => setDream(item)}>
                                <Art item={item} />
                            </div>
                        )
                    }) : ''}
                </div>
            </div>
            <div className="output">
                <div className="relative overflow-hidden w-auto h-[80dvw] md:h-[75dvh] md:w-[75dvh] bg-default-100 rounded-xl">
                    {dream ? (<Art item={dream} className="h-full" />) : ""}
                </div>
            </div>
        </section>
    )
}