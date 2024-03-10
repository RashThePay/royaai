'use client'
import Icon from "@/components/Icon";
import { Textarea } from "@nextui-org/input";
import Styles from "@/components/Forms/Styles";
import { Dimensions } from "@/components/Forms/Orientation";
import { Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { addArt } from "@/storage";
import Art from "@/components/Art";
import Tags from "@/components/Forms/Tags";
import Upload from "@/components/Forms/Upload";
import { Weight } from "@/components/Forms/Weight";
import { HfInference } from "@huggingface/inference";
import { usePiwikPro } from '@piwikpro/next-piwik-pro'

export default function App() {
    const [isLoading, setIsLoading] = useState(false)
    const [dream, setDream] = useState({ img: null, prompt: null, style: null, orientation: null })
    const { PageViews } = usePiwikPro()
    const { CustomEvent } = usePiwikPro()
    useEffect(() => {
        PageViews.trackPageView('advanced view')
    },[])
    async function translate(text) {
        while (true) {
            const res = await fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=fa|en`)
            const result = await res.json();
            if (res.ok) return result.responseData.translatedText;
        }
    }
    async function blobToDataUrl(blob) {
        const e = await new Promise(r => {
            let a = new FileReader();
            a.onload = r;
            a.readAsDataURL(blob);
        });
        return e.target.result;
    }
    async function getPreview() {
        CustomEvent.trackEvent('Advanced', 'preview')
        if (isLoading) { return false; } else { setIsLoading(true); };
        const formData = new FormData(document.querySelector('form'))
        const prompt = await translate(formData.get('prompt'))
        let positive = '', negative = '';
        formData.get('positive')?.trim.length ? positive = await translate(formData.get('positive')) : positive = '';
        formData.get('negative')?.trim.length ? negative = await translate(formData.get('negative')) : negative = '';
        const orientation = document.querySelector('input[name="orientation"]').value;
        let h = 1024; let w = 1024;
        if (orientation == "portrait") w = 625;
        const hf = new HfInference();
        const blob = await hf.textToImage({
            inputs: prompt + " - Style: " + positive,
            parameters: {
                negative_prompt: negative,
                height: h,
                width: w,
            }
        })
        const dataurl = await blobToDataUrl(blob);
        setDream({
            img: dataurl,
            prompt: formData.get('prompt'),
            style: formData.get('style'),
            orientation: formData.get('orientation')
        });
        setIsLoading(false);
    }

    async function submitForm(formData) {
       
        if (!formData.get('style').length || formData.get('prompt').length < 3) {
            setIsLoading(false);
            return false;
        }
        const res = await fetch('/api/dreamify', { method: 'POST', body: formData });
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
        CustomEvent.trackEvent('Advanced', 'dreamify', 'style', getStyle(formData.get('style')).name)
    }

    return (
        <section className="w-full p-[2dvw] gap-2 flex flex-col md:flex-row md:h-[80dvh]">
            <form className="gap-2 flex-col flex-1 flex min-h-[80dvh]" action={submitForm} onSubmit={() => setIsLoading(true)}>
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

                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                    <Tags mode="positive" />
                    <Tags mode="negative" />

                </div>

                <div className="flex flex-col  w-full gap-2">
                    <div className="flex flex-row flex-1 gap-2">
                        <div className="flex-1 flex">
                        <Upload dream={dream} setDream={setDream} />
                            </div>
                            <div className="flex-1">
                            <Weight />
                            </div>
                        
                        
                    </div>
                    <div className="flex flex-row gap-2 justify-self-end flex-1">

                        <Button
                            onClick={() => getPreview()}
                            size="lg"
                            isLoading={isLoading}
                            className="flex-1 text-right gap-0 min-h-[60px]" color="primary"
                            startContent={!isLoading && <Icon name="eye" color="default" />}
                        >{!isLoading && 'پیش‌نمایش'}</Button>
                        <Button type="submit"
                            size="lg"
                            isDisabled={!dream.img}
                            isLoading={isLoading}
                            className="flex-1 text-right gap-0 min-h-[60px]" color="primary"
                            startContent={!isLoading && <Icon name="sparkles" color="default" />}
                        >{!isLoading && 'بباف!'}</Button>
                    </div>
                </div>

            </form>
            <div className="output">
                <div className={`relative overflow-hidden w-auto aspect-${dream.orientation == 'portrait' ? '[11/18]' : 'square'} md:h-[50dvh] lg:h-[70dvh] bg-default-100 rounded-xl`}>
                    <Art item={dream} className="h-full" />
                </div>
            </div>
        </section>
    )
}