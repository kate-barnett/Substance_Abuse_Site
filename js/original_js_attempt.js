var drawBars= function(values,target,xScale,yScale)
 
var barGraph= function(dataset)
{
    
var w = 400;
var h = 200;
var barPadding = 1;
			
			var dataset = [26,12,29,27,30,14,35,32,24,11,26,23,26,13,30,27,27,0,31,29,28,13,35,32];
            
          

			
			var svg = d3.select("body")
						.append("svg")
						.attr("width", w)
						.attr("height", h);

			svg.selectAll("rect")
			   .data(dataset)
			   .enter()
			   .append("rect")
			   .attr("x", function(d, i) {
			   		return i * (w / dataset.length);
			   })
			   .attr("y", function(d) {
			   		return h - (d * 5);
			   })
			   .attr("width", w / dataset.length - barPadding)
			   .attr("height", function(d) {
			   		return d * 5;
			   })
			   .attr("fill", function(d)
                     {
                        return "rgb(0,0, " + Math.round(d*15) + ")";
                     })

            
            svg.selectAll("text")
                .data(dataset)
                .enter()
                .append("text")
                .text(function(d)
                      {
                        return d;
                      })
                .attr("x", function(d, i)
                      { 
                         return i * (w / dataset.length );
                       })
                .attr("y", function(d)
                      {
                        return h - (d * 5);
                      })
}