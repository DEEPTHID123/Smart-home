document.addEventListener("DOMContentLoaded", function () {
    let device = localStorage.getItem("selectedDevice");
    document.getElementById("device-title").innerText = device.charAt(0).toUpperCase() + device.slice(1) + " Energy Usage";

    fetch(`/get_device_data?device=${device}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById("device-content").innerHTML = `<p>Error: ${data.error}</p>`;
            } else {
                generateUsageGraph(data.usage);
                displaySuggestions(data.suggestions);
            }
        })
        .catch(error => console.error("Error fetching data:", error));
});

function generateUsageGraph(usageData) {
    let ctx = document.getElementById("deviceGraph").getContext("2d");

    let randomMinValue = Math.floor(Math.random() * 5); 

    new Chart(ctx, {
        type: "line",
        data: {
            labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
            datasets: [{
                label: "Energy Usage (kWh)",
                data: usageData,
                borderColor: "white", 
                backgroundColor: "rgba(255, 152, 0, 0.2)", 
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true, 
                    min: randomMinValue, 
                    grid: {
                        color: "rgba(255, 255, 255, 0.2)" 
                    }
                }
            },
            plugins: {
                annotation: {
                    annotations: [
                        {
                            type: 'line',
                            yMin: randomMinValue, 
                            yMax: randomMinValue, 
                            borderColor: 'yellow', 
                            borderWidth: 2,
                            label: {
                                content: 'Min Value', 
                                enabled: true,
                                position: 'start',
                                font: {
                                    size: 12,
                                    weight: 'bold',
                                    color: 'yellow'
                                }
                            }
                        }
                    ]
                }
            }
        }
    });
}

function displaySuggestions(suggestions) {
    let suggestionList = document.getElementById("suggestions");
    suggestionList.innerHTML = "<h3>Energy Saving Tips:</h3>";
    suggestions.forEach(tip => {
        let li = document.createElement("li");
        li.innerText = tip;
        suggestionList.appendChild(li);
    });
}
