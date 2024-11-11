# ClipSphere

**ClipSphere** is a project inspired by YouTube, built to learn the **Vue.js** framework. The goal of this project is to improve my skills in working with a front-end framework, as well as to enhance my ability to work with APIs, particularly the **YouTube Data API v3**.

## Objectives

- **Learn Vue.js**: I chose Vue.js because of its simplicity and flexibility. The primary goal of this project is to improve my skills in working with a front-end framework by building a real-world application.
- **Improve API Integration Skills**: Another objective is to enhance my ability to work with APIs, specifically by integrating the YouTube Data API v3 to fetch and display video content on the platform.

## Features

- **Video Search**: Search for videos from the YouTube API and display results in an easy-to-use interface.
- **Video Player**: Watch videos directly on the site with an embedded video player.
- **Responsive UI**: A clean and mobile-friendly user interface built with Vue.js.

## Tech Stack

- **Frontend**: Vue.js
- **API**: YouTube Data API v3
- **Other**: HTML5, CSS3, JavaScript

## Requirements

Before installing, ensure you have the following requirements:

- [Node.js](https://nodejs.org/) (for running the development server & compiling front-end assets)
- [NPM](https://www.npmjs.com/) (for managing front-end dependencies)
- [Google Developer Console](https://console.developers.google.com/) account (for creating OAuth credentials & YouTube Data API v3 key)

## Installation

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/TiagoMurtinho/ClipSphere.git

2. Navigate to the project directory:
   ```bash
   cd ClipSphere

3. Install dependencies:
   ```bash
   npm install

4. In the `src` folder, locate the `api.js` file and add your YouTube Data API key:

   - Open the `src/api.js` file and replace the placeholder with your own YouTube Data API v3 key.
   - If you don't have an API key, you can obtain one from the [Google Developer Console](https://console.developers.google.com/).
  
5. The project also uses **OAuth** for authentication. To configure the OAuth client ID:

   - Navigate to the `src/components/navbar` folder.
   - Open the `NavBar.vue` file.
   - In the `onMounted()` function, you will find the following code:
     ```javascript
     onMounted(() => {
       initGoogleClient('YourClientId'); 

       const authStatus = localStorage.getItem('isAuthenticated');
       if (authStatus === 'true') {
         isAuthenticated.value = true;
       }
     });
     ```
   - Replace `'YourClientId'` with your own OAuth client ID. You can get the client ID by creating an OAuth 2.0 credential in the [Google Developer Console](https://console.developers.google.com/).

6. Start the development server:
   ```bash
   npm run dev

7. Now, open [http://localhost:5173/](http://localhost:5173/) in your browser to view the app.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or suggestions, feel free to reach out:

- **Name:** Tiago Murtinho
- **Email:** tiago_miguelmurtinho@hotmail.com
- **LinkedIn:** [Tiago Murtinho](https://www.linkedin.com/in/tiago-murtinho/)
   
   
