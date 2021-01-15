import React, {useState} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';

const auth = (props) => {

    const [controls, setControls] = useState({
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        })


    // Check validation of the form entries
    const checkValidity = (value, rules) => {
    let isValid = true;

    if (!rules) {
        return true;
    }

     if (rules.required) {
         isValid = value.trim() !== '' && isValid;
     }

     if (rules.minLength) {
         isValid = value.length >= rules.minLength && isValid;
     }

     if (rules.maxLength) {
         isValid = value.length <= rules.maxLength && isValid;
     }

     if (rules.isEmail) {
         const pattern =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
         isValid = pattern.test(value) && isValid;
     }

     if (rules.isNumeric) {
         const pattern = /^\d+$/;
         isValid = pattern.test(value) && isValid;
     }

     return isValid;
 }

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...controls,
            [controlName]: {
                ...controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            }
        }
        setControls(updatedControls)
    }

        const formElementsArray = [];
        for (let key in controls) {
            formElementsArray.push({
                id: key,
                config: controls[key]
            });
        }

        const form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => inputChangedHandler(event, formElement.id)}
            />
        ))

        return (
            <div className={classes.Auth}>
                <form>
                    {form}
                    <Button btnType="Success"
                    >
                    SUBMIT
                    </Button>
                </form>
            </div>
        )
    }

export default auth;
