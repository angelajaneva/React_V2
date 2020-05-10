import React, { Component } from 'react';

import { Button, FormGroup, FormControl } from "react-bootstrap";
import {login} from "../UserApi";
import auth from "../../../Authentication/auth";
import {notification} from "antd";

export const ACCESS_TOKEN = 'accessToken';
export const USERNAME = 'username';

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        let user = {
            username: this.state.username,
            password: this.state.password
        };
        login(user).then(response => {
            // console.log(response.data);
            notification.success({
                message: 'Success Message',
                description: "You're successfully logged!",
            });
            auth.setToken(response.data, true, ACCESS_TOKEN);
            // localStorage.setItem(ACCESS_TOKEN, response.data);
            localStorage.setItem(USERNAME, (this.state.username));
            this.props.history.push("/home");
        }).catch(error => {
            console.log("Sorry! Something went wrong. Please try again");
            notification.error({
                message: 'Failure Message',
                description: error.message || 'Sorry! Something went wrong. Please try again!'
            });
        });
    };

    render() {
        return (
            <div className="mt-3">
                <div className="row d-flex justify-content-center">
                    <form onSubmit={this.handleSubmit} className="w-25">
                        <FormGroup controlId="username">
                            <p>Username</p>
                            <FormControl
                                autoFocus
                                type="username"
                                value={this.state.username}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup controlId="password">
                            <p>Password</p>
                            <FormControl
                                value={this.state.password}
                                onChange={this.handleChange}
                                type="password"
                            />
                        </FormGroup>
                        <Button
                            block
                            disabled={!this.validateForm()}
                            type="submit"
                        >
                            Login
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignIn;

