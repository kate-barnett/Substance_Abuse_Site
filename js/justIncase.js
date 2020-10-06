//More to come
/*var initGraph= function (overdoseRates)
{
    var screen= {width: 800, height: 250}
    
    var margins= {left:80, right:5, top:20, bottom: 20}
    
    var graph= 
        {
            width:screen.width-margins. left-margins.right,
            height:screen.height/1.2 - margins.top-margins.bottom
        
        }
    
    console.log(graph)
    
    d3.select("#graph1")
        .attr("width", screen.width)
        .attr("height",screen.height)
            
    
    var target = d3.select("#graph1")
                .append ("g")
                .attr("transform", "translate (" + margins.left + ", "+ margins.top +")");
    
    var xScale= d3.scaleBand()
        .domain(["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019"])
        .range([0, graph.width])
        .paddingInner(.05)
    
    var yScale= d3.scaleLinear()
        .domain([0,1500])
        .range([graph.height,0])
    
  

    drawAxis(graph,margins,xScale,yScale);
    
    var g0 = target.append("g");
    drawBars(overdoseRates,g0,graph,xScale,yScale);
      var g1 = target.append("g");
    drawBars(overdoseRates,g1,graph,xScale,yScale);
    
    drawLabels(graph,margins, target);
    //drawLegend(graph,margins);

}

var drawBars= function(overdoseRates,target,graphDim,xScale,yScale)
{
    target.selectAll("rect")
        .data(overdoseRates )
        .enter()
        .append("rect")
        .attr("x", function (year)
              {
                return xScale(year.year);
    })
        .attr("y", function (year)
              { 
        
                  return yScale (year.total_number);
    })
    
        .attr("width",xScale.bandwidth)
        .attr("height", function(year)
              { 
               return graphDim.height-yScale(year.total_number)
              })
        .attr("fill", "red") .on("mouseenter", function(overdoseRate)
            {
                var xPos= d3.event.pageX;
                var yPos=
                d3.event.pageY;
            
        d3.select("#tooltip")
            .classed("hidden", false)
            .style("top",yPos+"px")
            .style("left",xPos+"px")
            .text(overdoseRate.total_number)
})
        

}*/

var initGraph3= function (compareData)
{
   var screen = {width: 800, height: 250}
    
    var margins = {left:80, right:5, top:70, bottom: 80}
    
    
    
    var graph3 = 
        {
            width:screen.width-margins.left-margins.right,
            height:screen.height/1.2- margins.bottom
        }
    
 
    
    d3.select("#graph3")
        .attr("width", screen.width)
        .attr("height",screen.height)
            
    
    var target = d3.select("#graph3")
                .append ("g")
                .attr("transform", "translate (" + margins.left + ", "+ margins.top +")");
    
    var xScale= d3.scaleBand()
        .domain(["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018"])
        .range([0, graph3.width])
        .paddingInner(.10)
    
    var yScale= d3.scaleLinear()
        .domain([0,900])
        .range([graph3.height,0])
    
    var colorScale= d3.scaleOrdinal()
        .range(["red","pink","purple","palevioletred"]);
    
  

 drawAxis3(graph3,margins,xScale,yScale);
    
    var g0 = target.append("g");
    drawBars3(compareData,g0,graph3,xScale,yScale, colorScale);
      var g1 = target.append("g");
    drawBars3(compareData,g1,graph3,xScale,yScale, colorScale);
    
    drawLabels3(graph3,margins, target);
    
   

}

var drawBars3= function(compareData,target,graphDim,xScale,yScale, colorScale)
{
    target.selectAll("rect")
        .data(compareData)
        .enter()
        .append("rect")
        .attr("x", function (compareData)
              {
                return xScale(compareData.year);
    })
        .attr("y", function (Data)
              { 
        
                  return yScale (Data.overdose_deaths);
    })
    
        .attr("width",xScale.bandwidth)
        .attr("height", function(Data)
              { 
               return graphDim.height-yScale(Data.overdose_deaths)
    })
        .attr("fill", function(number)
              { 
        
              return colorScale(number. year);
    })
    
     
        .on("mouseenter", function(compareData)
            {
                var xPos= d3.event.pageX;
                var yPos=
                d3.event.pageY;
            
        d3.select("#tooltip")
            .classed("hidden", false)
            .style("top",yPos+"px")
            .style("left",xPos+"px")
            .text(compareData.overdose_deaths)
            
})
            
        

}