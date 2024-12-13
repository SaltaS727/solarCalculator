"use strict";

function calculateSolar() {
  const form = document.forms.solarForm;
  const zone = form.zone.value;
  const panelWattage = parseInt(form.panel.value, 10);
  let monthlyConsumption = 0;
  let minMonth = "";
  let minUsage = Infinity;

  // List of months
  const months = [
    { name: "January", field: "jan" },
    { name: "February", field: "feb" },
    { name: "March", field: "mar" },
    { name: "April", field: "apr" },
    { name: "May", field: "may" },
    { name: "June", field: "jun" },
    { name: "July", field: "jul" },
    { name: "August", field: "aug" },
    { name: "September", field: "sep" },
    { name: "October", field: "oct" },
    { name: "November", field: "nov" },
    { name: "December", field: "dec" },
  ];

  // Loop through months and validate inputs
  const breakdownRows = [];
  for (const month of months) {
    const usage = parseInt(form[month.field].value, 10);

    if (isNaN(usage) || usage < 0) {
      alert(`Please enter a valid number for ${month.name}.`);
      return;
    }

    monthlyConsumption += usage;

    if (usage < minUsage) {
      minUsage = usage;
      minMonth = month.name;
    }

    // Calculate panels needed for this month
    const dailyConsumption = usage / 30;
    const sunHours = getSunHours(zone);
    const monthlyPanels = Math.ceil((dailyConsumption / sunHours) * 1000 / panelWattage);

    // Add row data for this month
    breakdownRows.push({ name: month.name, usage, monthlyPanels });
  }

  // Update table with breakdown data
  const tableBody = document.querySelector("#breakdownTable tbody");
  tableBody.innerHTML = ""; // Clear existing rows
  breakdownRows.forEach((row) => {
    const tableRow = `
      <tr>
        <td>${row.name}</td>
        <td>${row.usage} kWh</td>
        <td>${row.monthlyPanels} panels</td>
      </tr>
    `;
    tableBody.innerHTML += tableRow;
  });

  // Display feedback
  const feedback = document.getElementById("feedback");
  feedback.innerHTML = `
    <p>Total monthly consumption: <strong>${monthlyConsumption} kWh</strong>.</p>
    <p>The month with the lowest consumption is <strong>${minMonth}</strong> with <strong>${minUsage} kWh</strong>.</p>
  `;
}

function getSunHours(zone) {
  switch (zone) {
    case "Zone 1":
      return 3.5;
    case "Zone 2":
      return 4.0;
    case "Zone 3":
      return 4.5;
    case "Zone 4":
      return 5.0;
    case "Zone 5":
      return 5.5;
    case "Zone 6":
      return 6.0;
    default:
      return 4.0; // Default value
  }
}
