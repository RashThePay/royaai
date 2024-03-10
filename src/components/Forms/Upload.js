import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import Cropper from "./Cropper/App"
import Icon from "../Icon";
export default function Upload({dream, setDream}) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    function finalize(onClose) {
        const canvas = document.querySelector('#croppedCanvas')
        const orientation = document.getElementsByName('orientation').value;
        const url = canvas.toDataURL("image/jpeg");
        setDream({img:url, prompt:null, style:null, orientation:orientation});
        onClose();
    }
    function deleteTarget(){
        setDream({img:null, prompt:null, style:null, orientation:null});
    }
    return (
        <>
            {dream.img ? (
                <Button color="danger" className="min-h-[60px] flex-1" variant="flat" startContent={<Icon name="xmark"/>} onPress={()=>deleteTarget()}>
                    حذف تصویر
                </Button>
            ) : (
                <Button onPress={onOpen} startContent={<Icon name="image" color="primary"/>} className="min-h-[60px] flex-1">بارگذاری تصویر</Button>                
                                )}
            <input type="hidden" name="image" value={dream.img?.split('base64,')[1]} />
            <input type='hidden' name='format' value="jpeg"/>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">بارگذاری تصویر</ModalHeader>
                            <ModalBody>
                                <Cropper />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" variant="light" onPress={onClose}>
                                    بستن
                                </Button>

                                <Button color="success" onPress={() => finalize(onClose)}>
                                    انتخاب
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
