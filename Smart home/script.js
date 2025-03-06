const minUsage = {
    "Lights": 25,
    "AC": 50,
    "Refrigerator": 45,
    "Television": 18,
    "Washing Machine": 25,
    "Microwave": 15,
    "Water Heater": 35,
    "Other Devices": 15
};

function checkDeviceUsage(device, usage) {
    if (usage > minUsage[device]) {
        alert(`${device} is using more energy than the minimum allowed!`);
    }
}

function redirectToDevice(device) {
    localStorage.setItem("selectedDevice", device);
    window.location.href = "device.html";
    const usage = parseFloat(document.getElementById(`${device}-usage`).innerText); 
    checkDeviceUsage(device, usage); 
}

let budget = localStorage.getItem("userBudget") ? parseFloat(localStorage.getItem("userBudget")) : 50;

function setBudget() {
    budget = parseFloat(document.getElementById('budgetInput').value);
    
    localStorage.setItem("userBudget", budget);

   alert(`Budget set to ${budget} kWh`);

   checkBudget();
}

function calculateTotalUsage() {
     const reportData = [
        { device: "Lights", usage: 15 },
        { device: "AC", usage: 30 },
        { device: "Refrigerator", usage: 50 },
        { device: "Television", usage: 18 },
        { device: "Washing Machine", usage: 42 },
        { device: "Microwave", usage: 20 },
        { device: "Water Heater", usage: 35 },
        { device: "Other Devices", usage: 25 }
    ];

    const totalUsage = reportData.reduce((total, item) => total + item.usage, 0);

    return totalUsage;
}

function checkBudget() {
    const totalUsage = calculateTotalUsage(); 

    console.log("Total Usage: " + totalUsage); 
    const roundedTotalUsage = parseFloat(totalUsage.toFixed(2));
    const roundedBudget = parseFloat(budget.toFixed(2));

    console.log("Rounded Total Usage: " + roundedTotalUsage);
    console.log("Rounded Budget: " + roundedBudget);

    if (roundedBudget > roundedTotalUsage) {
        document.getElementById('budget-alert').innerText = "✅ Energy usage within budget";
    } else {
        document.getElementById('budget-alert').innerText = "⚠ Energy usage not within budget";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById('comparisonChart')?.getContext('2d');
    if (ctx) {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Min Usage', 'Current Average'],
                datasets: [{
                    label: 'Energy Usage (kWh)',
                    data: [10, (5 + 20 + 10 + 15) / 4],
                    backgroundColor: ['#2196F3', '#FF9800']
                }]
            }
        });
    }

    highlightActivePage(); 
    document.getElementById("report-buttons")?.classList.add("hidden"); 
    checkBudget(); 
});

function highlightActivePage() {
    const currentPage = window.location.pathname.split("/").pop();
    document.querySelectorAll(".sidebar ul li a").forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

function askAI() {
    document.getElementById('ai-response').innerText = "AI Assistant is thinking...";
    setTimeout(() => {
        document.getElementById('ai-response').innerText = "How can I assist you with energy management?";
    }, 2000);
}

function generateReport() {
    const costPerKwh = 20; 

    const reportData = [
        ["Appliance", "Usage (kWh)", "Min Allowed (kWh)", "Total Cost (₹)", "Profit / Loss %"],
        ["Lights", 15, minUsage["Lights"], (15 * costPerKwh).toFixed(2), calcProfitLoss(15, minUsage["Lights"])],
        ["AC", 30, minUsage["AC"], (30 * costPerKwh).toFixed(2), calcProfitLoss(30, minUsage["AC"])],
        ["Refrigerator", 50, minUsage["Refrigerator"], (50 * costPerKwh).toFixed(2), calcProfitLoss(50, minUsage["Refrigerator"])],
        ["Television", 18, minUsage["Television"], (18 * costPerKwh).toFixed(2), calcProfitLoss(18, minUsage["Television"])],
        ["Washing Machine", 42, minUsage["Washing Machine"], (42 * costPerKwh).toFixed(2), calcProfitLoss(42, minUsage["Washing Machine"])],
        ["Microwave", 20, minUsage["Microwave"], (20 * costPerKwh).toFixed(2), calcProfitLoss(20, minUsage["Microwave"])],
        ["Water Heater", 35, minUsage["Water Heater"], (35 * costPerKwh).toFixed(2), calcProfitLoss(35, minUsage["Water Heater"])],
        ["Other Devices", 25, minUsage["Other Devices"], (25 * costPerKwh).toFixed(2), calcProfitLoss(25, minUsage["Other Devices"])],
        ["Total Usage", 91, "-", (91 * costPerKwh).toFixed(2), "-"]
    ];

    let tableHTML = "<table>";
    reportData.forEach((row, index) => {
        let rowHTML = "<tr>";
        row.forEach(cell => {
            rowHTML += index === 0 ? `<th>${cell}</th>` : `<td>${cell}</td>`;
        });
        rowHTML += "</tr>";
        tableHTML += rowHTML;
    });
    tableHTML += "</table>";

    document.getElementById("report-content").innerHTML = tableHTML;
    document.getElementById("report-buttons").classList.remove("hidden");
}

function calcProfitLoss(actual, minAllowed) {
    if (actual <= minAllowed) {
        return `+${(((minAllowed - actual) / minAllowed) * 100).toFixed(2)}% (Profit)`;
    } else {
        return `-${(((actual - minAllowed) / minAllowed) * 100).toFixed(2)}% (Loss)`;
    }
}

function printReport() {
    window.print();
}

function downloadReport() {
    const reportText = document.getElementById("report-content").innerText;
    const blob = new Blob([reportText], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Energy_Report.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

document.addEventListener("DOMContentLoaded", function () {
    const versionInfo = document.getElementById('version');
    if (versionInfo) {
        versionInfo.style.textAlign = "center";
        versionInfo.style.margin = "auto";
        versionInfo.style.width = "50%";
    }
});

const lightModeBtn = document.getElementById("light-mode");
const darkModeBtn = document.getElementById("dark-mode");
const body = document.body;

if (lightModeBtn && darkModeBtn) {
    lightModeBtn.addEventListener("click", function () {
        body.classList.remove("dark-theme");
        body.classList.add("light-theme");
        lightModeBtn.classList.add("active");
        darkModeBtn.classList.remove("active");
    });

    darkModeBtn.addEventListener("click", function () {
        body.classList.remove("light-theme");
        body.classList.add("dark-theme");
        darkModeBtn.classList.add("active");
        lightModeBtn.classList.remove("active");
    });
}
