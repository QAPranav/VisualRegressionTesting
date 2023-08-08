// Importing necessary modules
const args = require('./node_modules/minimist')(process.argv.slice(2)); // Parses command-line arguments

// Setting up default values and variables
const defaultPaths = ['/']; // Default path, checks the homepage as a quick smoke test
let scenarios = []; // Array to store URL paths to check
const today = new Date(); // Get the current date
const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(); // Format date as 'YYYY-MM-DD'

// Directories to save screenshots and reports
const saveDirectories = {
  "bitmaps_reference": "./backstop_data/"+date+"_reference", // Directory to store reference screenshots
  "bitmaps_test": "./backstop_data/"+date+"_test", // Directory to store test screenshots
  "html_report": "./backstop_data/"+date+"_html_report", // Directory to store the HTML report
  "engine_scripts": "./backstop_data/engine_scripts", // Directory to store engine-specific scripts
  "ci_report": "./backstop_data/"+date+"_ci_report" // Directory to store CI (Continuous Integration) report
};

// Work out which paths to use: an array from a file, a supplied array, or defaults
let paths;
if (args.pathFile) {
  // If a pathFile argument is provided, use paths from the specified file
  const pathConfig = require('./tests/'+args.pathFile+'.js'); // Require and load the specified file
  paths = pathConfig.array; // Get the 'array' property from the loaded file as the paths array
} else if (args.paths) {
  // If paths argument is provided, split it into an array of paths
  const pathString = args.paths; // Get the paths as a string
  paths = pathString.split(','); // Split the comma-separated paths and store them in the paths array
} else {
  // If no specific paths provided, use the defaultPaths array
  paths = defaultPaths; // Set paths to the defaultPaths array containing just the homepage path
}

// Scenarios are a default part of config for BackstopJS
for (let k = 0; k < paths.length; k++) {
  // Loop through the paths array to create scenarios for each path
  scenarios.push (
    { 
      "onBeforeScript": "puppet/onBefore.js", // Script to run before capturing screenshots
      "onReadyScript": "puppet/onReady.js", // Script to run after the page is ready
      "label": paths[k], // Label for the scenario (typically the URL path)
      "cookiePath": "cookies.json", // Path to a JSON file to store cookies
      "referenceUrl": args.refHost + paths[k], // Reference URL to compare with the test URL
      "url": args.testHost + paths[k], // Test URL to capture screenshots from
      "hideSelectors": [], // Selectors to hide from the screenshots
      "removeSelectors": [], // Selectors to remove from the screenshots
      "selectors": [], // Selectors to capture as individual screenshots
      "delay": 6000, // Delay in milliseconds before capturing screenshots
      "misMatchThreshold" : 0.3 // Threshold for image mismatch comparison (0.1 = 10%)
    }
  );
}

// BackstopJS configuration
module.exports = {
  "id": "shelter", // Identifier for the test suite
  "viewports": [
    {
      "label": "laptop", // Label for the viewport (screen size)
      "width": 1280, // Width of the viewport
      "height": 720 // Height of the viewport
    },
    {
      "label": "phone",
      "width": 320,
      "height": 480
    }
  ],
  "scenarios": scenarios, // Array of scenarios to test
  "paths": saveDirectories, // Directories to save screenshots and reports
  "engine": "puppeteer", // Browser engine to use for capturing screenshots (Puppeteer in this case)
  "engineOptions": {
    "args": ["--no-sandbox"] // Additional options for the browser engine
  },
  "report": ["browser"], // Type of report to generate (browser-based report)
  "debug": false // Flag to enable/disable debugging (false to disable)
};
