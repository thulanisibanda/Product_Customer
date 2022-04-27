Provided in this project is a framework running basic services which can be consumed via an API.

The code base contains a consumable product inventory and customer system.

The backend services use Spring Boot with Spring Web MVC, Spring Data JPA and an H2 embedded database.
The frontend is built using ReactJS

You should have JDK 11 installed on your machine.

The database structure is discarded when the services are stopped and rebuilt from
`src/main/resources/schema.sql` and `src/main/resources/data.sql` when started.

## Running the Backend

### Via IDE

The code provided is a Maven project

If using IntelliJ Idea Ultimate, VSCode, Netbeans, Eclipse etc. then the IDE should detect the maven
structure and provide the nessecary controls to build and run as per your IDE's instructions.

If in doubt, refer to the terminal commands below.

### Via Terminal

Compile

```
./mvnw clean package
```

Run

```
./mvnw spring-boot:run
```

The backend will now be available to consume from http://localhost:8080.

## Running the front end

"npm install" to install all dependencies
"npm start" to run
