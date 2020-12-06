import moment from 'moment';
import { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import Button from 'react-bootstrap/Button';
import isSafeLoan from '../../utils/isSafeLoan';
import LOCALES from '../../config/locales';
import HIGH_RISK from '../../config/highRisk';

import "react-datepicker/dist/react-datepicker.css";

function Form(props) {
    const [initTime] = useState(moment().toString());
    const tomorrow = moment().add(1, "day").toDate();
    const nextMonth = moment().add(1, "month").toDate();
    const [highRisk, setHighRisk] = useState('');
    const { register, handleSubmit, errors, watch, control } = useForm();

    function onSubmitForm(formData) {
        const loans = props.loans;
        const antepenultimateDate = (loans.length >= 3)? loans[loans.length - 3].submissionDate : null;

        if (isSafeLoan(initTime, formData.amount, antepenultimateDate)) {
            const submissionDate = moment().toString();
            const repaymentDate = moment(formData.repaymentDate).toString();
            props.addLoan(submissionDate, repaymentDate, formData.amount);
            alert("Thank you. Your loan has been accepted.");
        }
        else {
            setHighRisk('We’re sorry, we cannot process your request');     
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmitForm)}>
                <div className="form-row">
                    <div className="col">
                        <label htmlFor="amount">Enter the amount:</label>
                        <input type="number" id="amout" name="amount" className="form-control" aria-describedby="amountHelp" placeholder="100" min="1" max="400"
                            ref={register(validationAmount)} />
                        <small id="amountHelp" className="form-text text-muted">You can ask up to 400 euros!</small>
                    </div>
                    <div className="col">
                        <label htmlFor="repaymentDate">Repayment Date</label>
                        <br />
                        <Controller
                            name="repaymentDate"
                            className="form-control"
                            rules={{ required: { value: true, message: "Repayment date is required" } }}
                            control={control}
                            defaultValue={nextMonth}
                            render={({ onChange, value }) => (
                                <DatePicker
                                    className="form-control"
                                    ariaLabelledBy="repaymentDateHelp"
                                    inline={false}
                                    selected={value}
                                    onChange={onChange}
                                    minDate={tomorrow}
                                    maxDate={nextMonth}
                                />
                            )}
                        />
                        <small id="repaymentDateHelp" className="form-text text-muted">Select a repayment date whithin one month</small>

                    </div>
                </div>
                <Button type="submit" name="submit" className="btn-lg btn-success">Get loan</Button>
            </form>
            <br />
            { 
                // ALL Right case
                (watch("amount") > 0 && watch("amount") <= HIGH_RISK.MAX_AMOUNT) && 
                <div className="alert alert-primary" role="alert">
                    You will give us back&nbsp; 
                    {new Intl.NumberFormat(LOCALES.IDENTIFIER, LOCALES.OPTIONS).format(watch("amount") * 1.1)}
                </div>
            }
            {
                // ERROR 1 : Amount is too high
                errors.amount && 
                <div className="alert alert-warning" role="alert"> 
                    {errors.amount.message}
                 </div>
            }
            {   
                // ERROR 2 : Repayment date is not correct
                errors.repaymentDate && 
                <div className="alert alert-warning" role="alert">
                    {errors.repaymentDate.message} 
                </div>
            }
            {
                // ERROR 3: Risk is too high
                highRisk && 
                <div className="alert alert-warning" role="alert"> {highRisk} </div>
            }
        </div>
    );
}

const validationAmount = {
    required: {
        value: true,
        message: "An amount is required",
    },
    max: {
        value: 400,
        message: "We can give you only up to 400 euros :)",
    },
    min: {
        value: 0,
        message: "Negative value means that... you just want to give us money?",
    },
};

export default Form;