
# Drivex-qa

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Interactive Tools](#interactive-tools)
- [Contributing](#contributing)
- [License](#license)

## Overview

The **Drivex-QA** repository demonstrates a comprehensive solution to the QA requirements for the DriveX platform.

## Features

- Automated testing for key features of the DriveX platform.
- Modular and reusable testing components.
- Includes integration with popular testing frameworks.
- Detailed error handling and validation logic.
- Easy setup and deployment for local testing or CI/CD pipelines.
- Interactive tools like chat-based predictions and data preview for enhanced QA automation and validation.

## Technologies Used

The solution is built using the following technologies:

- **Programming Language**: JavaScript (Node.js)
- **Testing Framework**: Jest, Mocha, Chai
- **CI/CD Integration**: GitHub Actions (for automated deployment and tests)
- **Other Tools**: Docker (for containerization), Postman (for API testing)

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/Adharsh02/Drivex-qa.git
    ```

2. Navigate to the project directory:
    ```bash
    cd Drivex-qa
    ```

3. Install the required dependencies:
    ```bash
    npm install
    ```

4. Set up environment variables (if necessary):
    - Create a `.env` file in the root directory.
    - Add the required environment variables as per your project's configuration.

5. Run the application or test suite:

    - To run the tests:
        ```bash
        npm test
        ```

    - For Dockerized environments (if applicable):
        ```bash
        docker-compose up
        ```

## Usage

1. To run the application, use the following command after installation:
    ```bash
    npm start
    ```

2. Access the app via your browser at `http://localhost:5173` (or any relevant URL depending on the project).

3. The testing scripts can be invoked by running:
    ```bash
    npm test
    ```

## Folder Structure

```
Drivex-qa/
├── src/
│   ├── components/         # Core testing components or modules
│   ├── services/           # Business logic related to tests
│   ├── models/             # Data models for testing
│   ├── routes/             # API testing routes (if applicable)
│   └── utils/              # Utility functions for tests
├── tests/                  # Unit and integration tests
├── public/                 # Static assets (if applicable)
├── .env                    # Environment variables
├── README.md               # Project documentation
├── package.json            # Node.js dependencies
└── docker-compose.yml      # Docker configurations (if applicable)
```

## Interactive Tools

The **Drivex-QA** repository includes several interactive tools designed to enhance the quality assurance process:

### **Prediction for Chat**
- The system leverages AI-powered chat prediction tools, providing real-time responses to test queries.
- You can test how the system reacts to specific inputs, simulating user interactions, and evaluate the accuracy and consistency of responses.

### **Data Preview**
- The data preview tool allows you to inspect the data outputs in real-time, ensuring that your backend systems are returning correct and expected data.
- It visualizes raw data in a user-friendly format, making debugging and data validation easier and more efficient.

These interactive tools are integral to the testing framework, as they provide a way to simulate real-world use cases and data flows, ensuring the reliability of the DriveX platform.

## **Images of the Project**
![Screenshot 2025-01-18 235432](https://github.com/user-attachments/assets/5c935122-1dd0-4273-b1da-5bafe7e90172)
![Screenshot 2025-01-18 235524](https://github.com/user-attachments/assets/3a54c550-0577-474e-8288-747096c5bd33)



## License

This project is licensed under the MIT License.

---
