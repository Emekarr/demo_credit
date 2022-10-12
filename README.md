# DemoCredit Backend Docs

**Project Setup & Contribution Guide**

- Fork this repo
- Clone the repo from your account to your local PC
  > git clone https://github.com/YOUR_USERNAME/demo_credit.git
- Make your contribution
- Make a PR

**Hosted URL**  
[api url](https://chiemekam-lendsqr-be-test.herokuapp.com/)

**Prerequisite**

- TypeScript
- ExpressJS
- KnexJS
- MySQL

**Tech Stack**

1. TypeScript - language
2. NodeJS - Javascript Runtime
3. KnexJS - ORM
4. MySQL - Database
5. Emailing - SendGrid
6. Hashing - Bcrypt
7. Authentication - JWT
8. Caching - Redis

**Contributors**

1. [Chiemekam Anyanwu-Ebere](https://github.com/emekarr)

**Overview**  
Demo Credit is a mobile lending app that requires wallet functionality. This is needed as borrowers need a wallet to receive the loans they have been granted and also send the money for repayments.  
Basic Wallet Requirements -

1. A user can create an account
2. A user can fund their account
3. A user can transfer funds to another user’s account
4. A user can withdraw funds from their account.

**Milestones**

- [x] User SignUp and Account SetUp
- [x] Payment Service Integrated
- [x] Funds Transfer Implemented
- [x] Funds Payout Implemented
- [] Funds Payout Email Confirmation Implemented

**Software Architure**  
[Uncle Bob's Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) principles were unitlized in building this software.  
![Clean Architecture Image](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)

**Entity Relationship Diagram**  
![ERD Image](https://res.cloudinary.com/themizehq/image/upload/v1665072152/DemoCredit_ERD.jpg)
