import { Slider } from "@nextui-org/react";

export function Weight() {
    return (
        <Slider label="وزن تصویر:"
            step={1}
            name="weight"

            classNames={{ track: "border-s-primary border-l-transparent", filler: "[&>span]bg-default-100" }}
            fillOffset={2}
            maxValue={2}
            minValue={0}
            defaultValue={1}
            size="sm"
            className="w-full"
            getValue={(value) => {
                if (value == 2) return "کم";
                if (value == 1) return "متوسط";
                if (value == 0) return "زیاد";
            }} />
    )
}