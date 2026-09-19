# ATMTA Modular Admin Dashboard

Frontend technical task for ATMTA Ventures.

---

## Deliverables

- **Source Code**: 
- **Video Demo (Task Output)**: 
- **Video Walkthrough (Source Code)**: 

---

## Steps to Run the Project

### Prerequisites

- Node.js 18.18.0 or later (Node.js 20+ recommended)
- npm (or pnpm / yarn)

### Installation and Execution

1. Clone the repository:

   ```bash
   git clone https://github.com/ahmed-abohmaid/atmta-dashboard-task.git
   cd atmta-dashboard-task
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. Production build:

   ```bash
   npm run build
   npm run start
   ```

5. Lint check:
   ```bash
   npm run lint
   ```

---

## Test Accounts

The following pre-configured accounts are provided to test permission levels and access boundaries (PDF §3):

| Account                | Email                 | Password      | Access Level                                                 |
| ---------------------- | --------------------- | ------------- | ------------------------------------------------------------ |
| Super Admin            | `admin@atmta.test`    | `admin123`    | Full access across all modules and actions                   |
| Manager                | `manager@atmta.test`  | `manager123`  | Full access to Vendors, Categories, and Users                |
| Full Vendors Access    | `vendors@atmta.test`  | `vendor123`   | Full Vendors CRUD + Export Vendors permission                |
| Read-Only User         | `viewer@atmta.test`   | `viewer123`   | Read-only access to available modules                        |
| Without Vendors Module | `novendor@atmta.test` | `novendor123` | Access to Categories only; Vendors module hidden and blocked |

Note: The login page includes a "Test Accounts" picker to quickly select and fill credentials for any of these users.

---

## State Persistence Note

Per task specification (PDF §3):

- All data resides entirely in the frontend with no backend database.
- State is persisted in `localStorage` via Zustand (`useMockStore`).
- Data **survives hard page reloads and browser refreshes**.
- A "Restore Default Data" action is provided in the header to reset the store back to initial seed data at any time.
- All service operations run behind an async layer with simulated latency (`delay()`), mimicking a real REST API.

