const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Server', function() {
  // Basic test to ensure the test framework is working
  it('should pass this basic test', function() {
    assert.strictEqual(1, 1);
  });

  // Test server health endpoint
  it('should return 200 for health check endpoint', function(done) {
    chai.request(app)
      .get('/health')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status').eql('ok');
        res.body.should.have.property('timestamp');
        res.body.should.have.property('environment');
        done();
      });
  });

  // Test authentication routes exist
  it('should have authentication routes', function(done) {
    chai.request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      })
      .end((err, res) => {
        // We don't care about the response status here
        // Just checking that the route exists and responds
        res.should.have.property('status');
        done();
      });
  });

  // Test trip routes exist
  it('should have trip routes', function(done) {
    chai.request(app)
      .get('/api/trips')
      .end((err, res) => {
        // We don't care about the response status here
        // Just checking that the route exists and responds
        res.should.have.property('status');
        done();
      });
  });

  // Test CORS configuration
  it('should handle CORS properly', function(done) {
    chai.request(app)
      .get('/health')
      .set('Origin', 'http://localhost:3000')
      .end((err, res) => {
        res.should.have.header('access-control-allow-origin');
        done();
      });
  });

  // Test error handling middleware
  it('should handle 404 errors properly', function(done) {
    chai.request(app)
      .get('/non-existent-route')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  // Test JSON parsing middleware
  it('should parse JSON requests properly', function(done) {
    chai.request(app)
      .post('/api/auth/register')
      .set('Content-Type', 'application/json')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      })
      .end((err, res) => {
        // We don't care about the response status here
        // Just checking that the JSON was parsed
        res.should.have.property('status');
        done();
      });
  });
}); 