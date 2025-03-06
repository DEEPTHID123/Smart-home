Smart home - Energy Dashboard

Smart home is a web-based energy management dashboard designed to help users monitor and manage energy usage, track appliance performance, and stay within their energy budget. It provides detailed insights into energy consumption, suggestions for energy savings, and generates usage reports for analysis.

Features

- Energy Usage Tracking: Track energy usage for different appliances in real-time and over time.
- Budget Management: Set and manage energy usage budgets to ensure you stay within your consumption limits.
- Energy Savings Suggestions: Get personalized tips on how to reduce energy consumption.
- Reports Generation: Generate detailed energy usage reports including costs and profit/loss calculations.
- Weekly Energy Usage Graphs: Displays a line chart for each device, visualizing energy consumption trends over the past four weeks.
- Theme Customization: Switch between light and dark themes for better usability.
- Responsive UI: Fully responsive user interface that works across devices.

Project Structure

- app.py: The main backend file running a Flask server to serve pages and API requests.
- templates: Contains HTML files (e.g., 'dashboard.html','applications.html', 'device.html', 'settings.html', 'reports.html') for rendering the pages.
- static/js: Contains JavaScript files (e.g., 'script.js', 'device.js') to handle front-end interactions and dynamic content.
- static/css: Contains the CSS files (e.g., 'styles.css' , 'dashboard.css') to style the pages.

Installation

1. Clone the repository:
    bash
    git clone https://github.com/DEEPTHID123/smart-home.git
    cd fusion-smart
   
2. Install the dependencies:
    bash
    pip install flask    

3. Run the Flask app:
    bash
    python app.py
    

4. Access the app:
   Open a web browser and navigate to `http://127.0.0.1:5000` to see the dashboard in action.

Dependencies

- Flask: Lightweight Python web framework for building web applications.
- Chart.js: JavaScript library used for rendering charts and graphs on the front-end.
- JavaScript: JavaScript for dynamic page updates and interactivity.

File Descriptions

- app.py: The backend logic for serving HTML pages and handling device data requests. It uses Flask to create a web server and API endpoints.
- dashboard.html: The main landing page for the dashboard.
- device.html: Displays detailed energy usage for individual devices, along with suggestions for savings and badges.
- application.html : It helps users to see the graph which shows the average energy usage and minimum energy usage of every device and allows users to set there budget.
- settings.html: Allows users to set user information, password and configure theme preferences.
- reports.html: Displays generated reports based on energy usage data, including cost and profit/loss percentages.
- manage.html: It is mainly used to control the devices through a website . Where the users have the option to add a new device if required and have 2 switches 'on' and 'off'.
- styles.css: It is main used to style all the pages (except dashboard.html) to make it visually appealing.
- dashboard.css: It is main used to style the dashboard page to make it visually appealing.
- script.js: Handles front-end functionality, including budget checking, usage tracking, and theme switching.
- device.js: Manages device-specific data, graphs, and suggestions on the device detail page.

How it Works

1. Home Page ('dashboard.html' , 'application.html'): Displays an overview of appliances with energy usage data.
2. Device Page ('device.html): Shows detailed usage for a selected device, including a line graph, energy-saving tips and badges.
3. Settings Page ('settings.html'): Allows users to set their energy usage budget and switch between light and dark themes.
4. Reports Page ('reports.html'): Generates a detailed report showing energy usage, cost, and profit/loss for appliances.
5. control Page ('manage.html'): It is mainly used to control the devices through a website . Where the users have the option to add a new device if required and have 2 switches 'on' and 'off'.



