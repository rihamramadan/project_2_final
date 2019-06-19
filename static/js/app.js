const scatter = ("#scatter");

var defaultURL = "/api/graph_analysis";

d3.json(defaultURL).then(function(data) {
  var data = [data];
  
  var layout = {
      margin: { t: 30, b: 100 }, 
      title: 'Price versus Rating',
      font:{
      family: 'Raleway, sans-serif'
    },
    showlegend: false,
    xaxis: {
      title: 'Neighborhood',
      
    },
    yaxis: {
      title: 'Price',
      range: [50,500]
    },
    bargap :0.15 
  };

  Plotly.plot("scatter", data, layout);
});

scatter.innerHTML = layout;

  

