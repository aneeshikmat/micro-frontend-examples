# Module Federation Example

This example demonstrates how to use Webpack Module Federation to create a micro-frontend architecture with React, Material UI, and React Router.

## Modules

- **Host**: The main application that consumes the federated modules
- **Header**: A navigation header component
- **Signin**: A signin form component

## Running the Example

To run the example, you need to start each module separately:

1. First, install dependencies in each module:

```bash
# Install dependencies in the header module
cd header
npm install

# Install dependencies in the signin module
cd ../signin
npm install

# Install dependencies in the host module
cd ../host
npm install
```

2. Start each module in a separate terminal:

```bash
# Start the header module
cd header
npm run dev

# Start the signin module
cd ../signin
npm run dev

# Start the host module
cd ../host
npm run dev
```

3. Open your browser and navigate to http://localhost:8100

## Features

- **Header Module**: Provides a navigation header with links to different pages
- **Signin Module**: Provides a signin form with validation
- **Host Module**: Consumes the header and signin modules and provides routing

## Implementation Details

- Each module is a separate application that can be developed and deployed independently
- The modules share dependencies using Webpack Module Federation
- The host application lazy loads the remote modules using React.lazy() and Suspense