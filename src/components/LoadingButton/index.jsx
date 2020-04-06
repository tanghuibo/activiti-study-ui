import React, { useState } from "react";
import { Button } from "antd";

export default (props) => {
    const [loading, setloading] = useState(false);
    function onClick() {
        setloading(true);
        props.onClick(() => {
            setloading(false);
        });
    }
    return (<Button {...props} loading={loading} onClick={onClick}>{props.children}</Button>)
}
