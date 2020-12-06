import Button from 'react-bootstrap/Button';
import moment from 'moment';
import LOCALES from '../../config/locales'
import './history.css'; 

function History(props) {
    return (
        <table className="styled-table table table-hover">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Date</th>
                    <th>Return</th>
                    <th>Amount</th>
                    <th>Repayment</th>
                    <th>Extend</th>
                </tr>
            </thead>
            <tbody>
                {props.loans.map((item, position) =>
                    <tr key={position}>
                        <td>{item.id}   </td>
                        <td>{moment(item.submissionDate).format("DD/MM/YYYY")}</td>
                        <td>{moment(item.repaymentDate).format("DD/MM/YYYY")}</td>
                        <td>{ new Intl.NumberFormat(LOCALES.IDENTIFIER, LOCALES.OPTIONS).format(item.loanAmount)}</td>
                        <td>{ new Intl.NumberFormat(LOCALES.IDENTIFIER, LOCALES.OPTIONS).format(item.repayment)}</td>
                        <td> {(!item.hasBeenExtended)? <Button variant="success" className="btn-sm" onClick={() => props.extendLoan(item.id)}>  Extend </Button>: 'Has been extended' }</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}
export default History;