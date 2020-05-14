import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom';
import {
    NAME_MIN_LENGTH, NAME_MAX_LENGTH,
    USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH,
    EMAIL_MAX_LENGTH,
    PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH, ACCESS_TOKEN
} from '../../../constraints';
import { Form, Input, Button, notification } from 'antd';
import 'fomantic-ui-css/semantic.css';
import './signupStyle.css'
import {Dropdown} from 'semantic-ui-react';
import {signup} from "../../util/UserApi";
import auth from "../../../Authentication/auth";

const FormItem = Form.Item;

const options = [
        {key:'1',value:'ROLE_CLIENT', text:'CLIENT'},
        {key:'2',value:'ROLE_ADMIN', text:'ADMIN'},

        ]

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {

            name: {
                value: ''
            },
            surname: {
                value: ''
            },
            username: {
                value: ''
            },
            password: {
                value: ''
            },
            roles:[]

        };

        this.handleSubmit = this.handleSubmit.bind(this);
        //this.validateUsernameAvailability = this.validateUsernameAvailability.bind(this);
        //this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log()
        const signupRequest = {
            name: this.state.name.value,
            surname: this.state.surname.value,
            email: this.state.email.value,
            username: this.state.username.value,
            password: this.state.password.value,
            roles:this.state.roles,
            phoneNumber: this.state.phoneNumber.value,
            address: this.state.address.value
        };
        signup(signupRequest)
            .then(response => {
                //sessionStorage.setItem(ACCESS_TOKEN, response.data);
                //console.log(sessionStorage.getItem(ACCESS_TOKEN));
                console.log(response);
                notification.success({
                    message: 'Success Message',
                    description: "Thank you! You're successfully registered. Enjoy!",
                });
                auth.setToken(response.data, true, ACCESS_TOKEN);
                //localStorage.setItem(ACCESS_TOKEN, response.data);
                this.props.history.push("/");
            }).catch(error => {
            notification.error({
                message: 'Failure Message',
                description: error.message || 'Sorry! Something went wrong. Please try again!'
            });
        });
    }

    isFormInvalid() {
        return !(
            this.state.username.validateStatus === null &&
            this.state.email.validateStatus === null &&
            this.state.password.validateStatus === null && this.state.name.validateStatus === null &&
            this.state.surname.validateStatus === null &&
            this.state.phoneNumber.validateStatus === null && this.state.address.validateStatus === null
        );
    }

    handleFormSubmit = (value,key) => {
        this.setState({[key]:value});
    }

    render() {
        const {roles} = this.state;
        return (
            <div className="signup-container">
                <h1 className="page-title">Sign Up</h1>
                <div className="signup-content">
                    <Form onSubmit={this.handleSubmit} className="signup-form">

                        <FormItem label="Name"
                                  hasFeedback
                                  validateStatus={this.state.name.validateStatus}
                                  help={this.state.name.errorMsg}>
                            <Input
                                size="large"
                                name="name"
                                autoComplete="off"
                                placeholder="Name"
                                value={this.state.name.value}
                                //onBlur={this.validateUsernameAvailability}
                                onChange={(event) => this.handleInputChange(event, this.validateName)}/>
                        </FormItem>

                        <FormItem label="Surname"
                                  hasFeedback
                                  validateStatus={this.state.surname.validateStatus}
                                  help={this.state.surname.errorMsg}>
                            <Input
                                size="large"
                                name="surname"
                                autoComplete="off"
                                placeholder="Surname"
                                value={this.state.surname.value}
                                //onBlur={this.validateUsernameAvailability}
                                onChange={(event) => this.handleInputChange(event, this.validateSurname)}/>
                        </FormItem>


                        <FormItem label="Username"
                                  hasFeedback
                                  validateStatus={this.state.username.validateStatus}
                                  help={this.state.username.errorMsg}>
                            <Input
                                size="large"
                                name="username"
                                autoComplete="off"
                                placeholder="A unique username"
                                value={this.state.username.value}
                                //onBlur={this.validateUsernameAvailability}
                                onChange={(event) => this.handleInputChange(event, this.validateUsername)}/>
                        </FormItem>
                        <FormItem
                            label="Email"
                            hasFeedback
                            validateStatus={this.state.email.validateStatus}
                            help={this.state.email.errorMsg}>
                            <Input
                                size="large"
                                name="email"
                                type="email"
                                autoComplete="off"
                                placeholder="Your email"
                                value={this.state.email.value}
                                //onBlur={this.validateEmailAvailability}
                                onChange={(event) => this.handleInputChange(event, this.validateEmail)}/>
                        </FormItem>
                        <FormItem
                            label="Password"
                            validateStatus={this.state.password.validateStatus}
                            help={this.state.password.errorMsg}>
                            <Input
                                size="large"
                                name="password"
                                type="password"
                                autoComplete="off"
                                placeholder="A password between 8 to 20 characters"
                                value={this.state.password.value}
                                onChange={(event) => this.handleInputChange(event, this.validatePassword)}/>
                        </FormItem>
                        <Dropdown
                            placeholder="Select role"

                            fluid multiple selection
                            options={options}
                            value={roles}

                            onChange={(e,{value})=>this.handleFormSubmit(value,'roles')}
                        />
                        <FormItem
                            label="Address"
                            validateStatus={this.state.address.validateStatus}
                            help={this.state.address.errorMsg}>
                            <Input
                                size="large"
                                name="address"
                                autoComplete="off"
                                placeholder="Address"
                                value={this.state.address.value}
                                onChange={(event) => this.handleInputChange(event, this.validateAddress)}/>
                        </FormItem>

                        <FormItem
                            label="Phone number"
                            validateStatus={this.state.phoneNumber.validateStatus}
                            help={this.state.phoneNumber.errorMsg}>
                            <Input
                                size="large"
                                name="phoneNumber"
                                //type="password"
                                autoComplete="off"
                                placeholder="Enter your phone number"
                                value={this.state.phoneNumber.value}
                                onChange={(event) => this.handleInputChange(event, this.validatePhoneNumber)}/>
                        </FormItem>

                        {/*<Captcha siteKey="YOUR_SITE_KEY" onResponse={this.showResponse}></Captcha>*/}
                        <FormItem>
                            <Button type="primary"
                                    htmlType="submit"
                                    size="large"
                                    className="signup-form-button"
                                    disabled={this.isFormInvalid()}>Sign up</Button>
                            Already registed? <NavLink to="/signin">Signin now!</NavLink>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
    //treba verifikacija
    showResponse(response){

    }
    // Validation Functions
    validateName = (name) => {
        if (name.length < NAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Name is too short(Minimum ${NAME_MIN_LENGTH} characters needed.)`
            }
        } else if (name.length > NAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Name is too long(Maximum ${NAME_MAX_LENGTH} characters allowed.)`
            }
        }
        else {
            return {
                validateStatus: null,
                errorMsg: null,
            };
        }
    }

    validateEmail = (email) => {
        if (!email) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email may not be empty'
            }
        }

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if (!EMAIL_REGEX.test(email)) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email not valid'
            }
        }

        if (email.length > EMAIL_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Email is too long(Maximum ${EMAIL_MAX_LENGTH} characters allowed.)`
            }
        }

        return {
            validateStatus: null,
            errorMsg: null
        }
    }

    validateUsername = (username) => {
        if (username.length < USERNAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Username is too short(Minimum ${USERNAME_MIN_LENGTH} characters needed.)`
            }
        } else if (username.length > USERNAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Username is too long(Maximum ${USERNAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: null,
                errorMsg: null
            }
        }
    }

    validateSurname = (surname) => {
        if (surname.length < NAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Surname is too short(Minimum ${NAME_MIN_LENGTH} characters needed.)`
            }
        } else if (surname.length > USERNAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Surname is too long(Maximum ${NAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: null,
                errorMsg: null
            }
        }
    }

    validateAddress = (address) => {
        if (address.length < NAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Address is too short(Minimum ${NAME_MIN_LENGTH} characters needed.)`
            }
        } else if (address.length > USERNAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Address is too long(Maximum ${USERNAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: null,
                errorMsg: null
            }
        }
    }

    validatePassword = (password) => {
        if (password.length < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Password is too short`
            }
        } else if (password.length > PASSWORD_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Password is too long`
            }
        } else {
            return {
                validateStatus: null,
                errorMsg: null,
            };
        }
    }


    validatePhoneNumber = (phoneNumber) => {
        if (isNaN(phoneNumber)) {
            // Its not a number
            return {
                validateStatus: 'error',
                errorMsg: `Must enter digits`
            }
        }
        else {
            return {
                validateStatus: null,
                errorMsg: null
            };
        }
    }

}
export default Signup;