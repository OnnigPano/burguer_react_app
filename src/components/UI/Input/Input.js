import React from "react";

import styles from './Input.module.css';

const input = (props) => {

    let inputElement = null;

    switch (props.inputType) {
        case 'input':
            inputElement = (
                <input onChange={props.changed} className={styles.InputElement} {...props.inputConfig} value={props.value} />
            );
            break;
        case 'textarea':
            inputElement = (
                <textarea onChange={props.changed} className={styles.InputElement} {...props.inputConfig} value={props.value} />
            );
            break;
        case 'select':
            inputElement = (
                <select onChange={props.changed} className={styles.InputElement}>
                    <option>--Select Delivery Method --</option>
                    {props.inputConfig.options.map(op => {
                        return(
                            <option key={op.value} value={op.value} >{op.displayValue}</option>
                        );
                    })}
                </select>
            );
            break;        
        default:
            inputElement = (
                <input className={styles.InputElement} {...props.inputConfig} value={props.value} />
            );
            break;
    }

    return(
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;