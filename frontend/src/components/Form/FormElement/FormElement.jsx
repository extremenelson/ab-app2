import React from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import moment from "moment";

import classes from './FormElement.css';

const FormElement = (props) => {
    //layout type
    let layoutClass = classes[props.layout];

    //------->label
    const label =
        <label
            key={props.id + '_label'}
            className={classes.Label + ' ' + layoutClass}
            htmlFor={props.id}>
            {props.label + (props.required ? '*' : '')}
        </label>;

    //------->input
    let inputContainerClasses = [classes.InputContainer, layoutClass];
    let inputClasses = [];
    if (props.message.length) {
        inputClasses.push(classes.Invalid);
    }
    let input = [];
    switch (props.type) {

        case 'String':
            if (props.allowedValues !== undefined && props.allowedValues !== null && props.allowedValues.length) {

                if (props.allowedValues.length === 2) { //radio buttons
                    inputContainerClasses.push(classes.MouseTriggered);
                    let radios = props.allowedValues.map(
                        (value, index) =>
                            <label
                                key={props.id + '_radio' + index}
                                className={classes.InputRadioContainer}>
                                <input
                                    type="radio"
                                    className={classes.InputRadio}
                                    id={props.id + index}
                                    value={value}
                                    disabled={props.disabled ? true : false}
                                    checked={value === props.value}
                                    onChange={props.inputChanged} />
                                {value}
                            </label>
                    );
                    input = input.concat(radios);

                } else { //select
                    inputClasses.push(classes.Select);
                    input.push(
                        <select
                            key={props.id + '_select'}
                            className={inputClasses.join(' ')}
                            id={props.id}
                            disabled={props.disabled ? true : false}
                            value={props.value}
                            onChange={props.inputChanged}>
                            {props.allowedValues.map((value, i) => <option key={i}>{value}</option>)}
                        </select>
                    );
                }

            } else { //input type="text"
                inputClasses.push(classes.InputText);
                input.push(
                    <input
                        key={props.id + '_input'}
                        type={props.noEcho ? "password" : "text"}
                        className={inputClasses.join(' ')}
                        id={props.id}
                        placeholder={props.placeholder}
                        value={props.value}
                        disabled={props.disabled ? true : false}
                        onChange={props.inputChanged} />
                );
            }
            break;

        case 'Boolean': //checkbox
            inputContainerClasses.push(classes.MouseTriggered);
            input.push(
                <input
                    key={props.id + '_check'}
                    type="checkbox"
                    className={classes.InputCheck}
                    id={props.id}
                    disabled={props.disabled ? true : false}
                    checked={Boolean(props.value)}
                    onChange={props.inputChanged} />
            );
            break;

        case 'Number': //input type="text"
            inputClasses.push(classes.InputText);
            input.push(
                <input
                    key={props.id + '_input'}
                    type={"text"}
                    className={inputClasses.join(' ')}
                    id={props.id}
                    placeholder={props.placeholder}
                    value={props.value}
                    disabled={props.disabled ? true : false}
                    onChange={props.inputChanged} />
            );
            break;

        case 'Text': //textarea
            inputClasses.push(classes.Textarea);
            input.push(
                <textarea
                    key={props.id + '_textarea'}
                    className={inputClasses.join(' ')}
                    id={props.id}
                    placeholder={props.placeholder}
                    value={props.value}
                    disabled={props.disabled ? true : false}
                    onChange={props.inputChanged} />
            );
            break;

        case 'Date': //input type="text"
            inputClasses.push(classes.InputText);
            input.push(
                <DatePicker
                    key={props.id + '_input'}
                    className={inputClasses.join(' ')}
                    selected={props.value === "" ? null : moment(props.value)}
                    onChange={props.inputChanged} />
            );
            break;

        case 'Hidden': //input type="hidden"
            input.push(
                <input
                    key={props.id + '_input'}
                    type={"hidden"}
                    id={props.id}
                    selected={props.value} />
            );
            break;

        default:
            input.push(
                <span
                    key={props.id + '_unrecognized'}
                    className={classes.Unrecognized}>
                    Unrecognized type
                </span>
            );
    }

    const message =
        <div
            key={props.id + '_validatorMessage'}
            className={classes.Message}>
            {props.message}
        </div>;

    //------->info icon with description
    const icon =
        <div
            key={props.id + '_infoIcon'}
            className={classes.InfoIcon + ' ' + layoutClass}
            data-tip={props.description}>
            {props.description !== undefined && props.description.length ? props.infoIcon : null}
        </div>;

    //------->output
    if (props.type !== 'Hidden') {
        return ([
            label,
            <div
                key={props.id + '_inputContainer'}
                className={inputContainerClasses.join(' ')}>
                {[input, message]}
            </div>,
            icon
        ]);
    } else {
        return ([
            <div key="dummyDiv1"></div>,
            input,
            <div key="dummyDiv2"></div>
        ]);
    }
};

export default FormElement;