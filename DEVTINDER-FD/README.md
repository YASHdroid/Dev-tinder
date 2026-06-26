# Main.jsx
->this is entry point of the project
->  importing StrictMode
It helps detect:
unsafe lifecycle methods
bugs
side effects
deprecated feature

->import { createRoot } from 'react-dom/client'
it creates react root
flow of file
1. Import React tools
2. Import CSS
3. Import App component
4. Find root div in HTML
5. Create React root
6. Render App component inside root

# APP.JSX
Provider gives Redux store access to the ENTIRE app.
main.jsx
   ↓
<App />
   ↓
Redux Provider Activated
   ↓
BrowserRouter Activated
   ↓
Routes Checked
   ↓
Body Layout Loaded
   ↓
Child Route Rendered in Outlet


# Store.ks
The Store connects different reducers with different sections of state.

Example:

user reducer controls user state
feed reducer controls feed state

So the final Store becomes divided into sections.

Each reducer manages only its own section.

Meaning of:
user: userReducer

This means:

there will be a section called user inside Store
this section will be controlled by userReducer

Similarly:

feed: feedReducer

means:

feed section exists in Store
feedReducer controls it
Final Structure of Store

Conceptually the Store becomes:

Store
 ├── user
 └── feed

Each section is managed separately.

Purpose of Store

The Store:

keeps all shared data centralized
allows components to access common data
avoids prop drilling
creates predictable state management

# UserSlice.js
The Store connects different reducers with different sections of state.

Example:

user reducer controls user state
feed reducer controls feed state

So the final Store becomes divided into sections.

Each reducer manages only its own section.

Meaning of:
user: userReducer

This means:

there will be a section called user inside Store
this section will be controlled by userReducer

Similarly:

feed: feedReducer

means:

feed section exists in Store
feedReducer controls it
Final Structure of Store

Conceptually the Store becomes:

Store
 ├── user
 └── feed

Each section is managed separately.

Purpose of Store

The Store:

keeps all shared data centralized
allows components to access common data
avoids prop drilling
creates predictable state management