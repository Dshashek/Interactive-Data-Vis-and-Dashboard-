function buildMetadata(sample) {
  var data = ''
  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  meta = d3.json(`/metadata/${sample}`)

  meta.then(function(data) {
    // Use d3 to select the panel with id of `#sample-metadata`
    // Use `.html("") to clear any existing metadata

  d3.select('#sample-metadata').html("");
    // Use `Object.entries` to add each key and value pair to the panel
  for (let [key, value] of Object.entries(data)) {
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    d3.select('#sample-metadata').append('li').text(`${key}: ${value}`)
    };
  return data
})
}
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
plot_data = d3.json(`/samples/${sample}`)
plot_data.then(function(data) {

var pieSampleValues = data.sample_values.slice(0,10); 
var pieSampleOtuIds = data.otu_ids.slice(0,10); 
var pieSampleOtuLabels = data.otu_labels.slice(0,10); 
var bubbleValues = data.sample_values; 
var bubbleIds = data.otu_ids;
var bubbleLabels = data.otu_labels;


var pieData = [{
  values: pieSampleValues,
  labels: pieSampleOtuIds,
  name: 'Bacteria:',
  type: 'pie',
  hovertinfo: pieSampleOtuLabels
}]

var bubbleData = [{
  x: bubbleIds,
  y: bubbleValues,
  text: bubbleLabels,
  mode: 'markers',
  marker: {color: bubbleIds,size: bubbleValues}
}]

Plotly.newPlot('pie', pieData)
Plotly.newPlot('bubble', bubbleData)
});

    // @TODO: Build a Bubble Chart using the sample data




  };
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
