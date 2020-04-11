import React from 'react'
import {Link} from "react-router-dom";
import Collapsible from 'react-collapsible'

const Sidebar = (props) => {

    const getClasses = () => {
        return props.subjects.map(subject => {
            return (
                <div key={subject.id}>
                    <li>
                        <Link to={`/classes/${subject.id}`} onClick={props.onClickHandler}>{subject.id}</Link>
                    </li>
                </div>
            )
        })
    };

    return (
        <div className="d-flex">
            <nav id="sidebar">
                {/*// <!--        <div class="custom-menu">-->*/}
                {/*// <!--            <button type="button" id="sidebarCollapse" class="btn btn-primary">-->*/}
                {/*// <!--            </button>-->*/}
                {/*// <!--        </div>-->*/}
                <div className="img bg-wrap text-center py-4">
                    {/*style="background-image: url(images/bg_1.jpg);"*/}
                    <div className="user-logo">
                        <div className="img" style={{backgroundImage: 'url(' + require('./user.png') + ')'}}/>
                        <h3>Name Surname</h3>
                    </div>
                </div>
                <ul className="list-unstyled components mb-5">
                    <li>
                        <Link to="/"><span className="ti-home mr-3"/> Home</Link>
                    </li>
                    <li>
                        <Collapsible trigger={<Link to={"/home"}>
                            <span className="mr-3 my-3">My Classes</span><span
                            className="far fa-pull-right ti-angle-down"/>
                        </Link>
                        } open={true}>
                            <ul className="list-unstyled components ml-3">
                                {getClasses()}
                            </ul>
                        </Collapsible>
                    </li>

                    <li>
                        <Link to={"/todo"}><span className="ti-pencil-alt mr-3"/>Todos</Link>
                    </li>

                    <li>
                        <Link to="#"><span className="ti-book mr-3"/> Reviews</Link>
                    </li>

                    <li>
                        <Link to="#"><span className=""/> Sign Out</Link>
                    </li>
                </ul>
            </nav>
            {/*Page Content*/}
        </div>
    )
};

export default Sidebar;