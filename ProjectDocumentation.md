# Hospital Appointment System Project Documentation

## 1. Specification

### 1.a. Project Description and Problem Statement
This project is a Hospital Appointment System designed to facilitate patients in booking appointments with doctors online. It addresses the problem of manual appointment scheduling, reducing administrative overhead and improving patient experience by providing a user-friendly web interface for appointment management.

### 1.b. Arguments for Using Web Application Technology
1. Accessibility: Web applications can be accessed from any device with a browser, providing convenience to users.
2. Centralized Data Management: All data is stored and managed centrally, ensuring consistency and ease of updates.
3. Cross-Platform Compatibility: No need for platform-specific installations; works on Windows, macOS, Linux, and mobile devices.
4. Ease of Maintenance and Updates: Updates are deployed on the server side, instantly available to all users without requiring client-side updates.

### 1.c. Functional Requirements
1. Patients can view available doctors and specialties.
2. Patients can book appointments by selecting specialty, doctor, date, and time.
3. Admin can view, edit, and delete appointments and contact messages.
4. The system prevents double-booking of appointment slots.

### 1.d. Non-Functional Requirements
1. The system must be responsive and usable on desktop and mobile devices.
2. The system must ensure data integrity and prevent appointment conflicts.

### 1.e. Potential Recipients of the System
1. Hospital administrative staff managing appointments.
2. Patients seeking to book medical appointments online.

### 1.f. Potential Goals for Creating the System
1. To streamline the appointment booking process and reduce manual errors.
2. To improve patient satisfaction by providing an easy-to-use online interface.

## 2. Technical Documentation

### 2.a. Technological Stack
- Frontend: HTML, CSS (including Tailwind CSS), JavaScript
- Backend: Node.js with Express framework
- Data Storage: JSON files for contacts and appointments
- Additional Libraries: CORS for cross-origin requests, Darkmode.js for UI theme toggle

### 2.b. Database Documentation
- Data is stored in JSON files (`contacts.json` and `appointments.json`).
- `contacts.json` stores contact messages with fields: id, name, email, message.
- `appointments.json` stores appointments with fields: id, patientName, pesel, specialty, doctor, date, time.
- No relational database is used; data is managed as flat JSON arrays.

## 3. Functional Layer

### 3.a. Compliance with Functional Requirements
- The frontend provides pages for home, appointment booking, and admin panel.
- Appointment booking form validates inputs and prevents weekend bookings.
- Admin panel allows viewing, editing, and deleting appointments and contact messages.
- Backend API supports CRUD operations with conflict checking for appointment slots.

### 3.b. Architecture and Design Patterns
- Separation of concerns between frontend and backend.
- RESTful API design for backend endpoints.
- Client-side validation complemented by backend conflict checks.

## 4. Database Usage

### 4.a. Data Structure
- Non-relational JSON file storage.
- Data is structured consistently with clear field definitions.

### 4.b. CRUD Operations
- Create: Adding new contacts and appointments.
- Read: Fetching contacts and appointments.
- Update: Editing appointments via admin panel.
- Delete: Removing contacts and appointments via admin panel.

## 5. View Layer

### 5.a. Compliance with Specification
- UI components match the project requirements.
- Appointment form dynamically updates doctor and time options.

### 5.b. Responsive Design
- Responsive layouts for home, appointment, and admin pages.
- Tested on desktop, tablet, and mobile screen sizes.

## 6. Naming Conventions and Code Formatting
- Consistent and descriptive naming in HTML, CSS, and JavaScript.
- Code formatted for readability and maintainability.

## 7. Demonstration
- The project can be run locally with Node.js backend and static frontend files.
- Dark mode toggle and interactive UI elements enhance user experience.
- Admin panel secured with simple login modal (client-side).

---

This documentation summarizes the project scope, design, and implementation details aligned with the evaluation criteria.
