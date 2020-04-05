import React from 'react'

const Comment = () => {
    return (
        <div className="container">
            <div className="w-card-4 mt-4">
                <header className="w-container w-gray">
                    <p>Written by Username</p>
                </header>
                <div className="w-container mt-4">
                    <p>In this chapter, we first study the fundamentals of the relational model. A" +
                        "substantial theory exists for relational databases.We study the part of this theory " +
                        "dealing with queries in Chapter 6. In Chapters 7 through 8, we shall examine " +
                        "aspects of database theory that help in the design of relational database schemas, " +
                        "while in Chapters 12 and 13we discuss aspects of the theory dealingwith efficient " +
                        "processing of queries.</p>

                </div>
                <hr/>
                <footer className="w-container w-light-gray">
                    <a className="ti-thumb-up pr-3"/>
                    <a className="ti-thumb-down"/>
                </footer>
            </div>
        </div>

    )
};

export default Comment;