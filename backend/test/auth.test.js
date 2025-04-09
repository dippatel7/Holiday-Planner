const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const User = require('../models/User');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Authentication API', () => {
  beforeEach(async () => {
    // Clear the users collection before each test
    await User.deleteMany({});
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const res = await chai
        .request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        });

      expect(res).to.have.status(201);
      expect(res.body).to.have.property('token');
      expect(res.body).to.have.property('user');
      expect(res.body.user).to.have.property('email', 'test@example.com');
    });

    it('should not register a user with existing email', async () => {
      // First, create a user
      await User.create({
        name: 'Existing User',
        email: 'test@example.com',
        password: 'password123'
      });

      const res = await chai
        .request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        });

      expect(res).to.have.status(400);
      expect(res.body).to.have.property('message', 'User already exists');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Create a test user
      await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });
    });

    it('should login with correct credentials', async () => {
      const res = await chai
        .request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('token');
      expect(res.body).to.have.property('user');
    });

    it('should not login with incorrect password', async () => {
      const res = await chai
        .request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        });

      expect(res).to.have.status(401);
      expect(res.body).to.have.property('message', 'Invalid credentials');
    });
  });
}); 