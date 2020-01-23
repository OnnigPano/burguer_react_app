import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import styles from './Auth.module.css';
import { Redirect } from "react-router-dom";


class Auth extends Component {

    state = {
        controls: {
            email: {
                inputType: 'input',
                inputConfig: {
                    placeholder: 'Email',
                    type: 'email'
                },
                value: '',
                validation: {
                    required: true,
                    email: true
                },
                isValid: false,
                touched: false
            },
            password : {
                inputType: 'input',
                inputConfig: {
                    placeholder: 'Password',
                    type: 'password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 12
                },
                isValid: false,
                touched: false
            }
        },
        signUp: true,
        formValidity: false
    }

    inputChangeHandler = (event, inputName) => {
        const newConstrolsState = {
            ...this.state.controls
        }
        const updatedElement = {
            ...this.state.controls[inputName]
        }
        updatedElement.value = event.target.value;
        updatedElement.isValid = this.checkValidity(event.target.value, updatedElement.validation);
        updatedElement.touched = true;
        newConstrolsState[inputName] = updatedElement;

        let formValidity = true;

        for (const key in newConstrolsState) {
            formValidity = newConstrolsState[key].isValid && formValidity;
        }

        this.setState({controls: newConstrolsState, formValidity: formValidity});
    }

    checkValidity = (value, rules) => {
        let isValid = false;

        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== '';
        }

        if (rules.minLength) {
            isValid = value.trim().length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.trim().length <= rules.maxLength && isValid;
        }
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (rules.email) {
            isValid = emailRegex.test(value) && isValid;
        }

        return isValid;
    }

    authenticationHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.signUp);
    }

    formHandler = () => {
       this.setState(prevState => {
           return {
               signUp: !prevState.signUp
           }
       });
    }

    render() {

        const inputElementsArray = [];

        for (const key in this.state.controls) {
            inputElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = (
            <div className={styles.AuthForm}>
                <form  onSubmit={this.authenticationHandler} >
                    {inputElementsArray.map( inputElement => {
                        return (
                            <Input 
                            key={inputElement.id} 
                            inputConfig={inputElement.config.inputConfig} 
                            value={inputElement.config.value}
                            inputType={inputElement.config.inputType}
                            invalid={!inputElement.config.isValid}
                            shouldValidate={inputElement.config.validation}
                            touched={inputElement.config.touched}
                            changed={(event) => this.inputChangeHandler(event, inputElement.id)} />
                        );
                    })}
                    <Button btnType='Success' disabled={!this.state.formValidity}>{ this.state.signUp ? 'REGISTRARSE' : 'INICIAR SESIÓN' }</Button>
                </form>    
                    <Button btnType='Danger' clicked={this.formHandler}>{ this.state.signUp ? '¿Ya estás registrado? Inicia Sesión' : '¿No tienes cuenta? Registrate!' }</Button>
            </div>    
        );

        if (this.props.loading) {
            form = <Spinner />;
        }

        if (this.props.isAuth) {
            form = <Redirect to="/" />;
        }

        return form;
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        isAuth: state.auth.idToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, type) => dispatch(actions.authInit(email, password, type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);