import React, { Component } from 'react';

import styles from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: '',
        spiner: true
    }

    orderHandler = () => {
          const order = {
              ingredients: this.props.ingredients,
              totalPrice: this.props.price,
              costumer: {
                  name: 'Onnig Panossian',
                  adress: 'Av. Kimbalache 111',
                  email: 'onnigpano@gmail.com',
                  zipCode: '1437'
              },
              deliveryMethod: 'fastest'
          }

          this.setState({spinner: true});


           axios.post('/orders.json', order)
           .then( response => {
               console.log(response);
               this.setState({spinner: false});
               this.props.history.push('/');
           })
           .catch( error => {
               console.log(error);
               this.setState({spinner: false});
           });
    }

    render() {
        let form = (
            <form>
                <input className={styles.Input} type='text' name='name' placeholder='Your Name' />
                <input className={styles.Input} type='email' name='email' placeholder='Your email' />
                <input className={styles.Input} type='text' name='address' placeholder='Your address' />
                <input className={styles.Input} type='text' name='country' placeholder='Your country' />
                <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
            </form>    
        );

        if(this.state.spinner) {
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

export default ContactData;