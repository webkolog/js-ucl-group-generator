# UEFA Champions League Group Stage Draw Simulator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/language-JavaScript-orange.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

**Version:** 1.0.0

**Created Date:** 2021-08-21

**Last Updated:** 2021-08-21

**Created By:** Ali Candan ([@webkolog](https://github.com/webkolog))

**Website:** [http://webkolog.net](http://webkolog.net)

**Copyright:** (c) 2026 Ali Candan

**License:** MIT License

---

**UEFA Champions League Group Stage Draw Simulator** is a lightweight, pure JavaScript algorithm designed to run directly in the browser's console. It accurately simulates the traditional UEFA Champions League group stage draw format used prior to the 2025 format change. 

The application automatically sorts 32 dynamic teams into 4 performance pots based on their club coefficients/points and executes a deadlock-free draw that strictly respects standard tournament constraints.

## Features

* 📊 **Automated Pot Allocation:** Automatically ranks and splits 32 teams into 4 separate pots according to their UEFA points.
* 🛡️ **Country Protection Rule:** Ensures no two clubs from the same country/association can be drawn into the same group.
* 🔀 **Smart Deadlock Prevention:** Utilizes a retry-on-deadlock mechanism loop to handle invalid group configurations caused by strict drawing constraints.
* 🎨 **Rich Console Output:** Outputs beautifully formatted, styled titles and a clean overview table using native browser developer tool features (`console.table`).

## How the Algorithm Works

1. **Sorting:** Teams are arranged in descending order based on their points.
2. **Slicing:** The sorted array is divided into 4 distinct pots containing 8 teams each.
3. **Shuffling:** Teams within each pot are shuffled randomly using a Fisher-Yates-style array sorter before the drawing sequence.
4. **Validation:** For every single pick, the algorithm verifies that the target group doesn't already contain a team from the same country and hasn't already received a team from the current pot. If a dead-end occurs, the entire draw restarts seamlessly.

---

## Installation & Usage

Since this is a standalone JavaScript script running entirely on the client side, there are no dependencies or server environments required.

### Run in Browser Console
1. Open your favorite web browser (Chrome, Firefox, Edge, Safari).
2. Open the **Developer Tools** (Press `F12` or `Ctrl+Shift+I` / `Cmd+Option+I`).
3. Navigate to the **Console** tab.
4. Copy the entire code from `ucl-draw-simulator.js` and paste it into the console.
5. Hit `Enter` to run the simulation and view the group tables instantly.

---

## Sample Data Structure

Teams are structured using simple, extensible JavaScript objects:

```javascript
{ name: 'Team A1', country: 'Country A', points: 32 }

```

You can easily modify the `teams` array in the script to match real-world club names, countries, and UEFA coefficients for custom simulation setups.

## Contributing

Contributions, bug reports, and optimizations (such as implementing the mathematical back-tracking alternative for drawing restrictions) are welcome! Feel free to open an issue or submit a pull request.

## Support

For questions, troubleshooting, or general inquiries regarding the simulator, please visit the GitHub issues page or contact the author via [http://webkolog.net](http://webkolog.net).

## License

This project is open-source software licensed under the [MIT license](http://mit-license.org/).
