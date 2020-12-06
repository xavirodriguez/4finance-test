# Goal
Create a simple micro-lending web application, where client can choose amount and term for the loan to apply. Similar to one of our existing products.

# Requirements
User can apply for loan with a form that is shown on frontpage:
- option to enter amount: limited to up 400 euro
- option to enter date: limited to up 30 days from today (may be provided by some calendar picker or just use plain number of days)
- text showing the amount he’ll need to pay back on desired date - recalculated dynamically as amount or date change using 10% fixed rate
- submit button to save applied loan to application state / browser storage

Application should perform risk assessment based on following rules:

Risk is considered too high if:

- the attempt to take loan is made faster than 30 seconds from page load with max possible amount
- reached max applications (e.g. 3) per 1 minute from a browser session

If the risk is high, user should be displayed a popup with the “We’re sorry” message
Otherwise - display the status of loan application and update the table with loans history  

Client should be able to extend a loan. Loan term gets extended for one week, interest gets increased by a factor of 1.5.

The whole history of loans is visible for clients, including loan extensions.

# Available Scripts
In the project directory, you can run:

## `npm start`
Runs the app in the development mode.

## `npm test`
Run tests