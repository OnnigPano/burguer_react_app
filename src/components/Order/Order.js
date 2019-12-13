import React from 'react';

import styles from './Order.module.css';

const order = (props) => {

    const ingredients = [];

    for (const ig in props.ingredients) {
       ingredients.push({
            name: ig,
            amount: props.ingredients[ig]
       });
    }

    const ingredientsOutput = ingredients.map( ig => {
        return <span 
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid black',
                    padding: '5px'
                }}
                key={ig.name} >{ig.name} ({ig.amount})</span>;
    });

    return (

        <div className={styles.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>USD {props.price}</strong></p>
        </div>
    );
}

export default order;