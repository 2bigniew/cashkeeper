process.env.NODE_ENV = 'test';

const importTest = (name, path) => {
    describe(name, () => {
        require(path);
    });
}

describe('Start', (req, res, next) => {
    const allTests = [
        { name: 'Partner Router', path: './partner.js' },
    ];

    allTests.forEach( (test) => {
        before((done) => {
            console.log(`Start ${test.name} test`); 
            done();
        });

        importTest(test.name, test.path);

        after((done) => {
            console.log(`Finished ${test.name} test`);
            done();
        });
    });
});