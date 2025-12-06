# Architecture Document

## Backend Architecture

### Overview
The backend is built using Node.js with Express.js framework, following a modular MVC (Model-View-Controller) architecture pattern. The system is designed to handle sales data processing, filtering, sorting, and pagination efficiently.

### Technology Stack
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Language**: JavaScript (ES6+)

### Folder Structure
```
backend/
├── src/
│   ├── controllers/     # Request handlers
│   │   └── salesController.js
│   ├── services/        # Business logic
│   │   ├── dataService.js
│   │   └── salesService.js
│   ├── routes/          # API routes
│   │   └── salesRoutes.js
│   └── index.js         # Entry point
├── data/                # Dataset storage
│   └── sales_data.csv
└── package.json
```

### Module Responsibilities

#### Controllers (`controllers/salesController.js`)
- Handle HTTP requests and responses
- Parse query parameters
- Call appropriate services
- Return formatted JSON responses
- Error handling at the API level

#### Services

**Data Service (`services/dataService.js`)**
- Loads CSV data from file system
- Parses CSV into JavaScript objects
- Provides data access layer
- Handles data reloading

**Sales Service (`services/salesService.js`)**
- Implements search functionality (case-insensitive)
- Applies multi-select and range-based filters
- Handles sorting logic
- Implements pagination
- Generates filter options from dataset
- Calculates summary statistics

#### Routes (`routes/salesRoutes.js`)
- Defines API endpoints
- Maps routes to controllers
- `/api/sales` - Get paginated sales data
- `/api/sales/filters` - Get available filter options

### Data Flow

1. **Request Flow**:
   ```
   Client Request → Express Router → Controller → Service → Data Service → Response
   ```

2. **Search Flow**:
   - User enters search query
   - Controller receives query parameter
   - Sales Service applies case-insensitive search on Customer Name and Phone Number
   - Results filtered and returned

3. **Filter Flow**:
   - User selects filter options
   - Controller parses filter parameters
   - Sales Service applies filters sequentially
   - Filters work independently and in combination
   - State maintained across requests

4. **Sorting Flow**:
   - User selects sort option
   - Sales Service sorts data by specified field
   - Sort order (asc/desc) applied
   - Search and filter states preserved

5. **Pagination Flow**:
   - User navigates pages
   - Sales Service calculates page boundaries
   - Returns paginated subset with metadata
   - All active filters, search, and sort preserved

### API Design

**GET /api/sales**
- Query Parameters:
  - `search`: Search query string
  - `page`: Page number (default: 1)
  - `pageSize`: Items per page (default: 10)
  - `sortBy`: Field to sort by (date, quantity, customerName)
  - `sortOrder`: Sort direction (asc, desc)
  - Filter parameters (customerRegion, gender, ageMin, ageMax, etc.)

**GET /api/sales/filters**
- Returns available filter options extracted from dataset

### Edge Case Handling

- **No search results**: Returns empty array with pagination metadata
- **Conflicting filters**: All filters applied with AND logic
- **Invalid numeric ranges**: Age/date ranges validated before filtering
- **Large filter combinations**: Efficient filtering using array methods
- **Missing optional fields**: Handled with fallback values (empty strings, 0, etc.)

---

## Frontend Architecture

### Overview
The frontend is built using React with functional components and custom hooks for state management. The application follows a component-based architecture with clear separation of concerns.

### Technology Stack
- **Framework**: React 18
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Routing**: React Router (prepared for future use)
- **Styling**: CSS Modules (separate CSS files)

### Folder Structure
```
frontend/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── SearchBar.jsx
│   │   ├── FilterPanel.jsx
│   │   ├── SortingDropdown.jsx
│   │   ├── TransactionTable.jsx
│   │   ├── Pagination.jsx
│   │   └── SummaryCards.jsx
│   ├── pages/          # Page components
│   │   └── SalesDashboard.jsx
│   ├── hooks/          # Custom React hooks
│   │   ├── useSalesData.js
│   │   └── useFilterOptions.js
│   ├── services/       # API communication
│   │   └── api.js
│   ├── styles/         # CSS files
│   │   ├── index.css
│   │   └── [component].css
│   ├── App.jsx         # Root component
│   └── main.jsx        # Entry point
├── public/             # Static assets
└── package.json
```

### Component Responsibilities

#### Pages

**SalesDashboard (`pages/SalesDashboard.jsx`)**
- Main application page
- Orchestrates all components
- Manages global state through custom hooks
- Handles user interactions and state updates

#### Components

**SearchBar (`components/SearchBar.jsx`)**
- Renders search input field
- Handles search query input
- Calls parent's search update handler

**FilterPanel (`components/FilterPanel.jsx`)**
- Displays all filter options
- Handles multi-select checkboxes
- Manages range inputs (age, date)
- Provides clear filter functionality
- Collapsible panel design

**SortingDropdown (`components/SortingDropdown.jsx`)**
- Renders sort selection dropdown
- Maps sort options to API parameters
- Updates sort state on change

**TransactionTable (`components/TransactionTable.jsx`)**
- Displays sales data in tabular format
- Handles loading and empty states
- Formats currency and dates
- Responsive table design

**Pagination (`components/Pagination.jsx`)**
- Displays page navigation controls
- Shows current page and total pages
- Handles previous/next navigation
- Renders page number buttons

**SummaryCards (`components/SummaryCards.jsx`)**
- Displays summary statistics
- Formats large numbers (K, L notation)
- Shows total units, amount, and discount

