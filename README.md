# cs465-fullstack
Full Stack Development project for CS-465

## Overview
This project is a full stack travel booking web application that I built using the MEAN stack. It includes both a customer-facing website and a secure admin interface. Customers can browse trips, read site content, and manage reservations. Admin users log in through a protected Angular application to manage trip data.

The goal of this project was to bring together everything from the course into one working system. Frontend, backend, database, and security all had to work together. This repository contains the final version of that work.

---

## Architecture
I used two different frontend approaches because the users have very different needs.  

The customer-facing site is built with Express, JavaScript, and Handlebars using an MVC structure. Pages are rendered on the server and delivered when a request is made. This works well for customers because most interactions involve viewing information and navigating between pages. It keeps the experience simple and predictable.

The admin side is built as an Angular single-page application. It uses components, services, and client-side routing to support more interactive behavior. Admin users can add, edit, and delete trips without full page reloads, and changes appear immediately after API responses. This made the admin workflow much faster and easier to use.

MongoDB was used as the backend database because it fits the flexible nature of the data. Trip information can evolve without strict schema changes, and MongoDB integrates cleanly with Node.js through Mongoose.

---

## Functionality
JavaScript is used across the entire application, but JSON is what ties everything together. The API returns JSON data, which both the Express site and the Angular SPA consume. This allows the same backend to support two very different interfaces.

As the project progressed, I refactored code to improve structure and reuse. On the Angular side, API calls and authentication logic were moved into shared services instead of being repeated across components. Reusable UI components helped keep the interface consistent and made changes easier to manage later.

---

## Testing
Testing focused on making sure the full stack worked as a complete system. I tested all major API operations using GET, POST, PUT, and DELETE requests. Trips were retrieved, created, updated, and removed through the admin interface, with results verified in the database.

Security added another layer to testing. Admin routes are protected using JWT authentication. Requests without valid tokens are rejected, while authenticated requests are allowed to proceed. This confirmed that admin-only functionality is properly secured.

---

## Reflection
This course helped me connect the dots between frontend development, backend logic, databases, and security. I didn’t just build pieces in isolation. I built a complete application and made sure everything worked together.

I gained practical experience with RESTful APIs, single-page applications, MongoDB, and authentication. More importantly, I’m now comfortable designing and implementing a full stack system from start to finish. This project represents that growth and is something I’m confident including in my professional portfolio.
