AI Resume Screening Service

Overview

This project is a backend service that evaluates resumes against a given Job Description (JD) using a Large Language Model (LLM).
The system is designed using an asynchronous approach where resume processing happens in the background using a queue and worker.

Architecture :-

1. Flow of the system:

Client → API Server → Queue (Redis) → Worker → LLM → Database → API Response

2. Components:
API Server (Node.js + Express): Handles requests and pushes jobs to queue
Redis + Bull: Manages background jobs
Worker: Processes jobs and calls LLM
MongoDB: Stores results
LLM API: Generates evaluation

3. Features:
Upload resume (PDF)
Asynchronous processing (non-blocking API)
Resume evaluation using LLM
Structured response (score, verdict, missing skills, justification)
Retry handling for API failures
Data stored in MongoDB
Docker support
Integration testing

API Endpoints:-

1. Upload Resume:

POST /upload

Response:

{
  "evaluation_id": "uuid",
  "status": "queued"
}

2. Get Result:

GET /result/

Response:

{
  "evaluation_id": "uuid",
  "status": "completed",
  "score": 50,
  "verdict": "rejected",
  "missing_requirements": ["MongoDB"],
  "justification": "Candidate lacks required MongoDB experience."
}


3. Prompt Design

Prompt is stored outside the code in:

/prompts/evaluation_prompt.txt

This makes it easy to modify without changing code.

I used:

Fixed JSON format
Clear instructions to avoid invalid responses
Example input/output (few-shot)
Async Processing
API returns immediately with 202 status
Job is added to queue
Worker processes it separately
Result is saved in database
User can fetch result using API
Error Handling
Retry logic for LLM failures (like rate limit)
Basic fallback response if LLM fails
Status tracking (pending, completed, failed)
Docker Setup

Run full system using:

docker-compose up --build

This will start:

Server
Worker
MongoDB
Redis
Testing

Integration test is implemented using Jest and Supertest.

To run tests:

cd server
npm test

This test covers:

Upload API
Queue processing
Worker execution
Result retrieval
Environment Variables

Example:

PORT=5000
MONGO_URI=mongodb://mongo:27017/ai-resume
REDIS_HOST=redis
REDIS_PORT=6379
LLM_API_KEY=your_api_key
Project Structure
ai-resume-screening-service/
├── server/
├── worker/
├── prompts/
├── tests/
├── docker-compose.yml
├── README.md
Notes
API keys are not included in the repo
.env.example file is provided
Resume parsing is currently basic (can be improved)
Future Improvements
Better PDF parsing
UI dashboard
Real-time updates instead of polling

Author: Vishal Gupta