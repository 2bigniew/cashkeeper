const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const BorrowDetails = require('../Database/Models/BorrowDetails');
const PartnerAccount = require('../Database/Models/PartnerAccount');
const Sequalize = require('sequelize');
const Helpers = require('../Helpers/Helpers');

chai.use(chaiHttp);

describe('DELETE ALL FROM borrow_details', () => {
    it('It should remove all from borrow_details table', (done) => {
        const Op = Sequalize.Op;
    
        BorrowDetails.destroy({
            where: {
                borrow_id: {
                    [Op.gte]: 0
                }
            }
        });
        done();
    });
});

describe('/GET Borrow', () => {
    it('It should get all borrows', (done) => {
        chai.request(app)
            .get('/borrow/list')
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

describe('/POST Borrow', () => {
    it('It should not post without borrow-date or purpose', (done) => {
        PartnerAccount.findOne({
            where: {
                firstname: 'URoberto',
                lastname: 'UFirmino'
            }
        }).then( partnerResponse => {
            const borrow = {
                value: '500',
                partner: partnerResponse.partner_id
            };

            chai.request(app)
                .post('/borrow/create')
                .send(borrow)
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
            const borrow = {
                value: '5oo',
                partner: partnerResponse.partner_id,
                "borrow-date": Helpers.getTimestamp(),
                purpose: 'Buy new Nikes'
            };

            chai.request(app)
                .post('/borrow/create')
                .send(borrow)
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
        const borrow = {
            value: '500',
            partner: null
        };

        chai.request(app)
            .post('/borrow/create')
            .send(borrow)
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
            const borrow = {
                value: '500',
                partner: partnerResponse.partner_id,
                "borrow-date": Helpers.getTimestamp(),
                purpose: 'Buy new Nikes'
            };

            chai.request(app)
                .post('/borrow/create')
                .send(borrow)
                .end((err, res) => {
                    should.not.exist(err);
                    should.exist(res);
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.data.should.have.property('borrow_serial');
                    res.body.data.should.have.property('borrow_date');
                    res.body.data.should.have.property('is_completed');
                    res.body.data.should.have.property('value');
                    res.body.data.should.have.property('purpose').eql('Buy new Nikes');
                    res.body.should.have.property('message').eql('Borrow successfully added');
                    done();
                });
        });
    });

});

describe('/PUT Borrow', () => {
    it('It should not update borrow without borrow id, or partner id', (done) => {
        chai.request(app)
            .put('/borrow/complete')
            .end((err, res) => {
                should.exist(res);
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('name').eql('RouteError');
                done();
            });
    });

    it('It should update borrow, set complete to true', (done) => {
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
                .put('/borrow/complete')
                .send(borrow)
                .end((err, res) => {
                    should.not.exist(err);
                    should.exist(res);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.data.should.have.property('borrow_date');
                    res.body.data.should.have.property('borrow_serial');
                    res.body.data.should.have.property('value');
                    res.body.data.should.have.property('is_completed').eql(true);
                    res.body.should.have.property('message').eql('Borrow updated successfully');
                    done();
                });
            });

    });

});
