const chai = require('chai');
const chaiHttp = require('chai-http');
const http = require('http');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const sinon = require('sinon');
const { expect } = chai;

// Load test environment variables
dotenv.config({ path: '.env.test' });

// Import app and other dependencies after loading env
const app = require('../server');
const connectDB = require('../config/db');
const Task = require('../models/Task');
const { updateTask, getTasks, addTask, deleteTask } = require('../controllers/taskController');

chai.use(chaiHttp);
let server;
let port;

describe('AddTask Function Test', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should create a new task successfully', async () => {
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
      body: { title: "New Task", description: "Task description", deadline: "2025-12-31" }
    };

    const createdTask = { _id: new mongoose.Types.ObjectId(), ...req.body, userId: req.user.id };
    const createStub = sandbox.stub(Task, 'create').resolves(createdTask);

    const res = {
      status: sandbox.stub().returnsThis(),
      json: sandbox.spy()
    };

    await addTask(req, res);

    expect(createStub.calledOnceWith({ userId: req.user.id, ...req.body })).to.be.true;
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith(createdTask)).to.be.true;
  });

  it('should return 500 if an error occurs', async () => {
    const createStub = sandbox.stub(Task, 'create').throws(new Error('DB Error'));

    const req = {
      user: { id: new mongoose.Types.ObjectId() },
      body: { title: "New Task", description: "Task description", deadline: "2025-12-31" }
    };

    const res = {
      status: sandbox.stub().returnsThis(),
      json: sandbox.spy()
    };

    await addTask(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;
  });
});

describe('Update Function Test', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should update task successfully', async () => {
    const taskId = new mongoose.Types.ObjectId();
    const userId = new mongoose.Types.ObjectId();
    const existingTask = {
      _id: taskId,
      title: "Old Task",
      description: "Old Description",
      completed: false,
      deadline: new Date(),
      userId,
      save: sandbox.stub().resolvesThis()
    };

    const findByIdStub = sandbox.stub(Task, 'findById').resolves(existingTask);

    const req = {
      params: { id: taskId },
      body: { title: "New Task", completed: true },
      user: { id: userId }
    };

    const res = {
      json: sandbox.spy(),
      status: sandbox.stub().returnsThis()
    };

    await updateTask(req, res);

    expect(existingTask.title).to.equal("New Task");
    expect(existingTask.completed).to.equal(true);
    expect(res.status.called).to.be.false;
    expect(res.json.calledOnce).to.be.true;
  });

  it('should return 404 if task is not found', async () => {
    const findByIdStub = sandbox.stub(Task, 'findById').resolves(null);

    const req = {
      params: { id: new mongoose.Types.ObjectId() },
      body: {},
      user: { id: new mongoose.Types.ObjectId() }
    };

    const res = {
      status: sandbox.stub().returnsThis(),
      json: sandbox.spy()
    };

    await updateTask(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ message: 'Task not found' })).to.be.true;
  });

  it('should return 500 on error', async () => {
    const findByIdStub = sandbox.stub(Task, 'findById').throws(new Error('DB Error'));

    const req = {
      params: { id: new mongoose.Types.ObjectId() },
      body: {},
      user: { id: new mongoose.Types.ObjectId() }
    };

    const res = {
      status: sandbox.stub().returnsThis(),
      json: sandbox.spy()
    };

    await updateTask(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.called).to.be.true;
  });
});

describe('GetTask Function Test', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should return tasks for the given user', async () => {
    const userId = new mongoose.Types.ObjectId();
    const tasks = [
      { _id: new mongoose.Types.ObjectId(), title: "Task 1", userId },
      { _id: new mongoose.Types.ObjectId(), title: "Task 2", userId }
    ];

    const findStub = sandbox.stub(Task, 'find').resolves(tasks);

    const req = { user: { id: userId } };
    const res = {
      json: sandbox.spy(),
      status: sandbox.stub().returnsThis()
    };

    await getTasks(req, res);

    expect(findStub.calledOnceWith({ userId })).to.be.true;
    expect(res.json.calledWith(tasks)).to.be.true;
    expect(res.status.called).to.be.false;
  });

  it('should return 500 on error', async () => {
    const findStub = sandbox.stub(Task, 'find').throws(new Error('DB Error'));

    const req = { user: { id: new mongoose.Types.ObjectId() } };
    const res = {
      json: sandbox.spy(),
      status: sandbox.stub().returnsThis()
    };

    await getTasks(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;
  });
});

describe('DeleteTask Function Test', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should delete a task successfully', async () => {
    const taskId = new mongoose.Types.ObjectId();
    const userId = new mongoose.Types.ObjectId();
    const task = {
      _id: taskId,
      userId,
      remove: sandbox.stub().resolves()
    };

    const findByIdStub = sandbox.stub(Task, 'findById').resolves(task);

    const req = {
      params: { id: taskId },
      user: { id: userId }
    };

    const res = {
      status: sandbox.stub().returnsThis(),
      json: sandbox.spy()
    };

    await deleteTask(req, res);

    expect(findByIdStub.calledOnceWith(taskId)).to.be.true;
    expect(task.remove.calledOnce).to.be.true;
    expect(res.json.calledWith({ message: 'Task deleted' })).to.be.true;
  });

  it('should return 404 if task is not found', async () => {
    const findByIdStub = sandbox.stub(Task, 'findById').resolves(null);

    const req = {
      params: { id: new mongoose.Types.ObjectId() },
      user: { id: new mongoose.Types.ObjectId() }
    };

    const res = {
      status: sandbox.stub().returnsThis(),
      json: sandbox.spy()
    };

    await deleteTask(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ message: 'Task not found' })).to.be.true;
  });

  it('should return 500 if an error occurs', async () => {
    const findByIdStub = sandbox.stub(Task, 'findById').throws(new Error('DB Error'));

    const req = {
      params: { id: new mongoose.Types.ObjectId() },
      user: { id: new mongoose.Types.ObjectId() }
    };

    const res = {
      status: sandbox.stub().returnsThis(),
      json: sandbox.spy()
    };

    await deleteTask(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.called).to.be.true;
  });
});