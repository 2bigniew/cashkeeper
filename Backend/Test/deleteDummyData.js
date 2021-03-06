process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();

const PartnerAccount = require('../Database/Models/PartnerAccount');
const BorrowDetails = require('../Database/Models/BorrowDetails');
const BorrowPaymentDetails = require('../Database/Models/BorrowPaymentDetails');
const LoanPaymentDetails = require('../Database/Models/LoanPaymentDetails');
const LoanDetails = require('../Database/Models/LoanDetails');

chai.use(chaiHttp)

describe('/DELETE Borrow payment', () => {
    it('It should delete borrow payment by borrow_payment_details_id', (done) => {
        BorrowPaymentDetails.findOne({
            where: {
                payment_value: '133.00'
            }
        }).then( borrowPaymentResponse => {
            const borrow = {
                borrowPayment: borrowPaymentResponse.borrow_payment_details_id,
            };
        
            chai.request(app)
            .delete('/borrow-payment/delete')
            .send(borrow)
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.data.should.have.property('payment_value');
                res.body.data.should.have.property('payment_date');
                res.body.data.should.have.property('created_at');
                res.body.should.have.property('message').eql('Borrow payment deleted successfully');
                done();
            });
        });
    });
});

describe('/DELETE Loan payment', () => {
    it('It should delete loan payment by loan_payment_details_id', (done) => {
        LoanPaymentDetails.findOne({
            where: {
                payment_value: '155.00'
            }
        }).then( loanPaymentResponse => {
            const loan = {
                loanPayment: loanPaymentResponse.loan_payment_details_id,
            };
        
            chai.request(app)
            .delete('/loan-payment/delete')
            .send(loan)
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.data.should.have.property('payment_value');
                res.body.data.should.have.property('payment_date');
                res.body.data.should.have.property('created_at');
                res.body.should.have.property('message').eql('Loan payment deleted successfully');
                done();
            });
        });
    });
});

describe('/DELETE Borrow', () => {
    it('It should delete borrow by borrow_id partner_id', (done) => {
        BorrowDetails.findOne({
            where: {
                purpose: 'Buy new Nikes',
                value: '500'
            }
        }).then( borrowResponse => {
            const borrow = {
                borrow: borrowResponse.borrow_id,
                partner: borrowResponse.partner_id
            };
        
            chai.request(app)
            .delete('/borrow/delete')
            .send(borrow)
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.data.should.have.property('borrow_date');
                res.body.data.should.have.property('borrow_serial');
                res.body.data.should.have.property('value');
                res.body.should.have.property('message').eql('Borrow deleted successfully');
                done();
            });
        });
    });
});

describe('/DELETE Loan', () => {
    it('It should delete loan by loan_id and partner_id', (done) => {
        LoanDetails.findOne({
            where: {
                purpose: 'Buy PS4',
                value: '600'
            }
        }).then( loanResponse => {
            const loan = {
                loan: loanResponse.loan_id,
                partner: loanResponse.partner_id
            };
        
            chai.request(app)
            .delete('/loan/delete')
            .send(loan)
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.data.should.have.property('loan_date');
                res.body.data.should.have.property('loan_serial');
                res.body.data.should.have.property('value');
                res.body.should.have.property('message').eql('Loan deleted successfully');
                done();
            });
        });
    });
});

// ostatnie
describe('/DELETE Partner', () => {
    it('It should delete partner by partner_id', (done) => {
        PartnerAccount.findOne({
            where: {
                firstname: 'URoberto',
                lastname: 'UFirmino'
            }
        }).then( partnerResponse => {
            const partner = {
                partnerid: partnerResponse.partner_id
            };
        
            chai.request(app)
            .delete('/partner/delete')
            .send(partner)
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.data.should.have.property('partner_id');
                res.body.data.should.have.property('firstname');
                res.body.data.should.have.property('lastname');
                res.body.should.have.property('message').eql('Partner deleted successfully');
                done();
            });
        });
    })
});