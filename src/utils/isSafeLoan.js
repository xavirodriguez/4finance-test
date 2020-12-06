import moment from 'moment';
import HIGH_RISK from '../config/highRisk';

export default function isSafeLoan(initTime, amount, antepenultimateDate) {
    if (moment().diff(initTime) < HIGH_RISK.MAX_LOAN_TIME && amount === HIGH_RISK.MAX_AMOUNT) {
        return false;
    }      
    
    if (moment().diff(moment(antepenultimateDate)) < HIGH_RISK.ANTEPENULTIMATE) {
        return false;
    }
    
    return true;
}