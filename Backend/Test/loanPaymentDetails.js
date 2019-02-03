const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const LoanPaymentDetails = require('../Database/Models/LoanPaymentDetails');
const LoanDetails = require('../Database/Models/LoanDetails');
const PartnerAccount = require('../Database/Models/PartnerAccount');
const Sequalize = require('sequelize');
const Helpers = require('../Helpers/Helpers');

chai.use(chaiHttp);

describe('DELETE ALL FROM loan_payment_details', () => {
    it('It should remove all from loan_payment_details table', (done) => {
        const Op = Sequalize.Op;
    
        LoanPaymentDetails.destroy({
            where: {
                loan_payment_details_id: {
                    [Op.gte]: 0
                }
            }
        });
        done();
    });
});

describe('/GET Loan Payment Details', () => {
    it('It should get loan_payment_detaild basic data', (done) => {

        chai.request(app)
            .get('/loan-payment/list')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object')
                res.body.data.should.be.a('array');
                res.body.data.length.should.be.eql(0);
                done();
            })
    });

    it('It should get sum of all borrow_payments', (done) => {

        chai.request(app)
            .get('/loan-payment/sum')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object')
                res.body.data.should.be.eql(0);
                done();
            })
    });
});

describe('/POST Loan Payment Details', () => {
    it('It should not post without payment date', (done) => {
        LoanDetails.findOne({
            where: {
                purpose: 'Buy PS4',
                value: '600'
            }
        }).then( loanResponse => {
            const loanPayment = {
                payment_value: '144.00',
                loan: loanResponse.loan_id,
            };

            chai.request(app)
            .post('/borrow-payment/create')
            .send(loanPayment)
            .end((err, res) => {
                should.exist(res);
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('name').eql('RouteError');
                done();
            });
        });
    });

    it('It should not post if value is not decimal', (done) => {
        LoanDetails.findOne({
            where: {
                purpose: 'Buy PS4',
                value: '600'
            }
        }).then( loanResponse => {
            const loanPayment = {
                payment_value: '144,00',
                payment_date: Helpers.getTimestamp(),
                loan: loanResponse.loan_id,
            };
            chai.request(app)
            .post('/loan-payment/create')
            .send(loanPayment)
            .end((err, res) => {
                should.exist(res);
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('name').eql('RouteError');
                done();
            });
        });
    });

    it('It should post with payment date, if value is decimal', (done) => {
        LoanDetails.findOne({
            where: {
                purpose: 'Buy PS4',
                value: '600'
            }
        }).then( loanResponse => {
            const loanPayment = {
                payment_value: '144.00',
                payment_date: Helpers.getTimestamp(),
                loan: loanResponse.loan_id,
            };
            chai.request(app)
            .post('/loan-payment/create')
            .send(loanPayment)
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.data.should.have.property('user_id');
                res.body.data.should.have.property('payment_date');
                res.body.data.should.have.property('created_at');
                res.body.data.should.have.property('loan_id');
                res.body.data.should.have.property('payment_value').eql(144);
                res.body.should.have.property('message').eql('Loan payment successfully added');
                done();
            });
        });
    });
});

describe('/PUT Loan payment details', () => {
    it('It should not update payment with not decimal payment value', (done) => {
        LoanPaymentDetails.findOne({
            where: {
                payment_value: '144.00'
            }
        }).then( loanPaymentResponse => {
            const loanPayment = {
                payment_value: '155,00',
                loanPayment: loanPaymentResponse.loan_payment_details_id,
            };

            chai.request(app)
            .put('/loan-payment/update')
            .send(loanPayment)
            .end((err, res) => {
                should.exist(res);
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('name').eql('RouteError');
                done();
            });
        });
    });

    it('It should update payment with payment value or payment date', (done) => {
        LoanPaymentDetails.findOne({
            where: {
                payment_value: '144.00'
            }
        }).then( loanPaymentResponse => {
            const loanPayment = {
                payment_value: '155.00',
                payment_date: Helpers.getTimestamp(),
                loanPayment: loanPaymentResponse.loan_payment_details_id,
            };

            chai.request(app)
            .put('/loan-payment/update')
            .send(loanPayment)
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.data.should.have.property('user_id');
                res.body.data.should.have.property('payment_date');
                res.body.data.should.have.property('created_at');
                res.body.data.should.have.property('loan_id');
                res.body.data.should.have.property('payment_value').eql('155.00');
                res.body.should.have.property('message').eql('Loan payment updated successfully');
                done();
            });
        });
    });
});