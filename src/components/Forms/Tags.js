import { useState } from "react";
import React from "react";
import { Autocomplete, AutocompleteItem, Chip } from "@nextui-org/react";
import { tagslist } from "@/taglist"
import Icon from "../Icon";


export default function Tags({ mode }) {
    const [tags, setTags] = useState([]);
    const [input, setInput] = useState('');
    const positive = Array.from(tagslist.positive, (value, index) => ({ id: index, tag: value }))
    const negative = Array.from(tagslist.negative, (value, index) => ({ id: index, tag: value }))
    function addTag(tag, el) {
        document.getElementsByClassName(`tags-${mode}`)[0].querySelector('input').value = '';
        const temp = [...tags, tag]
        tag?.length && setTags(temp);
    }
    function removeTag(tag) {
        const index = tags.indexOf(tag);
        const temp = [...tags];
        temp.splice(index, 1)
        setTags(temp);
    }
    return (
        <div className="flex flex-col flex-1 gap-1">

            {(tags.length < 5) ? (<Autocomplete
                startContent={<Icon name={"circle-" + (mode == 'positive' ? "plus" : "minus")} color="primary" />}
                allowsCustomValue={true}
                menuTrigger="input"
                inputValue={input}
                onInputChange={(text) => setInput(text)}
                onSelectionChange={(text) => addTag(text, this)}
                classNames={{
                    base: "border-none p-0 " + `tags-${mode}`,
                    listboxWrapper: "max-h-[320px]",
                    listbox: "flex flex-row flex-wrap",
                    selectorButton: "text-default-foreground",
                    clearButton: "text-default-foreground"
                }}
                inputProps={{
                    classNames: {
                        inputWrapper: "h-[60px] min-h-[60px] rounded-xl"
                    }
                }}
                popoverProps={{
                    classNames: {
                        content: "bg-default-100/100"
                    }
                }}
                listboxProps={{
                    hideSelectedIcon: true,
                    classNames: {
                        list: "flex flex-row flex-wrap"
                    },
                    itemClasses: {
                        base: [
                            "w-fit"
                        ],
                    },
                }}
                defaultItems={[(input.length && { id: 999, tag: input }), ...((mode == 'positive') ? positive : negative)]}
                aria-label={`${mode}-tags`}
                placeholder={(mode == 'positive') ? "راهنما" : "منفی"}
                radius="full"
                variant="flat"
                size="sm"
                className={`tags-${mode} flex-1`}
            >

                {(item) => (
                    <AutocompleteItem key={item.tag}
                        textValue={item.tag}>
                        <span className="text-small">{item.tag}</span>
                    </AutocompleteItem>
                )}

            </Autocomplete>) : ""}
            <div className="flex gap-1 flex-wrap min-h-6">
                {tags.length ? tags.map((tag) => {
                    return (
                        <>
                            <Chip key={"chip-" + tag} className="text-xs p-0.5" color={(mode == "positive") ? "primary" : "danger"} onClick={() => removeTag(tag)}>{tag}</Chip>
                            <input type="hidden" name={mode} value={tag} />
                        </>
                    )
                })
                    : ''}
            </div>
        </div>
    );
}
