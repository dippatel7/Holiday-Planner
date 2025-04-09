# CI/CD Workflows

This directory contains GitHub Actions workflows for Continuous Integration (CI) and Continuous Deployment (CD) of the Holiday Planner application.

## Workflow Files

### CI Pipeline (`ci.yml`)

The CI pipeline runs on:
- Push to `main`, `develop`, and `holidayfeatures` branches
- Pull requests to `main`, `develop`, and `holidayfeatures` branches

It performs the following tasks:
1. **Test Job**:
   - Installs backend dependencies
   - Runs backend tests
   - Installs frontend dependencies
   - Builds the frontend

2. **Build Job** (runs only on push events):
   - Builds the backend
   - Builds the frontend

### CD Pipeline (`cd.yml`)

The CD pipeline runs after the CI pipeline completes successfully on:
- `develop` branch (deploys to staging)
- `main` branch (deploys to production)

It performs the following tasks:

#### Staging Deployment:
1. Installs dependencies
2. Builds the frontend
3. Deploys to the staging server
4. Runs integration tests
5. Runs performance tests

#### Production Deployment:
1. Installs dependencies
2. Builds the frontend
3. Implements blue-green deployment:
   - Prepares blue environment
   - Deploys to blue environment
   - Switches traffic to blue environment
   - Verifies deployment
   - Rolls back on failure

## Required Secrets

The following secrets need to be configured in the GitHub repository:

### For CI Pipeline:
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret for JWT token generation
- `PORT`: Port number for the backend server

### For CD Pipeline:
- `STAGING_HOST`: Hostname or IP of the staging server
- `PRODUCTION_HOST`: Hostname or IP of the production server
- `SSH_USERNAME`: SSH username for deployment
- `SSH_PRIVATE_KEY`: SSH private key for deployment

## Deployment Environments

### Staging
- URL: [Staging URL]
- Branch: `develop`
- Purpose: Testing new features before production deployment

### Production
- URL: http://13.236.135.130/
- Branch: `main`
- Purpose: Live environment for end users

## Blue-Green Deployment

The production deployment uses a blue-green deployment strategy to minimize downtime:
1. New version is deployed to the blue environment
2. Traffic is switched from green to blue
3. If verification fails, traffic is switched back to green 