# Apartment Listing Application

## Overview

This repository contains an apartment listing application built as part of a hiring task. The application consists of two main components:

- **Frontend:** A Next.js project using TypeScript.
- **Backend:** A Node.js project using TypeScript.

## Features

### Frontend
- Apartment listing page.
- Apartment details page.
- Responsive design optimized for both mobile and web.

### Backend
- API endpoints for listing apartments and retrieving apartment details.
- API for fetching options like projects and amenities if needed.

## API Documentation
The application includes Swagger for API documentation. You can access it at the following URL once the backend server is running: http://localhost:5000/api-docs/#/Listings

## Getting Started

To run the application locally without using Docker, Make sure docker eniroment varibale is set to FALSE in frontend.

To run the application locally using Docker, ensure that Docker and Docker Compose are installed on your machine. You can download them from [Docker's official website](https://www.docker.com/get-started).

Once you have Docker set up, you can run the application with the following command:

```bash
docker-compose up --build


