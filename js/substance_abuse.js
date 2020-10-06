var ageGroupPromise= d3.csv("../csv/ageGroupData.csv")

var ageGroup2Promise= d3.csv("../csv/ageGroupData2Final.csv")

var compareDataPromise= d3.csv("../csv/compareData.csv")

var overdosePromise= d3.csv("../csv/overdoseData.csv")

var drawLines = function(overdoseData,target,
              xScale,yScale)
{
    
    var lineGenerator = d3.line()
        .x(function(overdoseData)  { return xScale(overdoseData.year)
        })
        .y(function(overdoseData)   { return yScale(overdoseData.total_number)})
    
    
    var lines = d3.select("#graph1")
        .selectAll("g")
        .data(overdoseData)
        .enter()
        .append("g")
        .classed("line",true)
        .attr("fill","none")
        .attr("stroke","red")
    
    d3.select("#graph1")    
    .select("#graph")
    .append("path")
        .datum(overdoseData)
        .attr("d",lineGenerator);
}
var drawPlot1= function(overdoseData,target,xScale,yScale)
{
    target
    .selectAll("circle")
    .data(overdoseData)
    .enter()
    .append("circle")
    .attr("cx", function(overdoseData)
          {
            return xScale(overdoseData.year);
    })
    .attr("cy", function (overdoseData)
          {
            return yScale(overdoseData.total_number)
    })
    .attr("r",3)
    .on("mouseenter", function(overdoseData)
            {
                var xPos= d3.event.pageX;
                var yPos=
                d3.event.pageY;
            
        d3.select("#tooltip")
            .classed("hidden", false)
            .style("top",yPos+"px")
            .style("left",xPos+"px")
            .text(overdoseData.total_number)
            
})
}
    
var drawAxis = function(graph,margins,xScale,yScale)
{
   var xAxis= d3.axisBottom(xScale);
   var yAxis= d3.axisLeft(yScale);
    
    var axes= d3.select("#graph1")
        .append("g")
        
    axes.append("g")
        .attr("transform", "translate("+margins.left+","+(margins.top+graph.height)+")") 
        
        .call(xAxis)
        
 
    axes.append("g")
        .attr("transform", "translate("+margins.left+","+(margins.top)+")") 
       .call(yAxis)

}
var drawLabels = function(graph,margins)
{
        var labels = d3.select("#graph1")
        .append("g")
        .classed("labels",true)
        
    labels.append("text")
        .text("Overdose Deaths in Kentucky")
        .classed("title",true)
        .attr("text-anchor","middle")
        .attr("x",margins.left+(graph.width/2))
        .attr("y",margins.top)
     
    labels.append("g")
        .attr("transform","translate(20,"+ 
              (margins.top+(graph.height/2))+")")
        .append("text")
        .text("# of Overdose Deaths")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("transform","rotate(270)")
}
var initGraph = function(overdoseData)
{
    
    var screen = {width:800, height:250};
    
   
    var margins = {top:20,bottom:20,left:80,right:5};
    
   
    var graph = 
    {
        width:screen.width-margins.left-margins.right,
        height:screen.height/1.2-margins.top-margins.bottom,
    }
    
    
    d3.select("#graph1")
        .attr("width",screen.width)
        .attr("height",screen.height)
    
    
    var target = d3.select("#graph1")
        .append("g")
        .classed("graph",true)
        .attr("transform","translate("+margins.left+","+
             margins.top+")");
     
    var xScale = d3.scaleLinear()
        .domain([2000,2019])
        .range([0,graph.width])
 
   

                      
    var yScale = d3.scaleLinear()
        .domain([0,1500])
        .range([graph.height,0])
    
    
    drawAxis(graph,margins,xScale,yScale);
    
    drawLines(overdoseData,target,xScale,yScale);
     
    
    drawLabels(graph,margins, target);
    
    drawPlot1(overdoseData,target,xScale,yScale)
}

var initGraph2= function (ageGroup2)
{
   var screen = {width: 800, height: 250}
    
    var margins = {left:80, right:5, top:40, bottom: 60}
    
    
    
    var graph2 = 
        {
            width:screen.width/2-margins.left-margins.right,
            height:screen.height/1.2 - margins.bottom
        }
    
 
    
    d3.select("#graph2")
        .attr("width", screen.width)
        .attr("height",screen.height)
            
    
    var target = d3.select("#graph2")
                .append ("g")
                .attr("transform", "translate (" + margins.left + ", "+ margins.top +")");
    
    var xScale= d3.scaleBand()
        .domain(["12-17_Estimate","18-25_Estimate"])
        .range([0, graph2.width])
        .paddingInner(.10)
    
    var yScale= d3.scaleLinear()
        .domain([0,20])
        .range([graph2.height,0])
    
    var colorScale= d3.scaleOrdinal()
        .range(["red","pink"]);
    
  

 drawAxis2(graph2,margins,xScale,yScale);
    
    var g0 = target.append("g");
    drawBars2(ageGroup2,g0,graph2,xScale,yScale, colorScale);
      var g1 = target.append("g");
    drawBars2(ageGroup2,g1,graph2,xScale,yScale, colorScale);
    
    drawLabels2(graph2,margins, target);
    //drawLegend(graph,margins);

}

