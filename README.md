<a name="readme-top"></a>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About This Project

[Live preview](https://oauth-template-app.herokuapp.com)

Template built with Express and React to speed up build process of an auth-session based app.

### Features:

-   'Sign in' and 'Sign up' forms with data validation and password encryption
-   Account verification and password recovery with Nodemailer
-   OpenID buttons to authorize with external providers such as Google, Github or Facebook
-   Rapid fire log in attacks protection
-   User database schema design with Mongoose
-   Client side auth session with Json Web Token
-   Mobile first responsive UI design
-   Reusable React components
-   CSS in JS with Tailwind

### Client

-   React.js (Vite)
-   Redux Toolkit
-   React Router Dom v6
-   Tailwind CSS

### Server

-   Express.js
-   Mongoose
-   Json Web Token
-   Bcrypt
-   Nodemailer

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

You must install Node LTS version on your computer (includes npm). Download the installer at
[https://nodejs.org](https://nodejs.org).

### Installation

_To get this project running in a development environment follow these steps._

1.  Clone the repo
    ```sh
    git clone https://github.com/xdguido/express-react-template
    ```
2.  Install NPM packages for the server
    ```sh
    npm install
    ```
3.  Install NPM packages for the client
    ```sh
    cd ./frontend
    npm install
    ```
4.  Create your environment variables from the `.env.example` file. You should name it `.env` in order to use it.
    ```
    MONGO_URI = your mongo database uri
    JWT_SECRET = random string
    JWT_PASS_SECRET = random string 1
    JWT_EMAIL_SECRET = random string 2
    GOOGLE_CLIENT_ID = google app client id
    GOOGLE_CLIENT_SECRET = google app secret key
    GITHUB_CLIENT_ID = github app client id
    GITHUB_CLIENT_SECRET = github app secret key
    FACEBOOK_CLIENT_ID = facebook app client id
    FACEBOOK_CLIENT_SECRET = facebook app secret key
    GMAIL_USER = gmail direction used for nodemailer delivery
    GMAIL_PASS = gmail password
    HOST = in production this is your host, else null
    ```
5.  Run the NPM script to start the app in local environment
    ```sh
    npm run dev
    ```

<!-- USAGE EXAMPLES -->

## Usage

1. Register yourself with an email and password. Verify your account with the link the app send to your email. _Voila_, log in with your new account.
2. Use Google, Github or Facebook whether to register or log in yourself.

<!-- ROADMAP -->

## Roadmap

-   [ ] Dark mode
-   [ ] Edit your profile
-   [ ] Delete your profile
-   [ ] Honey pot register inputs
-   [ ] PostgreSQL database Support
-   [ ] Multi-language Support
    -   [ ] Spanish

See the [open issues](https://github.com/xdguido/express-react-template/issues) for a full list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- CONTACT -->

## Contact

Guido Gennari - [@Linkedin](https://www.linkedin.com/in/guido-gennari) - guidogennari95@gmail.com

Project Link: [https://github.com/xdguido/express-react-template](https://github.com/xdguido/express-react-template)

<p align="right"><a href="#readme-top">back to top</a></p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
