let resource_count = 0;
let drill_upgrade_cost = 50;
let auto_drill_cost = 150;
let drill_level = 0;
let auto_drill_count = 0;
let technology_age = 0;
let technology_upgrade_cost = 500;
const dyson_goal = 10000;

document.getElementById("drill_upgrade_cost").textContent = drill_upgrade_cost;
document.getElementById("auto_drill_cost").textContent = auto_drill_cost;
document.getElementById("technology_upgrade_cost").textContent = technology_upgrade_cost;

function spawnFloatingText(amount, x, y) {
    const floatingText = document.createElement("div");
    floatingText.classList.add("floating_text");
    floatingText.textContent = "+" + amount;
    floatingText.style.left = x + "px";
    floatingText.style.top = y + "px";
    document.body.appendChild(floatingText);

    setTimeout(() => {
        floatingText.remove();
    }, 1500);
}

function updateDysonBar() {
    let percent = (resource_count / dyson_goal) * 100;
    if (percent > 100) percent = 100;

    document.getElementById("dyson_fill").style.width = percent + "%";
    document.getElementById("dyson_text").textContent =  `Dyson Swarm Completion ${Math.floor(percent)}%`;

    if (resource_count >= dyson_goal) {
        document.getElementById("dyson_text").textContent = "BUILD DYSON SWARM";
    }
}

function buildDysonSwarm() {
    if (resource_count >= dyson_goal) {
        resource_count -= dyson_goal;
        document.getElementById("resource_count").textContent = resource_count;
        alert("You have built the Dyson Swarm!");
        updateDysonBar();
    }
}

function extractResource(event) {
    let amountGained = 0;

    if (technology_age >= 1) {
        if (drill_level == 0) {
            amountGained = Math.floor(technology_age * 2);
        } else if (drill_level == 1) {
            amountGained = Math.floor(technology_age * 2) + 1;
        } else {
            amountGained = Math.floor(technology_age * 2) * drill_level;
        }
    } else {
        amountGained = 1 + drill_level;
    }

    resource_count += amountGained;
    document.getElementById("resource_count").textContent = resource_count;

    updateDysonBar();

    /* grabs the mouse click coordinates */
    let x = event.clientX;
    let y = event.clientY;

    /* randomly offset the floating text */
    x += (Math.random() - 0.5) * 50;
    y += (Math.random() - 0.5) * 50;

    spawnFloatingText(amountGained, x, y);
}

function upgradeDrill() {
    if (resource_count >= drill_upgrade_cost) {
        resource_count -= drill_upgrade_cost;
        drill_level += 1;
        drill_upgrade_cost = Math.floor(drill_upgrade_cost * 1.25);
        document.getElementById("resource_count").textContent = resource_count;
        document.getElementById("drill_upgrade_cost").textContent = drill_upgrade_cost;
        document.getElementById("drill_level").textContent = drill_level;
    }
}

function buyAutoDrill() {
    if (resource_count >= auto_drill_cost) {
        resource_count -= auto_drill_cost;
        auto_drill_count += 1;
        auto_drill_cost = Math.floor(auto_drill_cost * 1.25);
        document.getElementById("resource_count").textContent = resource_count;
        document.getElementById("auto_drill_cost").textContent = auto_drill_cost;
        document.getElementById("auto_drill_count").textContent = auto_drill_count;
    }
}

function advanceTechnology() {
    if (resource_count >= technology_upgrade_cost) {
        resource_count -= technology_upgrade_cost;
        technology_age += 1;
        technology_upgrade_cost = Math.floor(technology_upgrade_cost * 1.5);
        document.getElementById("resource_count").textContent = resource_count;
        document.getElementById("technology_upgrade_cost").textContent = technology_upgrade_cost;
        document.getElementById("technology_age").textContent = technology_age;
    }
}

setInterval(() => {
    let amountGained = 0;
    if (auto_drill_count > 0) {
        if (technology_age > 0) {
            amountGained = Math.floor(technology_age * 2) * auto_drill_count;
        } else {
            amountGained = auto_drill_count;
        }
        
        const asteroid = document.querySelector(".asteroid");
        /* checks if asteroid is set then spawns floating text */ 
        if (asteroid) {
            const rect = asteroid.getBoundingClientRect();
            let x = rect.left + (Math.random() * rect.width);
            let y = rect.top + (Math.random() * rect.height);
            spawnFloatingText(amountGained, x, y);
        }
    }

    resource_count += amountGained;
    document.getElementById("resource_count").textContent = resource_count;

    updateDysonBar();
}, 1000);

setInterval(() => {
    updateDysonBar();
}, 100);

function reset() {
    resource_count = 0;
    auto_drill_count = 0;
    drill_level = 0;
    technology_age = 0;
    drill_upgrade_cost = 50;
    auto_drill_cost = 150;
    technology_upgrade_cost = 500;

    document.getElementById("resource_count").textContent = resource_count;
    document.getElementById("drill_upgrade_cost").textContent = drill_upgrade_cost;
    document.getElementById("auto_drill_cost").textContent = auto_drill_cost;
    document.getElementById("technology_upgrade_cost").textContent = technology_upgrade_cost;
    document.getElementById("drill_level").textContent = drill_level;
    document.getElementById("auto_drill_count").textContent = auto_drill_count;
    document.getElementById("technology_age").textContent = technology_age;

    updateDysonBar();
}

function toggleInfo() {
    const dev_button = document.getElementById("dev_tool_button");
    if (dev_button) {
        dev_button.classList.toggle("hidden");
    }

    const boost_info_button = document.querySelectorAll(".boost_info");
    boost_info_button.forEach(info => {
        info.classList.toggle("hidden");
    });
}

function toggleCredits() {
    // Placeholder for your future credits text or modal logic
    alert("Credits:\n\nDeveloper: Brent Greene\nArt: \n1. Asteroid- https://www.magnific.com/free-psd/isolated-dark-grey-asteroid-3d-render-space-rock_409843503.htm#fromView=keyword&page=1&position=0&uuid=586ce27d-16b1-4656-9d97-ce6001e6c1d2&query=Asteroid \n2. Space Background- https://www.magnific.com/free-vector/realistic-galaxy-background_14960493.htm#fromView=keyword&page=1&position=0&uuid=bf1eacbf-7595-461c-aca1-6b7b7f9f10be&query=Space+background");
}

function devTool(event) {
    let button = document.getElementById(event.target.id);

    if (button.id == "dev_tool_button") {
        resource_count += 1000;
        document.getElementById("resource_count").textContent = resource_count;
    }
}