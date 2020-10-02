var ageGroupPromise= d3.csv("../csv/ageGroupData.csv")

var ageGroup2Promise= d3.csv("../csv/ageGroupData2Final.csv")

var compareDataPromise= d3.csv("../csv/compareData.csv")

var overdosePromise= d3.csv("../csv/overdoseData.csv")



var initGraph= function (overdoseRates)
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
        .attr("fill", "red")
        
            
        

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


var initGraph2 = function(ageGroup2)
{
    var screen = {width: 800, height: 250}
    
    var margins = {left:80, right:5, top:20, bottom: 20}
    
    
    
    var graph2 = 
        {
            width:screen.width-margins.left-margins.right,
            height:screen.height/1.2 - margins.bottom
        }
    
    //width:screen.width-margins. left-margins.right,
           // height:screen.height - //margins.top-margins.botto
    console.log(graph2);
    
    d3.select("#graph2")
    .attr("width",screen.width)
    .attr("height",screen.height)
    
    var g = d3.select("#graph2")
    .append("g")
    .classed("graph2", true)
    .attr("transform",
          "translate("+margins.left+","+
                        margins.top+")");
     var target = d3.select("#graph2")
                .append ("g")
                .attr("transform", "translate (" + margins.left + ", "+ margins.top +")");
    
    var xScale = d3.scaleLinear()
        .domain([0,ageGroup2.Number])
        .range([0,graph2.width])

    var highW= d3.max(ageGroup2,function(values)
                      {
                        return d3.max(values.Number);
    })
    var yScale = d3.scaleLinear()
        .domain([0,highW])
        .range([graph2.height,0])
    
    drawAxes2(graph2,margins,xScale,yScale);
    drawLines(ageGroup2,target,graph2,xScale,yScale);
    drawLabels2(graph2,margins);

}

   
var drawLines = function(ageGroup2,target,graph2,
                         xScale,yScale)
{
         
   var lineGenerator= d3.line()
        .x(function(Number, i)
           {
            return xScale(i);
            })
        .y(function(Number) 
           { 
            return yScale(Number);
           })
  
   var lines= d3.select("target")
        .select("#graph2")
        .selectAll("g")
        .data(ageGroup2)
        .enter()
        .append("g")
        .classed("line", true)
        .attr("fill", "none")
        .attr("stroke", "black")
        

    lines.append("path")
        .datum(function(age)
               {
                return age.Number;
               })
        .attr("d", lineGenerator);      

   }




var drawAxes2 = function(graph2,margins,
                         xScale,yScale)
{
   var xAxis= d3.axisBottom(xScale);
   var yAxis= d3.axisLeft(yScale);
    
    var axes= d3.select("#graph2")
        .append("g")
        
    axes.append("g")
        .attr("transform", "translate ("+margins.left+","+(margins.top+graph2.height)+")") 
        
        .call(xAxis)
 
    axes.append("g")
        .attr("transform", "translate("+margins.left+","+(margins.top)+")") 
        .call(yAxis)
}



var drawLabels2 = function(graph2,margins)
{
    var labels= d3.select("#graph2")
                    .append("g")
                    .classed("labels", true)
    
    labels.append("text")
        .text("Substance Misuse By Age Group")
        .classed("title",true)
        .attr("text-anchor","middle")
        .attr("x", margins.left+(graph2.width/2))
        .attr("y", margins.top)
              
    labels.append("text")
        .text("Age Group")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("x", margins.left+(graph2.width/2))
        .attr("y", margins.top+graph2.height+(margins.bottom/0.7))
    
    labels.append("g")
        .attr("transform", "translate(25,"+(margins.top+(graph2.height/2))+")")
        .classed("label",true)
        .append("text")
        .text("# of People Using")
        .attr("text-anchor","middle")
        .attr("transform","rotate(270)")
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
    

    
   

  
}

var failFCN= function(error)
{
    console.log("error", error);
}

var promises= [ageGroupPromise, ageGroup2Promise, compareDataPromise, overdosePromise];

Promise.all(promises)
.then(successFCN,failFCN)

 
