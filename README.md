<!-- PROJECT LOGO -->
<p align="center">
    <span style="font-size: 42px; font-weight: bold">Inventorify</span>
    <br />
    <b>for a demo, go to <a target="_blank" href="https://inventorify.basselashi.repl.co/">https://repositorify.ga/</a></b>
</p

<!-- ABOUT THE PROJECT -->
## About The Project
Inventorify is a project influenced by *Shopify Developer Intern Challenge*, a backend-focused challenge that allows an applicant to showcase their capabilities in an inventory management system. The idea of such a challenge is great because applicants are not limited to using a stack, or being limited to specific challenges. This is an opportunity for applicants to showcase not only their software development skills, but also their critical thinking!

The first version of Inventorify took me less than 6 hours of development. The whole project is basically a collection of CRUD operations for inventory items as well as a history check for item deletion (only applicable to undeleted items).

### Built With
* Node.js
* Express
* Atlas MongoDB
* Mongoose
* MVC Architecture
* Vanilla JS for frontend

<!-- GETTING STARTED -->
## Getting Started

* Create a .env file in the root directory and define the MongoDB connection. The following is an example of Atlas connection
  ```
  dbUrlMongoDB=mongodb+srv://webapp:<PASSWORD_HIDDEN>@inventorify.q06cn.mongodb.net/inventorify?retryWrites=true&w=majority
  ```
* Run ```npm start```
* Access the application at `localhost:5000`

### Prerequisites
The following prerequisites are based on the versions available in May 2022
* Node Package Manager (NPM)

<!-- USAGE EXAMPLES -->
## Usage
You may perform the following actions in Inventorify
* Create new items
* Modify existing items
* Delete/Undelete items with optional comments
* View delete history of existing items

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->
## License

Distributed under the MIT License.

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
This projects could not have been done without the help of:
* [Express Template](https://github.com/jstibenpb/nodejs-express-template): Inventorify's MVC structure is highly influenced by this