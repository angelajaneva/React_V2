import React, {Component} from 'react'
import * as actionCreator from '../store/actions/auth'
import {connect} from "react-redux";

class Auth extends Component {

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAuth();
        //(username, password) treba da se povikat vo funcijata
    };

    render() {
        return (
            <div>
                <form onSubmit={onsubmit}></form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (username, password) => dispatch = (actionCreator.auth(username, password))
    }
}

export default connect(null, mapDispatchToProps)(Auth);