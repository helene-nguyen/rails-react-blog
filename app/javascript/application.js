// Entry point for the build script in your package.json
import '@hotwired/turbo-rails';
import './controllers';
import './components';
// The line of code added to the application.js file will import the code in the entry index.jsx file, making it available to esbuild for bundling. With the /components directory imported into the Rails app’s JavaScript entry point, you can create a React component for your homepage. The homepage will contain some texts and a call to action button to view all recipes.
import * as bootstrap from 'bootstrap';
