const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const BorrowDetails = require('../Database/Models/BorrowDetails');
const Sequalize = require('sequelize');

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
    it('It should not')
})