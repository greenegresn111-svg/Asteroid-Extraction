let resource_count = 0;
let drill_upgrade_cost = 100;
let auto_drill_cost = 200;
let drill_level = 0;
let auto_drill_count = 0;
let technology_age = 0;
let technology_upgrade_cost = 300;

document.getElementById("drill_upgrade_cost").textContent = drill_upgrade_cost;
document.getElementById("auto_drill_cost").textContent = auto_drill_cost;
document.getElementById("technology_upgrade_cost").textContent = technology_upgrade_cost;

function extractResource() {
    if (technology_age >= 1) {
        resource_count += Math.floor(technology_age * 1) + drill_level;
    } else {
        resource_count += 1 + drill_level;
    }
    document.getElementById("resource_count").textContent = resource_count;
}

function upgradeDrill() {
    if (resource_count >= drill_upgrade_cost) {
        resource_count -= drill_upgrade_cost;
        drill_level += 1;
        drill_upgrade_cost = Math.floor(drill_upgrade_cost * 1.5);
        document.getElementById("resource_count").textContent = resource_count;
        document.getElementById("drill_upgrade_cost").textContent = drill_upgrade_cost;
    }
}

function buyAutoDrill() {
    if (resource_count >= auto_drill_cost) {
        resource_count -= auto_drill_cost;
        auto_drill_count += 1;
        auto_drill_cost = Math.floor(auto_drill_cost * 1.5);
        document.getElementById("resource_count").textContent = resource_count;
        document.getElementById("auto_drill_cost").textContent = auto_drill_cost;
    }
}

function advanceTechnology() {
    if (resource_count >= technology_upgrade_cost) {
        resource_count -= technology_upgrade_cost;
        technology_age += 1;
        technology_upgrade_cost = Math.floor(technology_upgrade_cost * 2);
        document.getElementById("resource_count").textContent = resource_count;
        document.getElementById("technology_upgrade_cost").textContent = technology_upgrade_cost;
    }
}

setInterval(() => {
    resource_count += auto_drill_count;
    document.getElementById("resource_count").textContent = resource_count;
}, 1000);

function reset() {
    resource_count = 0;
    auto_drill_count = 0;
    drill_level = 0;
    drill_upgrade_cost = 100;
    auto_drill_cost = 200;
    technology_age = 0;
    technology_upgrade_cost = 500;
    document.getElementById("resource_count").textContent = resource_count;
    document.getElementById("drill_upgrade_cost").textContent = drill_upgrade_cost;
    document.getElementById("auto_drill_cost").textContent = auto_drill_cost;
    document.getElementById("technology_upgrade_cost").textContent = technology_upgrade_cost;
}