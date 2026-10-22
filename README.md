# MarketSphere: Marketplace + Cybersecurity Attack Simulation

A realistic, full-featured digital e-commerce marketplace and presenter-controlled cybersecurity awareness training simulation built with **React**, **Vite**, **Tailwind CSS**, **Lucide Icons**, **Docker**, and **Nginx**.

---

## 1. Project Overview

MarketSphere delivers two interconnected experiences within a single client-side application:

1. **MarketSphere Marketplace (`/`)**: A premier Ethiopian online shopping experience with 24+ products across 6 departments, real-time search, category filtering, Ethiopian Birr (ETB) pricing, client-side persistent shopping cart, checkout simulation (supporting Telebirr, CBE Birr, demo cards), and customer account management.
2. **Operation MarketSphere (`/security-demo`)**: A presenter-controlled 7-step cybersecurity awareness narrative demonstrating how open-source intelligence (OSINT), role-targeted spear-phishing, lookalike verification screens, and privileged credential exposure can lead to internal document and business impact — built safely without external network calls, real passwords, or weaponized exploits.
3. **Administrator Enterprise Dashboard (`/admin`)**: A full-featured operations portal with live KPI telemetry, monthly revenue trends (ETB 48.25M GMV), product management (add/edit/delete in session), order fulfillment tracking, customer directory, employee roster (featuring Senior Administrator **Melaku Girmachew**), inventory management, executive reports, and the **Internal Company Document Center** (`/admin/documents`).

---

## 2. Architecture & Technology Stack

- **Frontend**: React 19, Vite 8, React Router v7
- **Styling**: Tailwind CSS v4, custom utility layers, Plus Jakarta Sans typography
- **Icons**: Lucide React
- **Data Layer**: Modular JavaScript mock datasets (`products.js`, `categories.js`, `orders.js`, `customers.js`, `employees.js`, `documents.js`, `emails.js`, `scenario.js`)
- **Containerization**: Multi-stage Docker build (Node 22 build stage &rarr; Nginx Alpine runtime)
- **Web Server**: Nginx with SPA client-side fallback routing (`try_files $uri $uri/ /index.html;`), Gzip compression, and asset caching

---

## 3. Application Routes

| Route | Description |
|---|---|
| `/` | Marketplace Homepage with Sale Banners, Featured, Trending, and Category Grids |
| `/products` | Product Catalog with Filters, Category Selectors, Sorting, and Load More |
| `/products/:id` | Product Details with Specs, Stock Status, Quantity Selector, and Related SKUs |
| `/cart` | Client-Side Shopping Cart with Subtotal, Delivery Fee Calculation, and Storage Sync |
| `/checkout` | Simulated Checkout with Delivery Tiers, Mock Telebirr/CBE Payments, and Confirmation |
| `/account` | Customer Account with Orders History, Profile, Addresses, and Wishlist |
| `/admin/login` | Enterprise Administrator Sign-In with Demo Profiles & Simulated FIDO2 MFA |
| `/admin` | Administrator Overview with GMV KPI Cards, Revenue Charts, and Status Ratios |
| `/admin/products` | Catalog Management with Add Product, Edit, and Delete (Session State) |
| `/admin/orders` | Order Fulfillment Management with Live Status Updaters and Consignment Tracking |
| `/admin/customers`| Fictional Customer Directory with Lifetime Spend and Contact Details |
| `/admin/employees`| Enterprise Staff Directory (Includes Melaku Girmachew, `melakugir12@gmail.com`) |
| `/admin/inventory`| Inventory & Warehouse Stock Level Controls with Restock/Deduct Audit Logs |
| `/admin/reports`  | Executive Financial Intelligence and Department Gross Margin Breakdowns |
| `/admin/documents`| Internal Company Document Center with 6 Sensitive Mock PDFs and Previews |
| `/security-demo`  | Presenter-Controlled 7-Step Cybersecurity Attack Simulation Narrative |

---

## 4. Cybersecurity Awareness Scenario: Operation MarketSphere

The simulation under `/security-demo` walks workshop participants through the attacker's methodology:

