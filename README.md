#SwasthCare 

-https://amazing-stroopwafel-591a17.netlify.app/
🏥 Swasthcare Project Swasthcare is a full-stack hospital management system designed to simplify and streamline patient and hospital operations. It features role-based authentication for two main user roles: Admin and Master. Each role has access to specific functionalities to help manage hospital workflows efficiently.

🔐 Role-Based Access Admin:

Registers patients and creates their profiles.

Fills out OPD and IPD forms.

Uploads patient history, lab reports, and other medical documents.

Manages bed assignments including bed shifting and discharging patients.

Generates and manages billing for treatments and hospital stays.

Master (Has all Admin access plus advanced controls):

Ward Management System:

Keeps track of patient status in each ward and bed.

Updates the count of available beds.

Adds new wards as needed.

🔧 Key Features Authentication:

Role-based routing and protected routes using ProtectedRoute and MasterRoute.

Patient Management:

Profile creation and updates.

OPD/IPD records with image uploads.

Viewing patient history and lab reports.

Bed & Ward Management:

Bed assignment, shift, and discharge.

Ward creation and real-time bed count updates (Master only).

Billing System:

Automated billing form generation and hospital bill display.

Print & Report Views:

Printable OPD records.

Accessible report history and detailed lab reports.

Error Handling:

Unauthorized access redirection.

Pages for not found or unavailable information.

🛠️ Tech Stack Frontend: React with React Router

Backend: Node.js + Express

Database: MongoDB

Authentication: JWT with token verification

for access-> user1 123456 master1 123456

Image Uploads: Handled via separate upload routes

Deployment-Ready: Configured for both local and cloud-based frontend URLs
