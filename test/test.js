var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var should = chai.should();

chai.use(chaiHttp);
describe('MYOB', function() {
    it('Getting list of comapnies', function (done) {
        this.timeout(5000);
        chai.request(server)
            .get('/')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });
    it('Getting list of contacts', function (done) {
        this.timeout(5000);
        chai.request(server)
            .get('/contacts')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });
    it('Getting contacts details', function (done) {
        this.timeout(5000);
        chai.request(server)

            .get('/contacts/Hp')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });

    it('creating a new contact', function (done) {
        this.timeout(5000);
        chai.request(server)
            .post('/contacts/new')
            .send({ TaxCodeId: 'GST', FreightTaxCodeId: 'GST',CoLastName:"M-N Stationery Supplies",EnteredId:"Swamy" })
            .end(function (err, res) {
                res.should.have.status(201);
                done();
            });
    });
});