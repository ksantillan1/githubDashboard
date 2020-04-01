 d3.json("data/samples.json").then((importedData) => {
	

	// Pull Data from SAMPLES
    var data = importedData.samples;
	var DemoData = importedData.metadata;
	
	console.log(data)

	//Select ID from Data
	var sampleId = data.map(object => object.id)
	console.log(sampleId)
	
	//Add info to dropdonw menu
	var select = document.getElementById("selDataset"); 
	var options = sampleId; 

	for(var i = 0; i < options.length; i++) {
		var opt = options[i];

		var el = document.createElement("option");
		el.text = opt;
		el.value = opt;

		select.add(el);
	}
	
	//create charts after selectin specific ID on dropdown menu
	d3.select("#selDataset").on("change", handleSubmit);
	
	function handleSubmit(){
			//filter data
			function filteringfunction(OneSample){
					
				var dropdownMenu = d3.select("#selDataset");	   
				var selectedid = dropdownMenu.property("value");				
				
			return OneSample.id === selectedid;			
			};
		
			var SampleSelected = data.filter(filteringfunction);
			console.log(SampleSelected)
			
			function filtering(OneSample){
					
				var dropdownMenu = d3.select("#selDataset");
				var selectedid = dropdownMenu.property("value");
					
			return OneSample.id === parseFloat(selectedid);			
			};
			
			var Demographic = DemoData.filter(filtering);
			console.log(Demographic)
			
			
			//create array of objects to use for sorting
			
			var Newdata = []
			
			
			var labels = SampleSelected[0].otu_ids;
			var values = SampleSelected[0].sample_values;
			var hovers = SampleSelected[0].otu_labels;
			
			
			
			var size = labels.length
			
			
			for(i=0; i<size; i++){
			var element ={}	
			
				element.Labels =labels[i]
				element.Values = values[i]
				element.Hovers =hovers[i]
					
				Newdata.push(element);
			};
			
			//sorting filtered data and sliced it to 10
			Newdata.sort(function(a, b) {
				return parseFloat(b.Values) - parseFloat(a.Values);
			  });

			var SliceData = Newdata.slice(0,10)
						
			console.log(SliceData)
		
		document.getElementById("sample-metadata").innerHTML = ""
		
		Object.entries(Demographic[0]).forEach(([key, value]) => {
			console.log(`Key: ${key} and Value ${value}`);

			var para = document.createElement("P");                      
			var t = document.createTextNode(` ${key} :  ${value}`);      
			para.appendChild(t);                                          
			document.getElementById("sample-metadata").appendChild(para);

		});
		
		//chart
		
	
		var trace1 = {
			
			x: SliceData.map(object => object.Values).reverse(),
			y: SliceData.map(object => `OTU ${object.Labels}`).reverse(),
			text: SliceData.map(object => object.Hovers).reverse(),
			
			type: 'bar',
			orientation: 'h',
			marker: {
				color: 'rgba(55,128,191,0.6)',
				width: 1

			}
			
		};
		
		var chartData = [trace1];
		
		var layout = {
			title: "Top 10 OTUs operational taxonomic units",
			margin: { t: 30, l: 150 }	
		};
		
		Plotly.newPlot("bar", chartData,layout);


		//bubble chart
	
		var trace2= {
			x: labels,
			y: values,
			text: hovers,
			mode: 'markers',
			marker: {
				color: labels,
				size: values
			  }
			};

		var bubbledata = [trace2];

		var layout = {
			title : "OTUs",
			showlegend: false,
			height: 600,
			width: 1200
		};

		Plotly.newPlot('bubble', bubbledata, layout);
	
	
		
	return console.log(Newdata)		
		
	
	};
	
});
 







