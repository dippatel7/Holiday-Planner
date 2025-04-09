const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const mongoose = require('mongoose');

// Check for required environment variables before importing app
const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET', 'PORT'];
requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
});

// Only import app after environment variables are verified
const app = require('../server');

chai.use(chaiHttp);

describe('Server', function() {
  // Increase timeout for all tests
  this.timeout(10000);

  before(async function() {
    // Additional environment check before running tests
    console.log('Environment variables check passed');
    console.log(`Running tests with NODE_ENV: ${process.env.NODE_ENV}`);
    
    // Ensure MongoDB is connected
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('Connected to MongoDB for testing');
    } catch (err) {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    }
  });

  after(async function() {
    // Clean up: close MongoDB connection
    try {
      await mongoose.connection.close();
      console.log('Closed MongoDB connection');
    } catch (err) {
      console.error('Error closing MongoDB connection:', err);
    }
  });

  // Basic test to ensure the test framework is working
  it('should pass this basic test', function() {
    assert.strictEqual(1, 1);
  });

  // A simple test that doesn't require MongoDB connection
  it('should return 404 for a non-existent route', function(done) {
    chai.request(app)
      .get('/nonexistent-route')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  // Test health check endpoint
  it('should return 200 for health check', function(done) {
    chai.request(app)
      .get('/health')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('ok');
        done();
      });
  });

  // Test auth routes
  describe('Auth Routes', function() {
    it('should return 401 for protected routes without token', function(done) {
      chai.request(app)
        .get('/api/auth/profile')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('should allow registration with valid data', async function() {
      const testUser = {
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        password: 'password123'
      };

      const res = await chai.request(app)
        .post('/api/auth/register')
        .send(testUser);

      res.should.have.status(201);
      res.body.should.have.property('token');
      res.body.should.have.property('user');
    });
  });

  // Test holiday routes
  describe('Holiday Routes', function() {
    it('should return 401 for unauthorized access', function(done) {
      chai.request(app)
        .get('/api/holidays')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  // Test trip routes
  describe('Trip Routes', function() {
    it('should return 401 for unauthorized access', function(done) {
      chai.request(app)
        .get('/api/trips')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });
}); 