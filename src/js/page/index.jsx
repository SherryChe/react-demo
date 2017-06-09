/**
 * Created by chenxq on 2017/6/9.
 */
import {Component} from "react";
import "../../css/index.scss";

class Demo extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (<div className="warp">
            <h1>这是一个完整的react项目框架</h1>
            <div className="flex center content">
                <div className="red-dev">
                    我是居中测试
                </div>
            </div>
        </div>);
    }
}

ReactDOM.render(<Demo />,document.getElementById("wrapper"));
