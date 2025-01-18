# Interview Assignment

## Local setup and run

1. **Install dependencies**
    ```bash
   npm install
    ```
1. **Add missing test data**

    Use .env.example and fill in missing data
    ```bash
    cp .env.example cypress.env.json
    ```
1. **Run Cypress**
    
    ```bash
    # in interactive mode
    npm run cy:open 

    # in headless mode
    npm run cy:run
    ```
