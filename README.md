# AtmApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.0.

Features:
- Angular service to handle ATM transactions
- Alert service to display when a command is successful or when an error occurs.

## Running the Server

After running `npm install`, run `ng serve` or `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Commands

R - Restocks ATM to default values of ten of each available denomination.

W $amount - Withdraws money from the ATM using the least amount of bills, then displays the remaining bills in stock.

I $denomination - Returns the amount of specified bills in the ATM. Can list more than one denomination.

Q - Quits the application and returns the user to the "Login" page.
