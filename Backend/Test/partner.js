process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const PartnerAccount = require('../Database/Models/PartnerAccount');
const Sequalize = require('sequelize');

chai.use(chaiHttp);

describe('DELETE ALL FROM partner_account', () => {
    it('It should remove all from partner table', (done) => {
        const Op = Sequalize.Op;
    
        PartnerAccount.destroy({
            where: {
                partner_id: {
                    [Op.gte]: 0
                }
            }
        });
        done();
    });
});


describe('/GET Partner', () => {
    it('It should get all partners', (done) => {
        chai.request(app)
            .get('/partner/list')
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('array');
                // res.body.length.should.be.eql(0);
            done();
            });
    });
});

describe('/POST Partner', () => {
    it('It should not POST Partner without firstname, lastname, email', (done) => {
        const partner = {
            firstname: '',
            lastname: '',
            street: 'Anfield Road',
            number: 'L4',
            local: '0TH',
            city: 'Liverpool',
            country: 'United Kingdom',
            mobile: '123456798',
            email: '',
            bank_account: '00011122233344455566677789',
        };

        chai.request(app)
            .post('/partner/create')
            .send(partner)
            .end((err, res) => {
                should.exist(res);
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('fileName');
                res.body.should.have.property('name').eql('RouteError');
                done();
            });
    });

    it('It should not POST Partner when firstname, lastname, email is null', (done) => {
        const partner = {
            street: 'Anfield Road',
            number: 'L4',
            local: '0TH',
            city: 'Liverpool',
            country: 'United Kingdom',
            mobile: '123456798',
            bank_account: '00011122233344455566677789',
        };

        chai.request(app)
            .post('/partner/create')
            .send(partner)
            .end((err, res) => {
                should.exist(res);
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('name').eql('TypeError');
                done();
            });
    });

    it('It should POST Partner with firstname, lastname, email', (done) => {
        const partner = {
            firstname: 'Roberto',
            lastname: 'Firmino',
            street: 'Anfield Road',
            number: 'L4',
            local: '0TH',
            city: 'Liverpool',
            country: 'United Kingdom',
            mobile: '123456798',
            email: 'bobbyfirmino@lfc.com',
            bank_account: '00011122233344455566677789',
        };

        chai.request(app)
            .post('/partner/create')
            .send(partner)
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.data.should.have.property('partner_id');
                res.body.data.should.have.property('firstname');
                res.body.data.should.have.property('lastname');
                res.body.data.should.have.property('bank_account');
                res.body.data.should.have.property('email').eql('bobbyfirmino@lfc.com');
                res.body.should.have.property('message').eql('Parter successfully added');
                done();
            });
    });

    it('It should not POST  if Partner exist', (done) => {
        const partner = {
            firstname: 'Roberto',
            lastname: 'Firmino',
            street: 'Anfield Road',
            number: 'L4',
            local: '0TH',
            city: 'Liverpool',
            country: 'United Kingdom',
            mobile: '123456798',
            email: 'bobbyfirmino@lfc.com',
            bank_account: '00011122233344455566677789',
        };

        chai.request(app)
            .post('/partner/create')
            .send(partner)
            .end((err, res) => {
                // should.exist(err);
                should.exist(res);
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Istnieje juz osoba o takim imieniu, nazwisku i adresie email');
                res.body.should.have.property('fileName');
                res.body.should.have.property('name').eql('RouteError');
                done();
            });
    });

    it('It should get partner data by lastname', (done) => {
        const lastname = 'Firmino';

        chai.request(app)
            .get('/partner/'+lastname)
            .end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.data[0].should.have.property('partner_id');
                res.body.data[0].should.have.property('firstname');
                res.body.data[0].should.have.property('lastname');
                res.body.data[0].should.have.property('bank_account');
                res.body.data[0].should.have.property('email').eql('bobbyfirmino@lfc.com');
                done();
            });
    });
});

describe('/PUT Partner', () => {
    it('It should update partner data by partner_id', (done) => {
        PartnerAccount.findOne({
            where: {
                firstname: 'Roberto',
                lastname: 'Firmino'
            }
        }).then( partnerResponse => {
            const partner = {
                firstname: 'URoberto',
                lastname: 'UFirmino',
                street: 'UAnfield Road',
                number: 'UL4',
                local: 'U0TH',
                city: 'ULiverpool',
                country: 'UUnited Kingdom',
                mobile: 'U123456798',
                email: 'Ubobbyfirmino@lfc.com',
                bank_account: 'U00011122233344455566677789',
                partnerid: partnerResponse.partner_id
            };
        
            chai.request(app)
                .put('/partner/update')
                .send(partner)
                .end((err, res) => {
                    should.not.exist(err);
                    should.exist(res);
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.data.should.have.property('partner_id');
                    res.body.data.should.have.property('firstname');
                    res.body.data.should.have.property('lastname');
                    res.body.data.should.have.property('bank_account');
                    res.body.data.should.have.property('email').eql('Ubobbyfirmino@lfc.com');
                    res.body.should.have.property('message').eql('Partner updated successfully');
                });
        });
        done();
        
    });
});