var heroinComparePromise= d3.csv("../csv/HeroinCompare.csv")
var initGraph = function(heroinCompare)
{
    
    var screen = {width:800, height:400};
    
   
    var margins = {top:40,bottom:40,left:80,right:5};
    
   
    var graph = 
    {
        width:screen.width-margins.left-margins.right,
        height:screen.height-margins.top-margins.bottom,
    }
    
    
    d3.select("#graph4")
        .attr("width",screen.width)
        .attr("height",screen.height)
    
    
    var target = d3.select("#graph4")
        .append("g")
        .classed("graph",true)
        .attr("transform","translate("+margins.left+","+
             margins.top+")");
     
    var xScale = d3.scaleLinear()
        .domain([2004,2011])
        .range([0,graph.width])
 
   

                      
    var yScale = d3.scaleLinear()
        .domain([100,7000])
        .range([graph.height,0])
    
    
    drawAxis(graph,margins,xScale,yScale);
    
    drawLines(heroinCompare,target,xScale,yScale);
     
    
    drawLabels(graph,margins, target);
    
    drawPlot(heroinCompare,target,xScale,yScale)
    
    drawLegend(graph,margins)
}
var drawLines = function(heroinCompare,target,
              xScale,yScale)
{
   
    var lineGenerator1 = d3.line()
        .x(function(heroinCompare) { return xScale(heroinCompare.year);})
        .y(function(heroinCompare)   { return yScale(heroinCompare.ER_Heroin_VIsits);})
    
           
    
     d3.select("#graph4")    
    .select(".graph")
    .append("path")
        .datum(heroinCompare)
        .attr("d",lineGenerator1)
          .on("mouseenter", function(heroinCompare)
            {
                var xPos= d3.event.pageX;
                var yPos=
                d3.event.pageY;
            
        d3.select("#tooltip")
            .classed("hidden", false)
            .style("top",yPos+"px")
            .style("left",xPos+"px")
            .text(heroinCompare.ER_Heroin_VIsits)
     })  
    
         var lineGenerator2 = d3.line()
        .x(function(heroinCompare) { return xScale(heroinCompare.year);})
        .y(function(heroinCompare)   { return yScale(heroinCompare.heroin_treatment_admissions);})
    
           
    
     d3.select("#graph4")    
    .select(".graph")
    .append("path2")
        .datum(heroinCompare)
        .attr("d",lineGenerator2)
          .on("mouseenter", function(heroinCompare)
            {
                var xPos= d3.event.pageX;
                var yPos=
                d3.event.pageY;
            
        d3.select("#tooltip")
            .classed("hidden", false)
            .style("top",yPos+"px")
            .style("left",xPos+"px")
            .text(heroinCompare.heroin_treatment_admissions)
            
     })  
    
    
}
var drawPlot= function(heroinCompare,target,xScale,yScale)
{
     target.append("g")
    .selectAll("circle")
    .data(heroinCompare)
    .enter()
    .append("circle")
    .attr("cx", function(heroinCompare)
          {
            return xScale(heroinCompare.year);
    })
    .attr("cy", function (heroinCompare)
          {
            return yScale(heroinCompare.ER_Heroin_VIsits)
    })
    
    .attr("r",3)
    .on("mouseenter", function(heroinCompare)
            {
                var xPos= d3.event.pageX;
                var yPos=
                d3.event.pageY;
            
        d3.select("#tooltip")
            .classed("hidden", false)
            .style("top",yPos+"px")
            .style("left",xPos+"px")
          
            .text(heroinCompare.ER_Heroin_VIsits)
            
})

    target.append("g")
    .selectAll("circle")
    .data(heroinCompare)
    .enter()
    .append("circle")
    .attr("cx", function(heroinCompare)
          {
            return xScale(heroinCompare.year);
    })
    .attr("cy", function (heroinCompare)
          {
            return yScale(heroinCompare.heroin_treatment_admissions)
    })
    
    .attr("r",3)
    .attr("fill","palevioletred")
    .on("mouseenter", function(heroinCompare)
            {
                var xPos= d3.event.pageX;
                var yPos=
                d3.event.pageY;
            
        d3.select("#tooltip")
            .classed("hidden", false)
            .style("top",yPos+"px")
            .style("left",xPos+"px")
          
            .text(heroinCompare.heroin_treatment_admissions)
            
})

    
}
var drawAxis = function(graph,margins,xScale,yScale)
{
   var xAxis= d3.axisBottom(xScale);
   var yAxis= d3.axisLeft(yScale);
    
    var axes= d3.select("#graph4")
        .append("g")
        
    axes.append("g")
        .attr("transform", "translate("+margins.left+","+(margins.top+graph.height/1)+")") 
        
        .call(xAxis)
        
 
    axes.append("g")
        .attr("transform", "translate("+margins.left+","+(margins.top)+")") 
       .call(yAxis)

}

var drawLabels = function(graph,margins,target)
{
        var labels = d3.select("#graph4")
        .append("g")
        .classed("labels",true)
        
    labels.append("text")
        .text("Relationship Between Heroin ER Visits and Heroin Treatment Admissions in Kentucky")
        .classed("title",true)
        .attr("text-anchor","middle")
        .attr("x",margins.left+(graph.width/2.2))
        .attr("y",margins.top/2.2)
     
    labels.append("g")
        .attr("transform","translate(20,"+ 
              (margins.top+(graph.height/2))+")")
        .append("text")
        .text("# of individual")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("transform","rotate(270)")
     
    labels.append("text")
        .text("Year")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("x", margins.left+(graph.width/2))
        .attr("y", margins.top+graph.height/0.9+(margins.bottom/1.3))
        .attr("transform", "translate(,"+(margins.top+(graph.height))+")")
    
}

var drawLegend = function(graphDim,margins)
{
    var legend = d3.select("#graph4")
                    .append("g")
                    .classed("legend", true)
                    .attr("transform", "translate("+(margins.left)+","+(margins.top)+")");
    
    var categories = [
       {
           class:"ER_Heroin_VIsits",
           name:"Heroin Visits to ER"
       },
       {
           class:"heroin_treatment_admissions",
           name:"Heroin Treatment Admissions"
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
   
     var heroinCompare= values[0];
    
    initGraph(values[0]);
    
}
var failFCN= function(error)
{
    console.log("error", error);
}

heroinComparePromise.then(successFCN,failFCN)