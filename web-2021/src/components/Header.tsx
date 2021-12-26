import "../style/components/header.scss"
import defaultHeaderImg from "../assets/banner_main.png";
interface PropType {
    src:string;
}
export default function Header(props:Partial<PropType>){
    return (
        <header className="jw-header">
            <img src={ props.src ? props.src : defaultHeaderImg } alt="图片加载中" className="jw-header-image" />
        </header>
    )
}