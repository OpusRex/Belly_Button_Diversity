function init(){
    var selector = d3.select("#selDataset");

    d3.json("samples.json").then((data)=>{
        console.log(data);
        var sampleNames = data.names;
        sampleNames.forEach((sample)=>{
            selector
            .append('option')
            .text(sample)
            .property('value', sample);
        })

        var metadata = data.metadata;
        var resultArray = metadata.filter(sampleObj => sampleObj.id == 940);
        var result = resultArray[0]
        var PANEL = d3.select("#sample-metadata");
        var resultKeys = []
        Object.keys(result).forEach((r) =>{
            resultKeys.push(r)
        })
        
        PANEL.html("");
        PANEL.append("h6").text(resultKeys[0] + ": " + result.id)
        PANEL.append("h6").text(resultKeys[1]  + ": " +result.ethnicity)
        PANEL.append("h6").text(resultKeys[2] + ": "+ result.gender)
        PANEL.append("h6").text(resultKeys[3] + ": "+ result.age)
        PANEL.append("h6").text(resultKeys[4] + ": " + result.location)
        PANEL.append("h6").text(resultKeys[5] + ": "+ result.bbtype)
        PANEL.append("h6").text(resultKeys[6] + ": " + result.wfreq)

        var otusamples = data.samples;
        var otusampleArray = otusamples.filter(item => item.id == 940);
        var sampleVal = otusampleArray[0].sample_values.slice(0,10).reverse()
        var otuID = otusampleArray[0].otu_ids.slice(0,10).reverse()
        var otuLabel = otusampleArray[0].otu_labels.slice(0,10).reverse()
        var xLabel = []
        otuID.forEach((n)=>{
            xLabel.push("OTU " + n)
        })
        
        var trace1 = {
            y: xLabel,
            x: sampleVal,
            text: otuLabel,
            type: 'bar',
            marker: {color: 'rgb(229,43,80)'},
            orientation: 'h'}
        
        Plotly.newPlot("bar", [trace1]);

        var trace_bubble = {
            x: otusampleArray[0].otu_ids,
            y: otusampleArray[0].sample_values,
            text: otuLabel,
            mode: "markers",
            marker: {
                color: otusampleArray[0].otu_ids,
                size: otusampleArray[0].sample_values
            }
        };
        var wfreqArray = metadata.filter(item => item.id == 940);
        var wfreqVal = wfreqArray[0].wfreq
        var data = [
            {domain: {x:[0,1], y:[0,1]},
            value: wfreqVal,
            title: "Belly Button Washing Frequency",
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: {range: [null, 9]},
                steps: [{range: [0,1], color: "rgb(255,230,230)"},{range: [1,2],color: "rgb(255,204,204)"},
                {range: [2,3],color: 'rgb(255,179,179)'},{range: [3,4], color: 'rgb(255,153,153)'},
                {range: [4,5], color: 'rgb(255,128,128)'},{range: [5,6], color: 'rgb(255,102,102)'},
                {range: [6,7], color: 'rgb(255,77,77)'},{range: [7,8], color: 'rgb(255,51,51)'},
                {range: [8,9], color: 'rgb(255,25,25)'}]     
            }
            }]
        Plotly.newPlot('gauge', data);

        var layout_bubble = {
            xaxis: {title: "OTU ID"},
        }

        Plotly.newPlot("bubble", [trace_bubble], layout_bubble);
        });
    }
init();

function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
    buildGauge(newSample);
}

function buildMetadata(sample) {
    d3.json('samples.json').then((data)=>{
        var metadata = data.metadata;
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0]
        var PANEL = d3.select("#sample-metadata");
        var resultKeys = []
        Object.keys(result).forEach((r) =>{
            resultKeys.push(r)
        })

        PANEL.html("");
        PANEL.append("h6").text(resultKeys[0] + ": " + result.id)
        PANEL.append("h6").text(resultKeys[1]  + ": " +result.ethnicity)
        PANEL.append("h6").text(resultKeys[2] + ": "+ result.gender)
        PANEL.append("h6").text(resultKeys[3] + ": "+ result.age)
        PANEL.append("h6").text(resultKeys[4] + ": " + result.location)
        PANEL.append("h6").text(resultKeys[5] + ": "+ result.bbtype)
        PANEL.append("h6").text(resultKeys[6] + ": " + result.wfreq)
    
    })}

function buildCharts(sample) {
    d3.json('samples.json').then((data) =>{
        var otusamples = data.samples;
        var otusampleArray = otusamples.filter(item => item.id == sample);
        var sampleVal = otusampleArray[0].sample_values.slice(0,10).reverse()
        var otuID = otusampleArray[0].otu_ids.slice(0,10).reverse()
        var otuLabel = otusampleArray[0].otu_labels.slice(0,10).reverse()
        var xLabel = []
        otuID.forEach((n)=>{
            xLabel.push("OTU " + n)
        })
        
        var trace1 = {
            y: xLabel,
            x: sampleVal,
            text: otuLabel,
            marker: {color: 'rgb(229,43,80)'},
            type: 'bar',
            orientation: 'h'}
        Plotly.newPlot("bar", [trace1]);

        var trace_bubble = {
            x: otusampleArray[0].otu_ids,
            y: otusampleArray[0].sample_values,
            text: otuLabel,
            mode: "markers",
            marker: {
                color: otusampleArray[0].otu_ids,
                size: otusampleArray[0].sample_values,
            }
        };
        var layout_bubble = {
            xaxis: {title: "OTU ID"},
        }
        Plotly.newPlot("bubble", [trace_bubble], layout_bubble);
    })
};

function buildGauge(sample) {
    d3.json('samples.json').then((data) =>{
        var metadata  = data.metadata;
        var wfreqArray = metadata.filter(item => item.id == sample);
        var wfreqVal = wfreqArray[0].wfreq;
        //console.log(sample);
        var data = [
            {domain: {x:[0,1], y:[0,1]},
            value: wfreqVal,
            title: "Belly Button Washing Frequency",
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: {range: [null, 9]},
                steps: [{range: [0,1], color: "rgb(255,230,230)"},{range: [1,2],color: "rgb(255,204,204)"},
                {range: [2,3],color: 'rgb(255,179,179)'},{range: [3,4], color: 'rgb(255,153,153)'},
                {range: [4,5], color: 'rgb(255,128,128)'},{range: [5,6], color: 'rgb(255,102,102)'},
                {range: [6,7], color: 'rgb(255,77,77)'},{range: [7,8], color: 'rgb(255,51,51)'},
                {range: [8,9], color: 'rgb(255,25,25)'}]
            }
            }]
        Plotly.newPlot('gauge', data)
    })       
}