### Custom Hooks

**useSalesData (`hooks/useSalesData.js`)**
- Manages sales data state
- Handles API calls
- Manages pagination state
- Manages filter, search, and sort states
- Provides update functions for all state changes
- Automatically refetches on state changes

**useFilterOptions (`hooks/useFilterOptions.js`)**
- Fetches available filter options from API
- Manages filter options state
- Handles loading and error states

### Services

**API Service (`services/api.js`)**
- Configures Axios instance
- Defines API endpoints
- Provides typed API methods
- Handles base URL configuration

### Data Flow

1. **Initial Load**:
   ```
   SalesDashboard → useSalesData → API → Backend → Response → State Update → Re-render
   ```

2. **Search Flow**:
   - User types in SearchBar
   - SearchBar calls updateSearch
   - useSalesData updates searchQuery state
   - useEffect triggers API call
   - Results update and components re-render

3. **Filter Flow**:
   - User selects filters in FilterPanel
   - FilterPanel calls onFilterChange
   - useSalesData updates filters state
   - Page resets to 1
   - API call with new filters
   - Results update

4. **Sort Flow**:
   - User selects sort option
   - SortingDropdown calls onChange
   - useSalesData updates sortBy/sortOrder
   - API call with new sort parameters
   - Results update

5. **Pagination Flow**:
   - User clicks page number
   - Pagination calls onPageChange
   - useSalesData updates currentPage
   - API call with new page
   - Results update

### State Management

- **Local Component State**: Used for UI-specific state (e.g., filter panel open/close)
- **Custom Hooks**: Manage data fetching and business logic state
- **Props**: Pass data and callbacks between components
- **No Global State Library**: Not required for this application scope

### UI/UX Design

- **Responsive Design**: Works on desktop and tablet devices
- **Loading States**: Shows loading indicators during API calls
- **Empty States**: Displays helpful messages when no data
- **Error Handling**: Shows error messages on API failures
- **Accessibility**: Semantic HTML, proper labels, keyboard navigation

### Styling Approach

- **Component-scoped CSS**: Each component has its own CSS file
- **Global Styles**: Base styles in index.css
- **CSS Variables**: Can be extended for theming
- **Responsive**: Media queries for mobile/tablet breakpoints
- **Modern CSS**: Flexbox, Grid, transitions

---

## Data Flow Diagram

```
┌─────────────┐
│   Client    │
│  (Browser)  │
└──────┬──────┘
       │
       │ HTTP Request (Query Params)
       ▼
┌─────────────────────────────────┐
│      Frontend (React)           │
│  ┌───────────────────────────┐  │
│  │   SalesDashboard          │  │
│  │  ┌─────────────────────┐  │  │
│  │  │  useSalesData Hook  │  │  │
│  │  └─────────────────────┘  │  │
│  │           │                │  │
│  │           ▼                │  │
│  │  ┌─────────────────────┐  │  │
│  │  │   API Service       │  │  │
│  │  └─────────────────────┘  │  │
│  └───────────────────────────┘  │
└──────────────┬──────────────────┘
               │
               │ HTTP Request
               ▼
┌─────────────────────────────────┐
│    Backend (Express.js)         │
│  ┌───────────────────────────┐  │
│  │   Routes                  │  │
│  │   /api/sales              │  │
│  └───────────┬───────────────┘  │
│              │                   │
│              ▼                   │
│  ┌───────────────────────────┐  │
│  │   Controller              │  │
│  │   salesController        │  │
│  └───────────┬───────────────┘  │
│              │                   │
│              ▼                   │
│  ┌───────────────────────────┐  │
│  │   Service Layer          │  │
│  │   - applySearch          │  │
│  │   - applyFilters         │  │
│  │   - applySorting         │  │
│  │   - applyPagination      │  │
│  └───────────┬───────────────┘  │
│              │                   │
│              ▼                   │
│  ┌───────────────────────────┐  │
│  │   Data Service            │  │
│  │   - Load CSV              │  │
│  │   - Parse Data            │  │
│  └───────────┬───────────────┘  │
│              │                   │
│              ▼                   │
│  ┌───────────────────────────┐  │
│  │   CSV File                │  │
│  │   sales_data.csv          │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

---

## Key Design Decisions

1. **CSV Data Storage**: Simple file-based storage for assignment purposes. In production, would use a database.

2. **In-Memory Processing**: Data loaded into memory for fast filtering/sorting. Suitable for moderate dataset sizes.

3. **Stateless Backend**: Each request is independent. State maintained in query parameters.

4. **Component Composition**: Small, focused components for maintainability.

5. **Custom Hooks**: Encapsulate data fetching logic for reusability.

6. **No State Management Library**: React hooks sufficient for this application's complexity.

7. **Server-Side Filtering**: All filtering done on backend for consistency and performance.

8. **Pagination on Server**: Reduces data transfer and improves performance.

---

## Future Enhancements

1. **Database Integration**: Replace CSV with PostgreSQL/MongoDB
2. **Caching**: Implement Redis for frequently accessed data
3. **Authentication**: Add user authentication and authorization
4. **Real-time Updates**: WebSocket support for live data
5. **Export Functionality**: CSV/PDF export of filtered data
6. **Advanced Analytics**: Charts and graphs
7. **Mobile App**: React Native version
8. **Testing**: Unit and integration tests
9. **CI/CD**: Automated deployment pipeline
10. **Monitoring**: Logging and error tracking

