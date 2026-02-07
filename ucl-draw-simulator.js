/*
Project Name: UEFA Champions League Group Stage Draw Simulation
File Name: ucl-draw-simulator.js
Author: Ali Candan (webkolog.net)
Date: 2026-02-08 02:34
Description: An algorithm created as a console application in the browser. Purpose is to simulate the Champions League group stage draw format used prior to 2025.
*/

// Define teams
let teams = [
    // POT 1: Highest points (32-25)
    { name: 'Team A1', country: 'Country A', points: 32 },
    { name: 'Team B1', country: 'Country B', points: 31 },
    { name: 'Team C1', country: 'Country C', points: 30 },
    { name: 'Team D1', country: 'Country D', points: 29 },
    { name: 'Team E1', country: 'Country E', points: 28 },
    { name: 'Team F1', country: 'Country F', points: 27 },
    { name: 'Team G1', country: 'Country G', points: 26 },
    { name: 'Team H1', country: 'Country H', points: 25 },

    // POT 2: (24-17)
    { name: 'Team A2', country: 'Country A', points: 24 },
    { name: 'Team B2', country: 'Country B', points: 23 },
    { name: 'Team C2', country: 'Country C', points: 22 },
    { name: 'Team D2', country: 'Country D', points: 21 },
    { name: 'Team E2', country: 'Country E', points: 20 },
    { name: 'Team F2', country: 'Country F', points: 19 },
    { name: 'Team G2', country: 'Country G', points: 18 },
    { name: 'Team H2', country: 'Country H', points: 17 },

    // POT 3: (16-9)
    { name: 'Team A3', country: 'Country A', points: 16 },
    { name: 'Team B3', country: 'Country B', points: 15 },
    { name: 'Team C3', country: 'Country C', points: 14 },
    { name: 'Team D3', country: 'Country D', points: 13 },
    { name: 'Team E3', country: 'Country E', points: 12 },
    { name: 'Team F3', country: 'Country F', points: 11 },
    { name: 'Team G3', country: 'Country G', points: 10 },
    { name: 'Team H3', country: 'Country H', points: 9 },

    // POT 4: (8-1)
    { name: 'Team A4', country: 'Country A', points: 8 },
    { name: 'Team B4', country: 'Country B', points: 7 },
    { name: 'Team C4', country: 'Country C', points: 6 },
    { name: 'Team D4', country: 'Country D', points: 5 },
    { name: 'Team E4', country: 'Country E', points: 4 },
    { name: 'Team F4', country: 'Country F', points: 3 },
    { name: 'Team G4', country: 'Country G', points: 2 },
    { name: 'Team H4', country: 'Country H', points: 1 }
];

// Sort teams by points and create Pots
teams.sort((a, b) => b.points - a.points);
const pots = Array.from({ length: 4 }, (_, i) => teams.slice(i * 8, (i + 1) * 8));

function startDraw() {
    let groups;
    let success = false;

    while (!success) {
        // Reset groups on each attempt
        groups = Array.from({ length: 8 }, (_, i) => ({
            name: String.fromCharCode(65 + i), // A, B, C...
            teams: []
        }));
        
        success = true;

        // Draw for each pot
        for (let p = 0; p < 4; p++) {
            let currentPot = [...pots[p]];
            // Shuffle current pot (Fisher-Yates style shuffle)
            currentPot.sort(() => Math.random() - 0.5);

            for (let t = 0; t < currentPot.length; t++) {
                let team = currentPot[t];
                // Find eligible groups for this team (country protection)
                let eligibleGroups = groups.filter(g => 
                    g.teams.length === p && // Group hasn't received a team from this pot yet
                    !g.teams.some(gt => gt.country === team.country) // Country protection rule
                );

                if (eligibleGroups.length === 0) {
                    // Deadlock occurred: invalid group configuration. Reset and restart draw.
                    success = false;
                    break;
                }

                // Randomly select one of the eligible groups
                let selectedGroup = eligibleGroups[Math.floor(Math.random() * eligibleGroups.length)];
                selectedGroup.teams.push(team);
            }
            if (!success) break;
        }
    }

    // Display Results
    console.log("%c UEFA CHAMPIONS LEAGUE GROUP DRAW ", "background: #003366; color: #fff; font-size: 20px; padding: 5px;");
    console.table(groups.map(g => ({
        Group: g.name,
        "Pot 1": `${g.teams[0].name} (${g.teams[0].country})`,
        "Pot 2": `${g.teams[1].name} (${g.teams[1].country})`,
        "Pot 3": `${g.teams[2].name} (${g.teams[2].country})`,
        "Pot 4": `${g.teams[3].name} (${g.teams[3].country})`
    })));
}

startDraw();