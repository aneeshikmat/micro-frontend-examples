#!/bin/bash

# Script to run npm commands for all packages in the micro-full-technical-implementation monorepo
# Usage: ./run-all.sh [install|dev]

# Define the base directory
BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Define the packages
PACKAGES=(
  "host"
  "signin"
  "accountdetails"
  "catalog"
  "header"
  "myaccount"
  "paymentdetails"
)

# Function to run npm install for all packages
run_install() {
  echo "=== Running npm install for all packages ==="
  
  # First, check if event-bus directory exists and create package.json if needed
  if [ -d "$BASE_DIR/shared-utils/event-bus" ]; then
    if [ ! -f "$BASE_DIR/shared-utils/event-bus/package.json" ]; then
      echo "Creating package.json for event-bus..."
      cat > "$BASE_DIR/shared-utils/event-bus/package.json" << EOF
{
  "name": "event-bus",
  "version": "1.0.0",
  "main": "index.js"
}
EOF
    fi
    
    echo "Installing event-bus..."
    cd "$BASE_DIR/shared-utils/event-bus"
    npm install
  fi
  
  # Install dependencies for each package
  for package in "${PACKAGES[@]}"; do
    if [ -d "$BASE_DIR/$package" ]; then
      echo "Installing $package..."
      cd "$BASE_DIR/$package"
      npm install
    else
      echo "Warning: Package directory $package not found"
    fi
  done
  
  echo "=== All packages installed successfully ==="
}

# Function to run npm dev for all packages
run_dev() {
  echo "=== Starting all packages in separate terminals ==="
  
  for package in "${PACKAGES[@]}"; do
    if [ -d "$BASE_DIR/$package" ]; then
      echo "Starting $package..."
      
      # Use osascript to open a new Terminal window on macOS
      if [[ "$OSTYPE" == "darwin"* ]]; then
        osascript -e "tell application \"Terminal\" to do script \"cd $BASE_DIR/$package && npm run dev\""
      # For Linux, try to use gnome-terminal
      elif command -v gnome-terminal &> /dev/null; then
        gnome-terminal -- bash -c "cd $BASE_DIR/$package && npm run dev; exec bash"
      # For Windows with Git Bash or similar
      elif [[ "$OSTYPE" == "msys"* ]] || [[ "$OSTYPE" == "cygwin"* ]]; then
        start bash -c "cd $BASE_DIR/$package && npm run dev"
      else
        echo "Unsupported operating system for opening multiple terminals. Please run each package manually."
        echo "cd $BASE_DIR/$package && npm run dev"
      fi
      
      # Wait a moment before starting the next terminal to avoid overwhelming the system
      sleep 1
    else
      echo "Warning: Package directory $package not found"
    fi
  done
  
  echo "=== All packages started ==="
  echo "Note: Close the terminal windows manually when you're done"
}

# Main script logic
if [ "$1" == "install" ]; then
  run_install
elif [ "$1" == "dev" ]; then
  run_dev
else
  echo "Usage: ./run-all.sh [install|dev]"
  echo "  install - Run npm install for all packages"
  echo "  dev     - Run npm run dev for all packages in separate terminals"
fi