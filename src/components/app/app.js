import Form from '../form/form';
import History from '../history/history';
import Container from 'react-bootstrap/Container';
import moment from 'moment';
import { useState } from 'react';

function App() {
  const [myLoans, setMyLoans] = useState([
    { id: 1, submissionDate: moment('2020-10-12'), repaymentDate: moment('2020-11-12'), loanAmount: 100, repayment: 110, hasBeenExtended: false },
    { id: 2, submissionDate: moment('2020-10-12'), repaymentDate: moment('2020-11-12'), loanAmount: 200, repayment: 220, hasBeenExtended: false },
    { id: 3, submissionDate: moment('2020-10-12'), repaymentDate: moment('2020-11-12'), loanAmount: 300, repayment: 330, hasBeenExtended: true },
  ]);

  const addLoan = (submissionDate, repaymentDate, amount) => {
    let lastId = myLoans[myLoans.length - 1].id;

    const updateLoans = [...myLoans, {
      'id': ++lastId,
      'submissionDate': submissionDate,
      'repaymentDate': repaymentDate,
      'loanAmount': amount,
      'repayment': amount * 1.1,
      'hasBeenExtended': false
    }];

    setMyLoans(updateLoans);
  }

  const extendLoan = (id) => {
    const position = myLoans.findIndex(x => x.id === id);
    myLoans[position].repaymentDate = moment(myLoans[position].repaymentDate).add(1, "week").toString() ;
    myLoans[position].repayment = myLoans[position].loanAmount*1.5;
    myLoans[position].hasBeenExtended = true;
    setMyLoans([...myLoans]);
  }

  return (
    <div className="App">
      <Container className="p-3">
        <h1 className="text-right">4finance</h1>
        <h3 className="text-right">
          Smart lending made simple
          </h3>
        <div className="jumbotron">
          <h2>Get your loan now!</h2>
          <p className="lead">4finance is a global leader in digital consumer finance.
            We get money to people in a fast, convenient way that fits their lifestyle.
            We can offer you up to 400 euros and you can return it in 30 days!</p>
          <Form loans={myLoans}  addLoan={addLoan} />
        </div>
        <History loans={myLoans} extendLoan={extendLoan} />
      </Container>
    </div>
  );
}

export default App;