1. **Step 1: OSINT (Open-Source Intelligence)**: Discovers Melaku Girmachew's public title (Senior Marketplace Administrator), public contact (`melakugir12@gmail.com`), and recent marketplace operational milestones.
2. **Step 2: Targeted Spear-Phishing**: Demonstrates an email spoofing internal IT alerts with artificial urgency ("Action Required — Administrator Session Verification").
3. **Step 3: Lookalike Verification Portal**: Examines how attackers clone brand logos and prefill identifiers to trick users into submitting credentials.
4. **Step 4: Compromise Cascade**: Analyzes the token interception and session replay flow.
5. **Step 5: Simulated Privileged Access**: Visualizes the transition into the administrator dashboard under Melaku's elevated session (`?compromised=true`).
6. **Step 6: Business Impact**: Explores potential fallout across 4 key business assets: Revenue Reports, Inventory Forecasts, Customer Support Transcripts, and Access Policies.
7. **Step 7: Defense & Mitigation**: Delivers a 4-pillar defense roadmap: Phishing-resistant FIDO2 hardware keys, continuous staff training, Privileged Access Management (PAM), and Zero-Trust continuous validation.

---

## 5. Prerequisites

- **Ubuntu Server** (or Linux host / macOS / Windows with Docker installed)
- **Docker Engine** (version 20.10+)
- **Docker Compose** (v2+)
- Port `8080` available on the host (configurable via `PORT` environment variable)

---

## 6. Docker Deployment (Ubuntu Server)

### Step 1: Clone or Navigate to the Project Directory
```bash
cd /run/media/hyperfly/628AF1AA8AF17B3D/marketsphere
```

### Step 2: Build and Start Container
```bash
docker compose up -d --build
```

### Step 3: Verify Container Status
```bash
docker compose ps
```
The output should indicate `Up (healthy)` with port mapping `0.0.0.0:8080->80/tcp`.

### Step 4: View Application Logs
```bash
docker compose logs -f marketsphere
```

### Step 5: Stop or Restart the Application
```bash
# Stop containers
docker compose down

# Restart containers
docker compose restart marketsphere
```

### Step 6: Update Application After Modifying Code
```bash
# Rebuild and reload without downtime
docker compose up -d --build
```

---

## 7. Accessing the Application

### Access from Local Host:
Open your browser and navigate to:
```
http://localhost:8080
```

### Access Across Your Local Network (LAN):
Find your Ubuntu server's IP address:
```bash
hostname -I
# or
ip addr show
```
Access the application on any authorized computer, tablet, or phone on the same network:
```
http://SERVER_IP:8080
```
*(Example: `http://10.18.56.52:8080`)*

---

## 8. Local Development (Without Docker)

If you wish to run the project directly on Node.js:

```bash
# 1. Install dependencies
npm install

# 2. Run the Vite development server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

---

## 9. Safety, Privacy & Ethical Compliance

- **Educational Demonstration**: This software is built strictly for defensive cybersecurity education and awareness workshops.
- **Fictional Data**: All employee identities, customer names, telephone numbers, and company documents are fictional.
- **No Real Credential Capture**: The mock login screen does not capture, store, log, or transmit real passwords or user inputs.
- **No External Network Calls**: The email viewer and session flows run locally; no emails are dispatched to external mail servers or Gmail.
- **Simulated Financial Transactions**: No real debit cards, bank credentials, or mobile payment pins (Telebirr/CBE) are accepted or stored.
- **Frontend Prototype**: This system has no backend database; all state changes persist in the local browser session. Do not use for production e-commerce or sensitive data storage.

---

## 10. Verification Checklist

- [x] Ethiopian Birr (ETB) pricing across all catalog products
- [x] Client-side cart with automatic subtotal, delivery fee calculation, and localStorage persistence
- [x] Simulated checkout with Telebirr, CBE Birr, Demo Card, and Cash on Delivery
- [x] Customer account portal with past orders, addresses, and wishlist
- [x] Administrator dashboard with KPI metrics, monthly GMV graphs, and recent orders
- [x] Catalog product management (add, edit, delete in session)
- [x] Order management with simulated fulfillment status changes
- [x] Customer management with 16 fictional Ethiopian customer records
- [x] Employee directory with Melaku Girmachew (`melakugir12@gmail.com`)
- [x] Inventory controls with stock adjustments and audit history
- [x] Document Center with 6 sensitive internal business PDFs and previews
- [x] Presenter-controlled 7-step cybersecurity awareness demonstration with Next/Prev controls
- [x] Multi-stage Dockerfile and Docker Compose configuration with health check
- [x] Production Nginx server with SPA fallback routing and asset caching
