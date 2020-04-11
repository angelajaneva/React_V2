import React, {useEffect, useState} from 'react'
import Navigation from "./Navigation";
import axios from "../../custom-axios";
import Page from "../Views/Page";

const Content = (props) => {
    const [name, setName] = useState();

    useEffect(() => {
        axios.get("http://localhost/_Projects/Freelancing/angrus/api/class.php?id=" + props.id).then(data => {
            setName(data.data)
        })
    });

    return (
        <Page title={name} styles={"content"}>
            <Navigation />
            {props.children}
        </Page>
    )
};

export default Content;