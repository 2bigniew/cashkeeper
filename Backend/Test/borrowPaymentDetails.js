const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const BorrowPaymentDetails = require('../Database/Models/BorrowPaymentDetails');
const BorrowDetails = require('../Database/Models/BorrowDetails');
const PartnerAccount = require('../Database/Models/PartnerAccount');
const Sequalize = require('sequelize');
const Helpers = require('../Helpers/Helpers');

chai.use(chaiHttp);

describe('DELETE ALL FROM borrow_payment_details', () => {
    it('It should remove all from borrow_borrow_payment_detailsdetails table', (done) => {
        const Op = Sequalize.Op;
    
        BorrowPaymentDetails.destroy({
            where: {
                borrow_payment_details_id: {
                    [Op.gte]: 0
                }
            }
        });
        done();
    });
});

describe('/GET Borrow Payment Details', () => {
    it('It should get borrow_payment_detaild basic data', (done) => {

        chai.request(app)
            .get('/borrow-payment/list')
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
            .get('/borrow-payment/sum')
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

describe('/POST Borrow Payment Details', () => {
    it('It should not post without payment date', (done) => {
        BorrowDetails.findOne({
            where: {
                purpose: 'Buy new Nikes',
                value: '500'
            }
        }).then( borrowResponse => {
            const borrowPayment = {
                payment_value: '123.00',
                borrow: borrowResponse.borrow_id,
            };

            chai.request(app)
            .post('/borrow-payment/create')
            .send(borrowPayment)
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
        BorrowDetails.findOne({
            where: {
                purpose: 'Buy new Nikes',
                value: '500'
            }
        }).then( borrowResponse => {
            const borrowPayment = {
                payment_value: '123,00',
                payment_date: Helpers.getTimestamp(),
                borrow: borrowResponse.borrow_id,
            };
            chai.request(app)
            .post('/borrow-payment/create')
            .send(borrowPayment)
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

    it('It should post with payment date, if value is decimal and', (done) => {
        BorrowDetails.findOne({
            where: {
                purpose: 'Buy new Nikes',
                value: '500'
            }
        }).then( borrowResponse => {
            const borrowPayment = {
                payment_value: '123.00',
                payment_date: Helpers.getTimestamp(),
                borrow: borrowResponse.borrow_id,
            };
            chai.request(app)
            .post('/borrow-payment/create')
            .send(borrowPayment)
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.data.should.have.property('user_id');
                res.body.data.should.have.property('payment_date');
                res.body.data.should.have.property('created_at');
                res.body.data.should.have.property('borrow_id');
                res.body.data.should.have.property('payment_value').eql(123);
                res.body.should.have.property('message').eql('Borrow payment successfully added');
                done();
            });
        });
    });
});