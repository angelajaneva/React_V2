import React, {useEffect, useState} from 'react'
import Navigation from "./Navigation";
import axios from "../custom-axios";


const Content = (props) => {

    const [name, setName] = useState();

    useEffect(() => {
        axios.get("/class/" + props.id).then(data => {
            setName(data.data)
        })
    });

    return (
        <div>
            <h3 className="mb-5">{name}</h3>
            {/*<hr/>*/}
            <div className="my-sm-n3">
                <Navigation subject={props.id}/>
                <hr className="my-sm-0"/>

            </div>
        </div>
    )
};

export default Content