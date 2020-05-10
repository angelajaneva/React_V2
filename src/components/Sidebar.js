import React, {Component} from 'react'
import {Link} from "react-router-dom";
import Collapsible from 'react-collapsible'
import {connect} from "react-redux";

import auth from "../Authentication/auth";
import * as userActionCreator from "../store/actions/user";

const USERNAME = 'username';
const ACCESS_TOKEN = 'accessToken';

class Sidebar extends Component {


    componentDidMount() {
        this.props.currentUser();
    }

    getClasses = () => {
        // console.log(auth.getToken() !== null);
        return this.props.subjects.map(subject => {
            return (
                <div key={subject.id}>
                    <li>
                        <Link to={`/classes/${subject.id}`} onClick={this.props.onClickHandler}>{subject.id}</Link>
                    </li>
                </div>
            )
        })
    };

    handleLogout = () => {
        // localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(USERNAME);
        auth.clearToken(ACCESS_TOKEN);
        auth.clearAppStorage();

    };


    render() {
        return (
            <div className="d-flex">
                <nav id="sidebar">
                    <div className="img bg-wrap text-center py-4">
                        {/*style="background-image: url(images/bg_1.jpg);"*/}
                        <div className="user-logo">
                            <div className="img" style={{backgroundImage: 'url(' + require('./user.png') + ')'}}/>
                                <h3>{this.props.user.student.firstName} {this.props.user.student.lastName}</h3>
                        </div>
                    </div>
                    <ul className="list-unstyled components mb-5">
                        <li>
                            <Link to="/"><span className="ti-home mr-3"/> Home</Link>
                        </li>
                        <li>
                            <Collapsible
                                trigger={<Link to={"/home"}
                                               className={"d-flex align-items-center justify-content-between"}>
                            <span>
                                <i className="fa fa-list mr-3 my-3"/> My Classes
                            </span>
                                    <span className="far fa-pull-right ti-angle-down"/>
                                </Link>
                                } open={true}>
                                <ul className="list-unstyled components ml-3">
                                    {this.getClasses()}
                                </ul>
                            </Collapsible>
                        </li>
                        <li>
                            <Link to={"/todo"}><span className="ti-pencil-alt mr-3"/>Todos</Link>
                        </li>
                        <li>
                            <Link to={"/reviews"}><i className="ti-book mr-3"/> Reviews</Link>
                        </li>
                        <li>
                            <Link to={"/"} onClick={this.handleLogout}><span className="ti-shift-left mr-3"/> Sign Out</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.classReducer.user
    }
};
//receives the dispatch function as arg
const mapDispatchToProps = (dispatch) => {
    return {
        currentUser: () => dispatch(userActionCreator.getUser(localStorage.getItem(USERNAME)))

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);