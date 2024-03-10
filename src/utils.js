
import {styles} from "@/styles";

export function getStyle(id) {
    for (let style of styles) {
        if (style['id'] == id) {
            return style;
        }
    }
}