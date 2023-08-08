# Visual Regression Testing with BackstopJS

This project contains the configuration for BackstopJS, a visual regression testing tool.

## Prerequisites

Before running the BackstopJS tests, ensure you have the following installed on your system:

- Node.js: https://nodejs.org/
- npm (Node Package Manager): This comes bundled with Node.js

## Installation

1. Clone this repository to your local machine.

2. Install the required dependencies using npm:

```bash
npm install
```


## Add own Cookies file 

{} cookies.json 

# BackstopJS Configuration

The BackstopJS configuration is defined in the `backstop.config.js` file. You can customize the following settings:

- `scenarios`: Define the scenarios to test, including the URLs, scripts, and other settings.
- `viewports`: Define the viewports for testing (screen sizes).
- `paths`: Define the directories to save screenshots and reports.
- `engine`: Choose the browser engine to use for capturing screenshots (Puppeteer in this case).
- `engineOptions`: Additional options for the browser engine.
- `report`: Choose the type of report to generate (browser-based report in this case).
- `debug`: Flag to enable/disable debugging.

## Usage

To run the BackstopJS tests, you can use the following commands:


# Backstop Reference
```bash 
npm run backstop:reference -- --config=backstop.config.js 
```

# Backstop Test
```bash 
npm run backstop:test -- --config=backstop.config.js
```


# Command-line Arguments
```bash
backstop reference --config=backstop-settings.js --pathFile=gethelp --refHost=https://example.com/
backstop:test --config=backstop-settings.js --pathFile=gethelp --testHost=https://preview-example.com
```

This command will run BackstopJS in test mode, using the configuration defined in the backstop.config.js file. The --pathFile option specifies the path file to use (e.g., gethelp.js), and the --testHost option sets the test URL to capture screenshots from.

License
This project is licensed under the MIT License - see the LICENSE file for details.