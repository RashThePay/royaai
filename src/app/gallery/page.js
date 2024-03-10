'use client'
import Art from "@/components/Art";
import { getArts } from "@/storage";
import {Image} from "@nextui-org/image";
import { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/modal";
import { Chip } from "@nextui-org/react";
import Icon from "@/components/Icon";
import { getStyle } from "@/utils";


export default function App() {
    const [gallery, setGallery] = useState(null)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [dream, setDream] = useState(null);
    function openDream(art) {
        setDream(art);
        onOpen();
    }
    useEffect(() => {
        setGallery(getArts().reverse());
    }, [])
    return (
        <section>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(1dvw,1px))] gap-2 items-center min-w-[90dvw]">
                {gallery?.map(art => (
                    <div key={art.prompt} onClick={()=>openDream(art)} className={"object-cover " + ((art.orientation == 'portrait') ? 'col-span-11 row-[span_18_/_span_18]' : 'col-span-11 row-span-11')}>
                        <Art item={art} />
                    </div>

                ))}
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="bg-default-100/100">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody className="p-2">
                               <Image src={dream.img} alt={dream.prompt} />
                            </ModalBody>
                            <ModalFooter className="text-right float-right justify-start">
                                <div >
                                    <h5>{dream.prompt}</h5>
                                </div>
                                <div>
                                    <Chip color="primary"><Icon name="palette" color="default"/>{getStyle(dream.style).name}</Chip>
                                </div>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </section>
    )
}