###Solar System Explorer 🌌
Explore an interactive, 3D model of the solar system built using Three.js. This project allows users to click on celestial bodies to learn more about them, with data fetched dynamically from NASA's public APIs. The visual experience is enriched with textures, shaders, and animations to create an immersive astronomical journey.

Features ✨
🌍 Interactive Celestial Bodies
Click on any planet or celestial object to display detailed information fetched from NASA's API.
Rotations and orbits are calculated using real-world astronomical data for accurate simulations.
🎨 Advanced Graphics
Custom shaders and textures bring celestial objects to life.
Realistic lighting effects simulate sunlight and shadows.
🚀 Dynamic Data Integration
Information about planets, moons, and other celestial objects is fetched live from NASA's API.
DOM integration ensures a seamless display of detailed data for each object.
🔍 Object Picking
Implements raycasting for object picking to make celestial bodies clickable.
Accurate selection mechanism ensures smooth interactivity.
🌀 Smooth Animations
Planets rotate and revolve dynamically, mimicking real-world physics.
Camera transitions for a cinematic exploration experience.


How It Works 🛠️
Three.js Scene Setup:
Initializes the scene, camera, and renderer with realistic settings.
Object Creation:
Models of celestial bodies are created using spheres with mapped textures for planets and moons.
Picking Mechanism:
Raycasting is used to detect clicks on celestial bodies, triggering API calls to fetch and display data.
NASA API Integration:
Fetches real-time or pre-cached data about celestial objects.
Data Display:
Integrates fetched data with the DOM, rendering descriptions, statistics, and imagery for selected bodies.



Technologies Used 🚀
Three.js: 3D rendering and animations
React (optional if used): Component-based front-end library
NASA APIs: Dynamic data about celestial bodies
CSS/SCSS: Styling for the user interface
Webpack/Vite: Build tools for bundling and development
