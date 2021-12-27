import { MouseEventHandler, ReactNode, SyntheticEvent } from "react";
import { iconPathData,IconType,IconItemType } from "./icon-path-data";
interface PropType {
    type?:string;
    color?:string;
    width?:string | number;
    height?:string | number;
    children?:ReactNode;
    className?:string;
    onClick?:Function;
}

const Icon:React.FC<PropType> = (props:PropType) => {
    const { type,color,width,height,onClick,children,...rest } = props;
    const newType = (type as keyof IconType) || "home";
    const onClickHandler:MouseEventHandler = (e:SyntheticEvent) => {
        onClick && onClick(e);
    }
    return (
        <svg 
            viewBox="0 0 1024 1024" 
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg" 
            { ...rest } 
            width={width || 30 } 
            height={height || 30 }
            onClick={onClickHandler}
        >
            {
                Array.isArray(iconPathData[newType]) ? (
                    (iconPathData[newType] as Array<IconItemType>).map((item:IconItemType,index) => (
                        <path fill={item.color ? item.color : color } d={item.prop} key={String(item) + index}></path>
                    ))
                ) : (
                    <path fill={color} d={iconPathData[newType] as string}></path>
                )
            }
        </svg>
    )
}
export default Icon;