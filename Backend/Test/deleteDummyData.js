process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();

const PartnerAccount = require('../Database/Models/PartnerAccount');
const BorrowDetails = require('../Database/Models/BorrowDetails');

chai.use(chaiHttp)



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