# Patient Monitor

Patient Monitor is a web application created using React for the frontend, and NextJS and MongoDB for the backend.

The frontend includes code splitting and reusable components, React context for managing global user and notification state. Its folder structure was made in an Angular-like manner. Material UI is used for icons, as well as input fields. All data is fetched through getServerSideProps to avoid React's problem with data appearing *after* the page is rendered.

The backend is a REST API made with NextJS, somewhat utilizing MVC and storing data to MongoDB with Mongoose. Authentication is done with JWT, and cookies are used to store user ID on client's browser. Error handling is properly implemented, albeit not being able to use "Express Async Errors" package.

Unfortunately, I was not able to implement image upload due to the free image hosting service (that doesn't require credit card information), Imgur, having an API that uses HTTPS, while NextJS only supports HTTP.

You can look at a live preview of this app <a href="https://sensational-sprinkles-170f00.netlify.app/">here</a>

# Usage

The purpose of this application is to provide anyone the ability to register their healthcare company (for owners), register their employees on it and give them the ability to log in and use the web app for patient monitoring.

On the home page, an employee can view up to 3 of their most recently updated patients, view their scheduled appointments and schedule them on the spot. Appointments scheduled through the home page will lead to patient creation page and give the employee the opportunity to add the patient to the database with the name autofilled. Creating a patient this way will update the scheduled appointment, so that the next time it's clicked, the employee will be redirected to the patient's page. Alternatively, if the employee manually navigates to the patient creation page through the "Add new patient" button, there is no autofill and the employee adds a patient at will. Appointments are deleted upon reaching 30 minutes past the current date.

On the patients page, the employee will see all patients registered to their healthcare company. The employee also has the option to search for patients. Patients on this page will have their name, health rating and link to their individual page displayed. Navigating to an individual patient's page will display their name, identification number, occupation, health rating, entries, diagnosis and prescriptions. Here, the employee has options to add new entries for the patient. A new entry will have a content, which is a note by the employee, health rating which determines the state of health of the patient at the time of the entry, and optionally removing and/or adding diagnosis and/or prescriptions ot the patient.

Furthermore, the employee can dismiss a patient, which is only possible if the patient was registered by the employee or the employee has added at least one entry to the patient, given that they haven't dismissed the patient after the last added entry. The employee can also schedule an appointment through the patient's individual page. Appointments scheduled this way won't take the employee to the patient creation page, and will instead directly take them to the patient's page itself. Also, back to the home page, the employee is provided with a link to view their patients, which will navigate the employee to the patients page, but with patients filtered to only those added, updated and not dismissed by the employee.

The owner and administrators of the company have access to the admin panel page. Here they can view a list of all the company's employees and their types (owner, admin, employee). The owner is able to remove any employee, while administrators can only remove non-admins. There is also the option to register a new employee to the company, and available only to the owner is what type of employee it will be (admin or employee). And last but not least is the ability to edit patient's name and, owner only, type.

# Todo

1. Fix some responsiveness issues