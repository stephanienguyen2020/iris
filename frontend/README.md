# IRIS Privacy App

This application provides privacy-first content processing for social media posts.

## Prerequisites

- Node.js (v16.x or later recommended)
- npm (usually comes with Node.js)

## Installation

1. Clone the repository:
```
git clone https://github.com/stephanienguyen2020/iris_techstars.git
cd iris-techstars
```
2. Install dependencies:
```
npm install
```
## Running the Application
1. Start the development server:
```
npm start
```
2. Open your web browser and navigate to `http://localhost:3000`

## Troubleshooting

If you encounter issues related to OpenSSL, try one of these solutions:

1. Use the `--openssl-legacy-provider` flag:
```
NODE_OPTIONS=--openssl-legacy-provider npm start
```

2. For Windows users (in Command Prompt):
```
set NODE_OPTIONS=--openssl-legacy-provider && npm start
```
## Building for Production

To create a production build:
```
npm run build
```
The built files will be in the `build` directory.

## Technologies Used

- React

- Material-UI (MUI)
