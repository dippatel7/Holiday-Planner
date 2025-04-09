const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const sinon = require('sinon');
const { expect } = chai;

// Load test environment variables
const dotenv = require('dotenv');
dotenv.config({ path: '.env.test' });

// Import app and other dependencies after loading env
const app = require('../server');
const Trip = require('../models/Trip');
const { getTrips, addTrip, updateTrip, deleteTrip } = require('../controllers/tripController');

chai.use(chaiHttp);

describe('Trip Function Tests', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('AddTrip Function Test', () => {
    it('should create a new trip successfully', async () => {
      const req = {
        user: { id: new mongoose.Types.ObjectId() },
        body: {
          name: "Summer Vacation",
          destination: "Hawaii",
          startDate: "2024-07-01",
          endDate: "2024-07-14",
          description: "Family vacation in Hawaii"
        }
      };

      const createdTrip = { _id: new mongoose.Types.ObjectId(), ...req.body, userId: req.user.id };
      const createStub = sandbox.stub(Trip.prototype, 'save').resolves(createdTrip);

      const res = {
        status: sandbox.stub().returnsThis(),
        json: sandbox.spy()
      };

      await addTrip(req, res);

      expect(createStub.calledOnce).to.be.true;
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(createdTrip)).to.be.true;
    });

    it('should return 500 if an error occurs', async () => {
      const saveStub = sandbox.stub(Trip.prototype, 'save').throws(new Error('DB Error'));

      const req = {
        user: { id: new mongoose.Types.ObjectId() },
        body: {
          name: "Summer Vacation",
          destination: "Hawaii",
          startDate: "2024-07-01",
          endDate: "2024-07-14",
          description: "Family vacation in Hawaii"
        }
      };

      const res = {
        status: sandbox.stub().returnsThis(),
        json: sandbox.spy()
      };

      await addTrip(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;
    });
  });

  describe('UpdateTrip Function Test', () => {
    it('should update trip successfully', async () => {
      const tripId = new mongoose.Types.ObjectId();
      const userId = new mongoose.Types.ObjectId();
      const existingTrip = {
        _id: tripId,
        name: "Old Trip",
        destination: "Old Destination",
        startDate: new Date(),
        endDate: new Date(),
        description: "Old Description",
        userId,
        save: sandbox.stub().resolvesThis()
      };

      const findByIdStub = sandbox.stub(Trip, 'findById').resolves(existingTrip);

      const req = {
        params: { id: tripId },
        body: {
          name: "New Trip",
          destination: "New Destination",
          description: "New Description"
        },
        user: { id: userId }
      };

      const res = {
        json: sandbox.spy(),
        status: sandbox.stub().returnsThis()
      };

      await updateTrip(req, res);

      expect(existingTrip.name).to.equal("New Trip");
      expect(existingTrip.destination).to.equal("New Destination");
      expect(existingTrip.description).to.equal("New Description");
      expect(res.json.calledOnce).to.be.true;
    });

    it('should return 404 if trip is not found', async () => {
      const findByIdStub = sandbox.stub(Trip, 'findById').resolves(null);

      const req = {
        params: { id: new mongoose.Types.ObjectId() },
        body: {},
        user: { id: new mongoose.Types.ObjectId() }
      };

      const res = {
        status: sandbox.stub().returnsThis(),
        json: sandbox.spy()
      };

      await updateTrip(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Trip not found' })).to.be.true;
    });

    it('should return 500 on error', async () => {
      const findByIdStub = sandbox.stub(Trip, 'findById').throws(new Error('DB Error'));

      const req = {
        params: { id: new mongoose.Types.ObjectId() },
        body: {},
        user: { id: new mongoose.Types.ObjectId() }
      };

      const res = {
        status: sandbox.stub().returnsThis(),
        json: sandbox.spy()
      };

      await updateTrip(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.called).to.be.true;
    });
  });

  describe('GetTrips Function Test', () => {
    it('should return trips for the given user', async () => {
      const userId = new mongoose.Types.ObjectId();
      const trips = [
        { _id: new mongoose.Types.ObjectId(), name: "Trip 1", userId },
        { _id: new mongoose.Types.ObjectId(), name: "Trip 2", userId }
      ];

      const findStub = sandbox.stub(Trip, 'find').resolves(trips);

      const req = { user: { id: userId } };
      const res = {
        json: sandbox.spy(),
        status: sandbox.stub().returnsThis()
      };

      await getTrips(req, res);

      expect(findStub.calledOnceWith({ userId })).to.be.true;
      expect(res.json.calledWith(trips)).to.be.true;
    });

    it('should return 500 on error', async () => {
      const findStub = sandbox.stub(Trip, 'find').throws(new Error('DB Error'));

      const req = { user: { id: new mongoose.Types.ObjectId() } };
      const res = {
        json: sandbox.spy(),
        status: sandbox.stub().returnsThis()
      };

      await getTrips(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;
    });
  });

  describe('DeleteTrip Function Test', () => {
    it('should delete a trip successfully', async () => {
      const tripId = new mongoose.Types.ObjectId();
      const userId = new mongoose.Types.ObjectId();
      const trip = {
        _id: tripId,
        userId
      };

      const findByIdStub = sandbox.stub(Trip, 'findById').resolves(trip);
      const deleteOneStub = sandbox.stub(Trip, 'findByIdAndDelete').resolves(trip);

      const req = {
        params: { id: tripId },
        user: { id: userId }
      };

      const res = {
        status: sandbox.stub().returnsThis(),
        json: sandbox.spy()
      };

      await deleteTrip(req, res);

      expect(findByIdStub.calledOnceWith(tripId)).to.be.true;
      expect(deleteOneStub.calledOnceWith(tripId)).to.be.true;
      expect(res.json.calledWith({ message: 'Trip deleted' })).to.be.true;
    });

    it('should return 404 if trip is not found', async () => {
      const findByIdStub = sandbox.stub(Trip, 'findById').resolves(null);

      const req = {
        params: { id: new mongoose.Types.ObjectId() },
        user: { id: new mongoose.Types.ObjectId() }
      };

      const res = {
        status: sandbox.stub().returnsThis(),
        json: sandbox.spy()
      };

      await deleteTrip(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Trip not found' })).to.be.true;
    });

    it('should return 500 if an error occurs', async () => {
      const findByIdStub = sandbox.stub(Trip, 'findById').throws(new Error('DB Error'));

      const req = {
        params: { id: new mongoose.Types.ObjectId() },
        user: { id: new mongoose.Types.ObjectId() }
      };

      const res = {
        status: sandbox.stub().returnsThis(),
        json: sandbox.spy()
      };

      await deleteTrip(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.called).to.be.true;
    });
  });
}); 