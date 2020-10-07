
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
        .attr("stroke","black")
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
    
    d3.select("#graph1")    
    .select(".graph")
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
    
    labels.append("text")
        .text("Year")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("x", margins.left+(graph.width/2))
        .attr("y", margins.top+graph.height/0.9+(margins.bottom))
        .attr("transform", "translate(,"+(margins.top+(graph.height))+")")
}
var initGraph = function(overdoseData)
{
    
    var screen = {width:800, height:400};
    
   
    var margins = {top:20,bottom:30,left:80,right:5};
    
   
    var graph = 
    {
        width:screen.width/1.5-margins.left-margins.right,
        height:screen.height/1.5-margins.top-margins.bottom,
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
   var screen = {width: 800, height: 400}
    
    var margins = {left:80, right:5, top:40, bottom: 70}
    
    
    
    var graph2 = 
        {
            width:screen.width/2.5-margins.left-margins.right,
            height:screen.height/1.5 - margins.bottom
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
        .range(["maroon","pink"]);
    
  

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
        .text("% of those using")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("transform","rotate(270)")
     
    labels.append("text")
        .text("Age Group")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("x", margins.left+(graph.width/2))
        .attr("y", margins.top+graph.height/1.1+(margins.bottom))
        .attr("transform", "translate(,"+(margins.top+(graph.height))+")")
    
}

var initGraph3 = function(compareData)
{
    
    var screen = {width:800, height:400};
    
   
    var margins = {top:30,bottom:40,left:80,right:5};
    
   
    var graph = 
    {
        width:screen.width/1.5-margins.left-margins.right,
        height:screen.height/1.5-margins.top-margins.bottom,
    }
    
    
    d3.select("#graph3")
        .attr("width",screen.width)
        .attr("height",screen.height)
    
    
    var target = d3.select("#graph3")
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
    
    
    drawAxis3(graph,margins,xScale,yScale);
    
    drawLines2(compareData,target,xScale,yScale);
     
    
    drawLabels3(graph,margins, target);
    
    drawPlot2(compareData,target,xScale,yScale)
    
    drawLegend(graph,margins)
}
var drawLines2 = function(compareData,target,
              xScale,yScale)
{
    
    var lineGenerator1 = d3.line()
        .x(function(compareData) { return xScale(compareData.year);})
        .y(function(compareData)   { return yScale(compareData.overdose_deaths);})
    
           
    
     d3.select("#graph3")    
    .select(".graph")
    .append("path")
        .datum(compareData)
        .attr("d",lineGenerator1)
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
    
         var lineGenerator2 = d3.line()
        .x(function(compareData) { return xScale(compareData.year);})
        .y(function(compareData)   { return yScale(compareData.suicide_deaths);})
    
           
    
     d3.select("#graph3")    
    .select(".graph")
    .append("path")
        .datum(compareData)
        .attr("d",lineGenerator2)
          .on("mouseenter", function(compareData)
            {
                var xPos= d3.event.pageX;
                var yPos=
                d3.event.pageY;
            
        d3.select("#tooltip")
            .classed("hidden", false)
            .style("top",yPos+"px")
            .style("left",xPos+"px")
            .text(compareData.suicide_deaths)
     })  
    
    
}
var drawPlot2= function(compareData,target,xScale,yScale)
{
     target.append("g")
    .selectAll("circle")
    .data(compareData)
    .enter()
    .append("circle")
    .attr("cx", function(compareData)
          {
            return xScale(compareData.year);
    })
    .attr("cy", function (compareData)
          {
            return yScale(compareData.overdose_deaths)
    })
    
    .attr("r",3)
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

    target.append("g")
    .selectAll("circle")
    .data(compareData)
    .enter()
    .append("circle")
    .attr("cx", function(compareData)
          {
            return xScale(compareData.year);
    })
    .attr("cy", function (compareData)
          {
            return yScale(compareData.suicide_deaths)
    })
    
    .attr("r",3)
    .attr("fill","palevioletred")
    .on("mouseenter", function(compareData)
            {
                var xPos= d3.event.pageX;
                var yPos=
                d3.event.pageY;
            
        d3.select("#tooltip")
            .classed("hidden", false)
            .style("top",yPos+"px")
            .style("left",xPos+"px")
          
            .text(compareData.suicide_deaths)
            
})

    
}


          
    

var drawAxis3 = function(graph3,margins,xScale,yScale)
{
   var xAxis= d3.axisBottom(xScale);
   var yAxis= d3.axisLeft(yScale);
    
    var axes= d3.select("#graph3")
        .append("g")
        
    axes.append("g")
        .attr("transform", "translate("+margins.left+","+(margins.top+graph3.height)+")") 
        
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
        .text("Comparison of Suicide Mortality and Overdose Mortality in Kentucky")
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
        .attr("y", margins.top+graph.height/0.9+(margins.bottom/1.3))
        .attr("transform", "translate(,"+(margins.top+(graph.height))+")")
    
}

var drawLegend = function(graphDim,margins)
{
    var legend = d3.select("#graph3")
                    .append("g")
                    .classed("legend", true)
                    .attr("transform", "translate("+(margins.left)+","+(margins.top)+")");
    
    var categories = [
       {
           class:"suicide_deaths",
           name:"suicide deaths"
       },
       {
           class:"overdose_deaths",
           name:"overdose deaths"
       }
    ]
    
    var entries = legend.selectAll("g")
        .data(categories)
        .enter()
        .append("g")
        .classed("legendEntry",true)
        .attr("class", function(category)
        {
            return category.class
        })
        .attr("transform", function(category,index)
        {
           return "translate(0,"+(index*20)+")";
        })
    
    
        
    entries.append("circle")
            .attr("cx",8)
            .attr("cy",5)
            .attr("r", 5)
            .attr("class", function(stat)
            {
                return stat.class
            })
    
    entries.append("text")
            .text(function(category)
            {
                return category.name
            })
            .attr("x",15)
            .attr("y",10)  
    
}


var successFCN= function(values)
{
   
    console.log("values", values);
   
  
  var ageGroup2= values[0];
  var compareData= values [1];
  var overdoseData= values [2];

initGraph(values[2]);
initGraph2(values[0]);
initGraph3(values[1]);

    
   

  
}

var failFCN= function(error)
{
    console.log("error", error);
}

var promises= [ageGroup2Promise, compareDataPromise, overdosePromise];

Promise.all(promises)
.then(successFCN,failFCN)

 
