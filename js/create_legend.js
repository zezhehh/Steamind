export function create_legend() {
        var svgParent = d3.select("#legend");

        var width = document.getElementById("legend").getBoundingClientRect().width;
        var height = document.getElementById("legend").getBoundingClientRect().height;

        var svg = svgParent.append("svg")
        .attr("id", "svgLegend")
        .attr("width", width)
        .attr("height", height);

        //manually create legend
        svg.append("text")
            .attr("x",width-300)
            .attr("y",70)
            .text("Legend")
            .style("font-size","17px")
            .style("fill","white")
            .attr("alignment-baseline","middle");

        svg.append("rect")
            .attr("x",width-300)
            .attr("y",100)
            .attr("width",20)
            .attr("height",20)
            .style('stroke', '#fff')
            .style('stroke-width', '1.5px')
            .style("fill","rgb(78, 121, 167)");

        svg.append("text")
            .attr("x",width-270)
            .attr("y",110)
            .text("User")
            .style("font-size","15px")
            .style("fill","white")
            .attr("alignment-baseline","middle");

        svg.append("circle")
            .attr("cx",width-290)
            .attr("cy",140)
            .attr("r", 10)
            .style('stroke', '#fff')
            .style('stroke-width', '1.5px')
            .style("fill",'rgb(78, 121, 167)');

        svg.append("text")
            .attr("x",width-270)
            .attr("y",140)
            .text("Owned Games")
            .style("font-size","15px")
            .style("fill","white")
            .attr("alignment-baseline","middle");

        svg.append('polygon')
            .attr('points', `${width - 290},160 ${width - 280},180 ${width - 300},180`)
            .style('stroke', '#fff')
            .style('stroke-width', '1.5px')
            .style('fill', 'black');

        svg.append("text")
            .attr("x",width-270)
            .attr("y",170)
            .text("Category")
            .style("font-size","15px")
            .style("fill","white")
            .attr("alignment-baseline","middle");

        svg.append("circle")
            .attr("cx",width-290)
            .attr("cy",200)
            .attr("r", 10)
            .style('stroke', '#fff')
            .style('stroke-width', '1.5px')
            .style("fill",'#ff0000');

        svg.append("text")
            .attr("x",width-270)
            .attr("y",200)
            .text("Strategy & Simulation Games")
            .style("font-size","15px")
            .style("fill","white")
            .attr("alignment-baseline","middle");

        svg.append("circle")
            .attr("cx",width-290)
            .attr("cy",230)
            .attr("r", 10)
            .style('stroke', '#fff')
            .style('stroke-width', '1.5px')
            .style("fill",'#80ff00');

        svg.append("text")
            .attr("x",width-270)
            .attr("y",230)
            .text("Shooter Games")
            .style("font-size","15px")
            .style("fill","white")
            .attr("alignment-baseline","middle");
        
        svg.append("circle")
            .attr("cx",width-290)
            .attr("cy",260)
            .attr("r", 10)
            .style('stroke', '#fff')
            .style('stroke-width', '1.5px')
            .style("fill",'#ff9500');

        svg.append("text")
            .attr("x",width-270)
            .attr("y",260)
            .text("RPG Games")
            .style("font-size","15px")
            .style("fill","white")
            .attr("alignment-baseline","middle");

        svg.append("circle")
            .attr("cx",width-290)
            .attr("cy",290)
            .attr("r", 10)
            .style('stroke', '#fff')
            .style('stroke-width', '1.5px')
            .style("fill",'#ff00ff');

        svg.append("text")
            .attr("x",width-270)
            .attr("y",290)
            .text("Puzzle & Arcade Games")
            .style("font-size","15px")
            .style("fill","white")
            .attr("alignment-baseline","middle");

        //saturation
        svg.append("circle")
            .attr("cx",width-290)
            .attr("cy",320)
            .attr("r", 10)
            .style('stroke', '#fff')
            .style('stroke-width', '1.5px')
            .style("fill",'#ff0000');

        svg.append("circle")
            .attr("cx",width-260)
            .attr("cy",320)
            .attr("r", 10)
            .style('stroke', '#fff')
            .style('stroke-width', '1.5px')
            .style("fill",'#c51f16');

        svg.append("circle")
            .attr("cx",width-230)
            .attr("cy",320)
            .attr("r", 10)
            .style('stroke', '#fff')
            .style('stroke-width', '1.5px')
            .style("fill",'#932a25');

        svg.append("circle")
            .attr("cx",width-200)
            .attr("cy",320)
            .attr("r", 10)
            .style('stroke', '#fff')
            .style('stroke-width', '1.5px')
            .style("fill",'#682f2c');
        
        svg.append("circle")
            .attr("cx",width-170)
            .attr("cy",320)
            .attr("r", 10)
            .style('stroke', '#fff')
            .style('stroke-width', '1.5px')
            .style("fill",'#492927');

        svg.append("text")
            .attr("x",width-300)
            .attr("y",350)
            .text("Review ratio (darker = less popular)")
            .style("font-size","15px")
            .style("fill","white")
            .attr("alignment-baseline","middle");

        // size
        svg.append("circle")
            .attr("cx",width-220)
            .attr("cy",380)
            .attr("r", 5)
            .style('stroke', '#fff')
            .style('stroke-width', '1.5px')
            .style("fill",'rgb(78, 121, 167)');
        
        svg.append("circle")
            .attr("cx",width-250)
            .attr("cy",380)
            .attr("r", 10)
            .style('stroke', '#fff')
            .style('stroke-width', '1.5px')
            .style("fill",'rgb(78, 121, 167)');

        svg.append("circle")
            .attr("cx",width-290)
            .attr("cy",380)
            .attr("r", 15)
            .style('stroke', '#fff')
            .style('stroke-width', '1.5px')
            .style("fill",'rgb(78, 121, 167)');

        svg.append("text")
            .attr("x",width-300)
            .attr("y",420)
            .text("Playtime")
            .style("font-size","15px")
            .style("fill","white")
            .attr("alignment-baseline","middle");
    }