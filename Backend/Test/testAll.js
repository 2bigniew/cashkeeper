process.env.NODE_ENV = 'test';

const importTest = (name, path) => {
    describe(name, () => {
        require(path);
    });
}

describe('Start', (req, res, next) => {
    const allTests = [
        { name: 'Partner Router', path: './partner.js' },
        { name: 'Borrow Router', path: './borrowDetails.js' },
        { name: 'Borrow Payment Router', path: './borrowPaymentDetails.js' },
        { name: 'Loan Router', path: './loanDetails.js' },
        { name: 'Loan Payment Router', path: './loanPaymentDetails.js' },
        { name: 'Delete Dummy Data', path: './deleteDummyData.js' }
    ];

    before((done) => {
        console.log('Start testing app...')
        done();
    });

    allTests.forEach( (test) => { 
        importTest(test.name, test.path);
    });

    after((done) => {
        console.log('End of app test');
        done();
    });
});