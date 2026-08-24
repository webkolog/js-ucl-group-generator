const assert = require('node:assert');
const test = require('node:test');
const { startDraw } = require('../ucl-draw-simulator.js');

test('UEFA Champions League Draw Simulation Tests', async (t) => {
    
    await t.test('Draw should generate exactly 8 groups with 4 teams each', () => {
        const groups = startDraw();
        
        assert.strictEqual(groups.length, 8, '8 grup oluşturulmalı');
        
        groups.forEach(group => {
            assert.strictEqual(group.teams.length, 4, `${group.name} grubunda tam 4 takım olmalı`);
        });
    });

    await t.test('Country Protection Rule: No two teams from the same country in one group', () => {
        const groups = startDraw();
        
        groups.forEach(group => {
            const countries = group.teams.map(t => t.country);
            const uniqueCountries = new Set(countries);
            assert.strictEqual(uniqueCountries.size, countries.length, `${group.name} grubunda aynı ülkeden birden fazla takım var!`);
        });
    });

    await t.test('Pot Allocation Rule: Each group must contain exactly 1 team from each Pot', () => {
        const groups = startDraw();
        
        groups.forEach(group => {
            const teamPoints = group.teams.map(t => t.points);
            
            assert.ok(teamPoints.some(p => p >= 25 && p <= 32), `${group.name} grubunda Pot 1 takımı yok`);
            assert.ok(teamPoints.some(p => p >= 17 && p <= 24), `${group.name} grubunda Pot 2 takımı yok`);
            assert.ok(teamPoints.some(p => p >= 9 && p <= 16), `${group.name} grubunda Pot 3 takımı yok`);
            assert.ok(teamPoints.some(p => p >= 1 && p <= 8), `${group.name} grubunda Pot 4 takımı yok`);
        });
    });
});
