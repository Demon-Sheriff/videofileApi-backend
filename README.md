# Video Management API

## Description
This project is a Node.js application for managing video operations, including uploading, trimming, and merging videos using Express.js and Sequelize.

## Setup Instructions

### Prerequisites
- Node.js (version 14.x or higher)
- npm (Node Package Manager)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/video-management-api.git
   cd videofileApi-backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Set up the database (adjust configuration as needed in `config/config.json`):
  ```bash
  npx sequelize db:create
  npx sequelize db:migrate
  ```
---
### Running the API server
- To start the API server, run:
  ```bash
  nodemon app.js
  ```
---
### API Endpoints

- **POST** `/video/upload`: Upload a video.
- **POST** `/video/trim`: Trim a video.
- **POST** `/video/merge`: Merge multiple videos.
- **POST** `/video/generateLink`: Generate an expiring link for a video.
---
### Additional Notes

- Make sure to have **ffmpeg** installed on your system for video processing functionalities to work.
- For file uploads, you can use tools like **Postman** or **cURL**.
---
### Areas for Improvement
- If given more time, I would enhance error handling, add input validation, and implement testing for more robust functionality.
---
### License
This project is licensed under the MIT License - see the LICENSE file for details.

   
