import React from 'react'

const Page = (props) => {
    return (
        <div className={"page " + props.title.toLowerCase()}>
            <div className={"page-header"}>
                {props.title}
            </div>
            <div className="page-body container-fluid">
                {props.children}
            </div>
        </div>
    )
};

export default Page;