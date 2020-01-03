import React, { Component } from 'react';

import styles from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { Redirect } from 'react-router-dom';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                inputType: 'input',
                inputConfig: {
                    placeholder: 'Your Name',
                    type: 'text'
                },
                value: ''
            },
            street: {
                inputType: 'input',
                inputConfig: {
                    placeholder: 'Street',
                    type: 'text'
                },
                value: ''
            },
            zipCode: {
                inputType: 'input',
                inputConfig: {
                    placeholder: 'Zip Code',
                    type: 'text'
                },
                value: ''
            },
            country: {
                inputType: 'input',
                inputConfig: {
                    placeholder: 'Your Country',
                    type: 'text'
                },
                value: ''
            },
            email: {
                inputType: 'input',
                inputConfig: {
                    placeholder: 'Your Email',
                    type: 'email'
                },
                value: ''
            },
            deliveryMethod: {
                inputType: 'select',
                inputConfig: {
                    options: [
                        {value: 'cheapest', displayValue: 'Cheapest'},
                        {value: 'fastest', displayValue: 'Fastest'}
                    ]
                },
                value: ''
            },
        }
    }

    inputChangeHandler = (event, inputName) => {
        const updatedFormData = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedFormData[inputName]
        }
        updatedFormElement.value = event.target.value;
        updatedFormData[inputName] = updatedFormElement;
        this.setState({orderForm: updatedFormData});
    }

    orderHandler = (event) => {

            event.preventDefault();
            const formData = {}
            for (const key in this.state.orderForm) {
                formData[key] = this.state.orderForm[key].value;
            }
            const order = {
                ingredients: this.props.ings,
                totalPrice: this.props.totalPrice,
                orderData: formData
            }
            this.props.orderInit(order);
    }

    render() {

        if (this.props.purchased) {
            return <Redirect to='/' />;
        }

        const inputElementsArray = [];

        for (const key in this.state.orderForm) {
            inputElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {inputElementsArray.map( inputElement => {
                    return (
                        <Input 
                        key={inputElement.id} 
                        inputConfig={inputElement.config.inputConfig} 
                        value={inputElement.config.value}
                        inputType={inputElement.config.inputType}
                        changed={(event) => this.inputChangeHandler(event, inputElement.id)} />
                    );
                })}
                <Button btnType='Success'>ORDER</Button>
            </form>    
        );

        if(this.props.spinner) {
            form = <Spinner />;
        }

        return (
            <div className={styles.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}        
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        spinner: state.orders.loading,
        purchased: state.orders.purchased
    }
}

const mapDispatchToProps = dispatch => {
    return {
        orderInit: (order) => dispatch(actions.orderInit(order))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));