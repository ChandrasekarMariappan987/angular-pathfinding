# Build Instructions

# Prerequisites

Make sure you have the following installed:

Node.js (v14 or above)

Angular CLI (v13)

Check installation:

node -v
ng version

# Install Dependencies

Clone the repository and install required packages:

git clone https://github.com/ChandrasekarMariappan987/angular-pathfinding
cd angular-pathfinding
npm install

# Run the Application

Start the local development server:

ng serve

Then open your browser and navigate to: http://localhost:4200

# How It Works

Upload a JSON file in the required format.

The app automatically:

Parses the battlefield.
Detects start and target.
Marks elevated (unreachable) terrain.

When you click "Find Path", the A\* pathfinding algorithm computes the shortest valid route.

The computed path is highlighted in green.

# UI Overview

Blue Tile: Start position
Red Tile: Target position
Gray Tile: Elevated/Blocked terrain
Green Tile: Computed path
Light Gray: Traversable ground

# Architecture Choice

The app was built in Angular 13 using the CLI for structured component-based development.
Separation of concerns was achieved through components, models, and services:

Components handle the UI and user interaction.

Services encapsulate logic such as JSON parsing and pathfinding.

Models provide strong typing for better maintainability.

# Algorithm Selection

The A\* (A-star) algorithm was chosen for pathfinding because:

It guarantees the shortest path if the heuristic is admissible.
It is efficient and widely used in games for grid-based movement.
The heuristic used is Manhattan distance, ideal for grid movement restricted to horizontal and vertical directions.

# Rendering Logic

To ensure smooth performance and easy debugging:
The map is rendered using Angular's structural directives (\*ngFor).
Styles are dynamically bound using [ngClass] for better visualization.
For large maps, the logic could easily be moved to an HTML <canvas> if optimization is required.

# Challenges Faced

Parsing complex JSON structures: RiskyLab maps sometimes lack width and height. The app intelligently infers dimensions using data length.
Dynamic UI updates: Ensured two-way communication between components through inputs/outputs and service-based architecture.
Path visualization: Implemented clear color-coded feedback and simple UI for better UX.

# Feeback

# What aspects of the assessment did you find most helpful?

The hands-on approach combining Angular components, services, and TypeScript logic reinforced real-world application architecture.
Implementing the A\* algorithm provided excellent practice in algorithmic thinking and problem-solving within a frontend project.
The separation of UI, logic, and services encouraged modular design principles and maintainable code structures.
Using file upload functionality to dynamically load map data added a realistic scenario for handling external data in web apps.

# What challenges did you encounter, and how could the assessment be improved?

Parsing JSON maps with missing or inconsistent metadata (e.g., width/height missing or floating point values) required extra validation logic. Providing sample edge-case maps would save time and reduce ambiguity.
Understanding the best way to visualize the path on a canvas in Angular took some iteration. Including a visual mockup or example screenshots in the instructions could improve clarity.
The assessment assumes familiarity with canvas rendering in Angular, which could be challenging for beginners. A small tutorial link or hint could help reduce confusion.

# Were there any unclear instructions or elements that could use further explanation?

The instructions on service responsibilities could be clearer. For instance, explicitly stating that MapService handles map parsing/loading and PathfindingService handles algorithm computation would avoid potential confusion.
The expected behavior when no path is available or multiple paths exist could be clarified. For example, should the algorithm highlight the nearest reachable tiles, or simply display "No path found"?

# Any additional comments or suggestions?

Overall, the assessment is highly practical and mirrors real-world frontend + algorithmic development tasks. It successfully tests problem-solving, Angular proficiency, and clean code practices.

# RtsPathfinding

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.11.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
