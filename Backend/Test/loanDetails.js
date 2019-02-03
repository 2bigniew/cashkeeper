const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const LoanDetails = require('../Database/Models/LoanDetails');
const PartnerAccount = require('../Database/Models/PartnerAccount');
const Sequalize = require('sequelize');
const Helpers = require('../Helpers/Helpers');

chai.use(chaiHttp);

describe('DELETE ALL FROM loan_details', () => {
    it('It should remove all from loan_details table', (done) => {
        const Op = Sequalize.Op;
    
        LoanDetails.destroy({
            where: {
                loan_id: {
                    [Op.gte]: 0
                }
            }
        });
        done();
    });
});

describe('/GET Loan', () => {
    it('It should get all loans', (done) => {
        chai.request(app)
            .get('/loan/list')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object')
                res.body.data.should.be.a('array');
                res.body.data.length.should.be.eql(0);
                done();
            });
    });

});

describe('/POST Loan', () => {
    it('It should not post without loan-date or purpose', (done) => {
        PartnerAccount.findOne({
            where: {
                firstname: 'URoberto',
                lastname: 'UFirmino'
            }
        }).then( partnerResponse => {
            const loan = {
                value: '600',
                partner: partnerResponse.partner_id
            };

            chai.request(app)
                .post('/loan/create')
                .send(loan)
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
        PartnerAccount.findOne({
            where: {
                firstname: 'URoberto',
                lastname: 'UFirmino'
            }
        }).then( partnerResponse => {
            const loan = {
                value: '6oo',
                partner: partnerResponse.partner_id,
                "loan-date": Helpers.getTimestamp(),
                purpose: 'Buy PS4'
            };

            chai.request(app)
                .post('/loan/create')
                .send(loan)
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

    it('It should not post without partner id', (done) => {
        const loan = {
            value: '600',
            partner: null
        };

        chai.request(app)
            .post('/loan/create')
            .send(loan)
            .end((err, res) => {
                should.exist(res);
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('name').eql('RouteError');
                done();
            });
    });

    it('It should POST new borrow', (done) => {
        PartnerAccount.findOne({
            where: {
                firstname: 'URoberto',
                lastname: 'UFirmino'
            }
        }).then( partnerResponse => {
            const loan = {
                value: '600',
                partner: partnerResponse.partner_id,
                "loan-date": Helpers.getTimestamp(),
                purpose: 'Buy PS4'
            };

            chai.request(app)
                .post('/loan/create')
                .send(loan)
                .end((err, res) => {
                    should.not.exist(err);
                    should.exist(res);
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.data.should.have.property('loan_serial');
                    res.body.data.should.have.property('loan_date');
                    res.body.data.should.have.property('is_completed');
                    res.body.data.should.have.property('value');
                    res.body.data.should.have.property('purpose').eql('Buy PS4');
                    res.body.should.have.property('message').eql('Loan successfully added');
                    done();
                });
        });
    });

});

describe('/PUT Loan', () => {
    it('It should not update loan without loan id, or partner id', (done) => {
        chai.request(app)
            .put('/loan/complete')
            .end((err, res) => {
                should.exist(res);
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('name').eql('RouteError');
                done();
            });
    });

    it('It should update loan, set complete to true', (done) => {
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
                .put('/loan/complete')
                .send(loan)
                .end((err, res) => {
                    should.not.exist(err);
                    should.exist(res);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.data.should.have.property('loan_date');
                    res.body.data.should.have.property('loan_serial');
                    res.body.data.should.have.property('value');
                    res.body.data.should.have.property('is_completed').eql(true);
                    res.body.should.have.property('message').eql('Loan updated successfully');
                    done();
                });
            });

    });

});
