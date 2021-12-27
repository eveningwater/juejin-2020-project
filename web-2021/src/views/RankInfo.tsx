import { Fragment } from "react";
import "../style/views/rank-info.scss";
import url from "../linkData/url";
export default function RankInfo(){
    return (
        <Fragment>
            <a href="/" rel="noopener noreferrer" className="jw-info-link">
                <span className="jw-info-link-text">活动首页</span>
                <img src={url["right-icon"]} alt="图片加载中" className="jw-info-link-right-icon" />
            </a>
        </Fragment>
    )
}