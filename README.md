# Pixel Patches

## Description
Pixel Patches is a platform for creating and sharing 8x8 pixel art. Each piece of art, known as a 'patch', is unique—no duplicates are allowed on the site.

## Features
- **Create Pixel Art**: Design 8x8 pixel patches.
- **Unique Artworks**: Each patch is verified to be unique to maintain originality.

## Technologies

### Frontend
- **JavaScript**
- **HTML**
- **CSS**

### Backend
- **JavaScript**
- **Node.js**
- **Express**
- **MongoDB**


## Setup and Run Frontend
1. Set `BACKEND_URL` in /js/utils/constants.js 
2. run website

## Setup and Run Backend

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) instance

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pixel-patches.git
   cd pixel-patches
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Configuration
1. Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=your_port_number
   DB_URL=your_database_url
   ```

### Running the Server
1. Start the server:
   ```bash
   npm start
   ```

### Running Tests
1. Run the tests:
   ```bash
   npm test
