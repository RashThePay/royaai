import { useState } from "react"
import { Tab, Tabs } from "@nextui-org/react"
import Icon from "../Icon"
export function Dimensions() {
    const [selected, select] = useState('square')
    return (
        <>
            <Tabs aria-label="orientation"
            className="h-[60px]" 
            classNames={{tabList:"w-full h-full", tab:"h-full"}}
            onSelectionChange={(key) => select(key)}>
                <Tab key="square" title={<div className="flex items-center"><Icon name="square" color="primary" />مربع</div>} />
                <Tab key="portrait" title={<div className="flex items-center"><Icon name="rectangle-vertical" color="primary"/>پرتره</div>} />
            </Tabs>
            <input type="hidden" name="orientation" value={selected} />
        </>
    )

}