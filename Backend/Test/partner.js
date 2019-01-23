process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const PartnerAccount = require('../Database/Models/PartnerAccount');

chai.use(chaiHttp);

describe('Partner', (req, res, next) => {
    beforeEach((done) => {
        PartnerAccount.destroy({
            where: {}
        });
        done();
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
                    res.body.length.should.be.eql(0);
                    console.log(err);
                done();
                });
        });
    });
});
