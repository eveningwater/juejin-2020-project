import Header from "../components/Header";
import "../style/views/background.scss";
import InfoAnchor from "../components/InfoAnchor";
import Sign from "../components/Sign";
export default function Background(){
    return (
        <div className="jw-background">
            <div className="jw-wrapper">
                <div className="jw-container">
                    <Header></Header>
                    <InfoAnchor></InfoAnchor>
                    <Sign></Sign>
                </div>
            </div>
        </div>
    )
}