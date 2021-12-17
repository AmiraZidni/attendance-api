var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../index');

var expect = chai.expect;

chai.use(chaiHttp);

describe('Attendance App', function() {
    it('should responds with status 200 and OK', function(done) {
        chai.request(app)
        .get('/v1')
        .end(function(err, res) {
            expect(res).to.have.status(200);
            expect(res.text).to.equal("OK");
            done();
        });
    });
});
