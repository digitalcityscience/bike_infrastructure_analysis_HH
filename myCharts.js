const areaDistributionChart = {
    type: "bar",
    data: {
      labels: [["Fahrbahn", "+ öffentl. Parkraum"], "Radwege", "Fusswege"],
      datasets: [
        {
          label: "% der Verkehrsfläche",
          data: [60.95, 3.41, 28.85],
          stack: 'Stack 0',
          backgroundColor: [
            "rgba(217, 94, 139, 1)", // Fahrbahn
            "rgba(103, 180, 255, 1)", // Rad
            "rgba(73, 109, 238, 1)", // Fusswege
          ],
          borderColor: [
            "rgba(217, 94, 139, 1)", // Fahrbahn
            "rgba(103, 180, 255, 1)", // Rad
            "rgba(73, 109, 238, 1)", // Fusswege
          ],
          borderWidth: 1,
        },{
          label: 'Parkraum',
          data: [6.8],
          stack: 'Stack 0',
          backgroundColor: [
            "rgba(230, 126, 34, 1)", // Parken
          
          ],
          borderColor: [
            "rgba(230, 126, 34, 1)", // Parken
          ],
          borderWidth: 1,
        },
        {
          label: "% Verkehrsanteil (Modal-Split)",
          data: [32, 22, 22],
          stack: 'Stack 1',
          backgroundColor: [
            "rgba(217, 94, 139, 0.2)", // Fahrbahn
            "rgba(103, 180, 255, 0.2)", // Rad
            "rgba(73, 109, 238, 0.2)", // Fusswege
          ],
          borderColor: [
            "rgba(217, 94, 139, 0.2)", // Fahrbahn
            "rgba(103, 180, 255, 0.2)", // Rad
            "rgba(73, 109, 238, 0.2)", // Fusswege
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
      legend: {
        labels: {
          filter: item => item.text !== 'Parkraum'
      }
      }},
      maintainAspectRatio: false,
      scales: {
        x: {
          stacked: true,
          grid: {
            display: false,
          },
        },
        y: {
          stacked: true,
          beginAtZero: true,
          grid: {
            display: false,
          },
        },
      },
    },
  };


const footprintChart = {
    plugins: [ChartDataLabels],
    type: "bar",
    data: {
      labels: [
        "Fahrbahn*",
        "Öffentl. Parkraum",
        "Fusswege",
        "Grünflächen etc.",
      ],
      datasets: [
        {
          label: "Gesamtfläche",
          data: [25935105, 4358615, 12488230, 9634214],
          backgroundColor: [
            "rgba(217, 94, 139, 0.2)", // Fahrbahn
            "rgba(73, 109, 238, 0.2)", // Parken
            "rgba(218, 214, 98, 0.2)", // Fusswege
            "rgba(25, 138, 29, 0.2)", // Grünflächen
          ],
          borderColor: [
            "rgba(217, 94, 139, 0.2)",
            "rgba(73, 109, 238, 0.2)",
            "rgba(218, 214, 98, 0.2)",
            "rgba(25, 138, 29, 0.2)",
          ],
          borderWidth: 1,
        },
        {
          label: "Umbau zu Radinfrastruktur seit 2019",
          data: [184185, 11873, 30699, 7748],
          backgroundColor: [
            "rgba(217, 94, 139, 1)",
            "rgba(4, 0, 78, 1)",
            "rgba(218, 214, 98, 1)",
            "rgba(25, 138, 29, 1)",
          ],
          borderColor: [
            "rgba(217, 94, 139, 1)",
            "rgba(4, 0, 78, 1)",
            "rgba(218, 214, 98, 1)",
            "rgba(25, 138, 29, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        x: {
          stacked: true,
          grid: {
            display: false,
          },
        },
        y: {
          stacked: true,
          labels: false,
          grid: {
            display: false,
          },
          ticks: {
              display: false
          }
        },
      },
      tooltips: {
        enabled: false,
      },
      plugins: {
        tooltips: {
          enabled: true,
        },
        datalabels: {
          display: (ctx) => {
            // display only for the dataset "Umbau zu Radinfrastruktur"
            return ctx.datasetIndex == 1;
          },
          formatter: (value, ctx) => {
            originalArea = ctx.chart.data.datasets[0].data[ctx.dataIndex];
            convertedArea =
              ctx.chart.data.datasets[1].data[ctx.dataIndex];
            percentage =
              parseFloat((convertedArea / originalArea) * 100).toFixed(
                2
              ) + "%";

            return percentage;
          },
          color: "black",
        },
      },
    },
  };