var drawBars2= function(ageGroup2,target,graphDim,xScale,yScale, colorScale)
{
    target.selectAll("rect")
        .data(ageGroup2 )
        .enter()
        .append("rect")
        .attr("x", function (ageGroup)
              {
                return xScale(ageGroup.Age_Group);
    })
        .attr("y", function (Data)
              { 
        
                  return yScale (Data.Number);
    })
    
        .attr("width",xScale.bandwidth)
        .attr("height", function(data)
              { 
               return graphDim.height/1-yScale(data.Number)
    })
        .attr("fill", function(number)
              { 
        
              return colorScale(number. Age_Group);
    })
        .on("mouseenter", function(ageGroup2)
            {
                var xPos= d3.event.pageX;
                var yPos=
                d3.event.pageY;
            
        d3.select("#tooltip")
            .classed("hidden", false)
            .style("top",yPos+"px")
            .style("left",xPos+"px")
            .text(ageGroup2.Number)
})
            
        

}

var drawAxis2 = function(graph2,margins,xScale,yScale)
{
   var xAxis= d3.axisBottom(xScale);
   var yAxis= d3.axisLeft(yScale);
    
    var axes= d3.select("#graph2")
        .append("g")
        
    axes.append("g")
        .attr("transform", "translate("+margins.left+","+(margins.top+graph2.height/1)+")") 
        
        .call(xAxis)
        
 
    axes.append("g")
        .attr("transform", "translate("+margins.left+","+(margins.top)+")") 
       .call(yAxis)

}
var drawLabels2 = function(graph,margins)
{
        var labels = d3.select("#graph2")
        .append("g")
        .classed("labels",true)
        
    labels.append("text")
        .text("Kentucky Substance Misuse by Age Group")
        .classed("title",true)
        .attr("text-anchor","middle")
        .attr("x",margins.left+(graph.width/2))
        .attr("y",margins.top/2)
     
    labels.append("g")
        .attr("transform","translate(20,"+ 
              (margins.top+(graph.height/2))+")")
        .append("text")
        .text("# of those using")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("transform","rotate(270)")
     
    labels.append("text")
        .text("Age Group")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("x", margins.left+(graph.width/2))
        .attr("y", margins.top+graph.height/1.2+(margins.bottom))
        .attr("transform", "translate(,"+(margins.top+(graph.height))+")")
    
}
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

var drawAxis3 = function(graph3,margins,xScale,yScale)
{
   var xAxis= d3.axisBottom(xScale);
   var yAxis= d3.axisLeft(yScale);
    
    var axes= d3.select("#graph3")
        .append("g")
        
    axes.append("g")
        .attr("transform", "translate("+margins.left+","+(margins.top+graph3.height/1)+")") 
        
        .call(xAxis)
        
 
    axes.append("g")
        .attr("transform", "translate("+margins.left+","+(margins.top)+")") 
       .call(yAxis)

}

var drawLabels3 = function(graph,margins)
{
        var labels = d3.select("#graph3")
        .append("g")
        .classed("labels",true)
        
    labels.append("text")
        .text("Comparison of Suicide Mortality and Overdose Mortality")
        .classed("title",true)
        .attr("text-anchor","middle")
        .attr("x",margins.left+(graph.width/2.2))
        .attr("y",margins.top/2.2)
     
    labels.append("g")
        .attr("transform","translate(20,"+ 
              (margins.top+(graph.height/2))+")")
        .append("text")
        .text("# of those using")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("transform","rotate(270)")
     
    labels.append("text")
        .text("Age Group")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("x", margins.left+(graph.width/2))
        .attr("y", margins.top+graph.height/1.2+(margins.bottom/1.3))
        .attr("transform", "translate(,"+(margins.top+(graph.height))+")")
    
}
var successFCN= function(values)
{
   
    console.log("values", values);
   
  var ageGroup= values[0];
  var ageGroup2= values[1];
  var compareData= values [2];
  var overdoseData= values [3];

initGraph(values[3]);
initGraph2(values[1]);
initGraph3(values[2]);

    
   

  
}

var failFCN= function(error)
{
    console.log("error", error);
}

var promises= [ageGroupPromise, ageGroup2Promise, compareDataPromise, overdosePromise];

Promise.all(promises)
.then(successFCN,failFCN)

 
