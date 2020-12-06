import isSafeLoan from './isSafeLoan';
import moment from 'moment';

test('It has high risk when done in less than 30 seconds with max amount', () => {
    expect(isSafeLoan(new moment(),400, 0)).toBe(false);
});

test('It has high risk when more than 3 loans in 60 seconds', () => {
    expect(isSafeLoan(new moment(),400, new moment())).toBe(false);
});

test('It is safe when no more than 3 loans in 60 seconds or not max amount in 30 seconds', () => {
    expect(isSafeLoan(new moment(),300, null)).toBe(true);
});