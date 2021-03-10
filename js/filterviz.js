//import {get_data} from './get_data.js'
var steamtree = [];

var width = 1280,
    height = 720,
    root;


//Fetch user games for viz 
var fetchusergames = "http://3.129.66.238:8000/games/76561197963264495?limit=300";


async function fetchGames() {
    const response = await fetch(fetchusergames);
    const g = await response.json();
    return g;
}

fetchGames().then(post => {
    devL = post.developers;
    tagL = post.tags;
    vis = resetVis = post.games;
    create_filter_options();

    steamtree.push({ "name": "Steamuser", "children": post.games });
    steamtree = JSON.stringify(Object.assign({}, steamtree));
    steamtree = JSON.parse(steamtree);

    root = steamtree[0];
    update();
});

//Force for nodes 
var force = d3.layout.force()
    .linkDistance(50)
    .charge(-60)
    .gravity(.05)
    .size([width, height])
    .on("tick", tick);

//Appending the svg to the #viz-div 
var svg = d3.select("#viz").append("svg")
    .attr("width", width)
    .attr("height", height);

var link = svg.selectAll(".link"),
    node = svg.selectAll(".node");

//Updates the current nodes 
function update() {

    var nodes = flatten(root),
        links = d3.layout.tree().links(nodes);

    // Restart the force layout.
    force
        .nodes(nodes)
        .links(links)
        .start();

    // Update links.
    link = link.data(links, function(d) { return d.target.id; });

    link.exit().remove();

    link.enter().insert("line", ".node")
        .attr("class", "link");

    // Update nodes.
    node = node.data(nodes, function(d) { return d.id; });

    node.exit().remove();

    node.enter().append("g")
        .attr("class", function(d) {
            //User get the class user
            if (d.name == "Steamuser") {
                return "user"
            } //Categories get the class category 
            else if (d.name == "Strategy & Simulation Games" || d.name == "Shooter Games" || d.name == "RPG Games" || d.name == "Puzzle & Arcade Games") {
                return "category"
            } else { return "node" }
        })
        .style("fill", color)
        .style("stroke", '#fff')
        .style("stroke-width", "1,5px")
        .call(force.drag);

    //Append circle to games
    d3.selectAll('.node').append("circle")
        .attr("r", function(d) { return Math.sqrt(d.size) / 10 || 7; })
        .style("stroke", '#fff')
        .style("stroke-width", "1,5px")
        .on("click", gameclick);

    //Append rect to user
    d3.selectAll('.user').append("rect")
        .attr('width', 50)
        .attr('height', 50)
        .style("fill", "rgb(78, 121, 167)")
        .style("stroke", '#fff')
        .style("stroke-width", "1,5px")
        .on("click", click);

    //Append circle to category
    d3.selectAll('.category').append("circle")
        .attr("r", function(d) { return Math.sqrt(d.size) / 10 || 7; })
        .style("stroke", '#fff')
        .style("stroke-width", "1,5px")
        .style("fill", "black") //example 
        .on("click", click);

    //If we want text, looks horrible 
    //nodeEnter.append("text")
    //  .attr("dy", ".35em")
    //  .text(function(d) { return d.name; });
}

//Tooltip 
var tooltip = d3.select('#viz').append('div')
    .attr('id', 'tooltip')
    .attr('all', 'unset')
    .attr('style', 'position: absolute; opacity: 0;');

d3.select('body').on('click', function(e) {
    d3.select('#tooltip').style('opacity', 0).style('display', 'none')
});


function tick() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
    svg.selectAll("g").attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
}

function color(d) {
    return d._children ? "#3182bd" // collapsed package
        :
        d.children ? "#c6dbef" // expanded package
        :
        "#fd8d3c"; // leaf node
}


//When user clicks on a game 
function gameclick(d) {

    svg.selectAll('.node')
        .style("stroke", "#fff")
        .style("stroke-width", "1.5px");

    d3.select(this)
        .style('stroke', 'black');

    if (d.header_img) {
        d3.select('#tooltip')
            .html("<img width=100% height=45% src=" + d.header_img + '>' +
                "<p><b>" + d.name + "</b><br>" + "Genres: " + d.genres + "<br>" +
                "Reviewscore: " + ((d.total_positive / (d.total_negative + d.total_positive)).toFixed(2) * 100) + "% Positive" + "<br>" + "</p>")
            .transition().duration(300)
            .style('opacity', 1)
            .style('display', 'block')
            .style('left', this.getBoundingClientRect().x - 300 + 'px')
            .style('top', this.getBoundingClientRect().y - 60 + 'px');
    } else {
        d3.select('#tooltip')
            .html("No info")
            .transition().duration(300)
            .style('opacity', 1)
            .style('display', 'block')
            .style('left', this.getBoundingClientRect().x - 300 + 'px')
            .style('top', this.getBoundingClientRect().y - 60 + 'px');
        console.log(d);
    }
}

// Toggle children on click. For parent nodes 
function click(d) {
    if (d3.event.defaultPrevented) return; // ignore drag
    if (d.children) {
        d._children = d.children;
        d.children = null;
    } else {
        d.children = d._children;
        d._children = null;
    }
    update();
}

// Returns a list of all nodes under the root.
function flatten(root) {
    var nodes = [],
        i = 0;

    function recurse(node) {
        if (node.children) node.children.forEach(recurse);
        if (!node.id) node.id = ++i;
        nodes.push(node);
    }

    recurse(root);
    return nodes;
}

/*** VARIABLES ***/
var price = 100;
var price_filter = d3.select('#price_filter');

var pop = 1;
var pop_filter = d3.select('#pop_filter');

// Keeps track of current filters
var selection_div = d3.select("#selection");
var selection = {
    'tags': [],
    'categories': [],
    'developers': [], // don't seem to have a default
    'price': price,
    'popularity': pop
};

/*** SLIDER FILTERS ***/
// price filter
price_filter.append('span')
    .attr('id', 'price_val')
    .text(price); // default value

price_filter.append('input')
    .attr('type', 'range')
    .attr('min', 1)
    .attr('max', 100)
    .attr('value', price)
    .attr('step', 1)
    .attr('id', 'price_slider')
    .on('input', function() {
        price = +this.value;
        d3.select('#price_val').text(price);
    })
    .on('change', function() { updateFilterSlider('price', this.value) });

// popularity filter
pop_filter.append('span')
    .attr('id', 'pop_val')
    .text(pop); // default value

pop_filter.append('input')
    .attr('type', 'range')
    .attr('min', 0)
    .attr('max', 1)
    .attr('value', pop)
    .attr('step', 0.1)
    .attr('id', 'pop_slider')
    .on('input', function() {
        pop = +this.value;
        d3.select('#pop_val').text(pop);
    })
    .on('change', function() { updateFilterSlider('popularity', this.value) });

/*** DROP-DOWN FILTERS ***/
/* Filter options */
var vis, resetVis;
var tagL, devL;

//This has been replaced with real data in the first fetch, see line 20-23. 
/*d3.json('backend/steam_scrapy/mock_data.json') // replace this with actual fetched data
    .then(function(data) {
        devL = data.developers;
        tagL = data.tags;
        vis = resetVis = data.games;
        create_filter_options();
});*/

function create_filter_options() {
    /* Adding values for each filter drop down */
    var tag_dropdown = d3.select('#tags');
    tagL.forEach(tag => {
        tag_dropdown.append('option')
            .attr('value', () => { return tag })
            .text(tag)
    });

    var dev_dropdown = d3.select('#developers');
    devL.forEach(developer => {
        dev_dropdown.append('option')
            .attr('value', () => { return developer })
            .text(developer)
    });

    $('.filter').on('change', function() { addSelection(this.id, this.value) });
};

/*** FUNCTIONS ***/
/* Add attribute to selection list and as a list item on the page */
function addSelection(type, value) {
    if (value != -1) {
        if (!selection[type].includes(value)) { // check if item already in filter
            selection[type].push(value);
            selection_div.append('li')
                .attr('id', function() {
                    return value.toLowerCase().replace(/[^a-zA-Z+]+/gi, "");
                })
                .text('✕ ' + value)
                .on('click', function() { removeSelection(type, value) })
        }
        //console.log('updated selection: ', selection);
        updateVis();
    }
};

/* Remove attribute from selection list and its html element */
function removeSelection(type, value) {
    var index = (selection[type]).indexOf(value);
    if (index != -1) {
        (selection[type]).splice(index, 1);
    }
    var tmp = '#' + value.toLowerCase().replace(/[^a-zA-Z+]+/gi, "");
    // regex from stack overflow /^[^a-z]+|[^\w:.-]+/gi
    d3.select(tmp).remove();

    //console.log('updated selection: ', selection);
    updateVis();
};

/* Update attribute in selection */
function updateFilterSlider(type, value) {
    selection[type] = parseInt(value);
    updateVis();
};

$.ajaxSetup({
    contentType: "application/json; charset=utf-8"
});

function updateVis() {
    if ((selection.categories).length != 0) {
        sendRequestCat();
    } else {
        sendRequestNoCat();
    }
};

/* Send request with categories */
function sendRequestCat() {
    $.post("http://3.129.66.238:8000/filter_games/76561197963264495?limit=300",
        JSON.stringify({
            "categories": selection.categories, // optional
            "max_price": selection.price, // optional, in dollars
            "tags": selection.tags, // optional, array of tags
            "max_positive_review_ratio": selection.popularity, // optional, maximum of ratio of positive review
            "developers": selection.developers, // optional
        }),
        //update steamtree
        function(data, status) {
            console.log('ok', data.games);
            steamtree = [];
            steamtree.push({ "name": "Steamuser", "children": data.games });
            steamtree = JSON.stringify(Object.assign({}, steamtree));
            steamtree = JSON.parse(steamtree);

            root = steamtree[0];
            update();
        });
};

function sendRequestNoCat() {
    $.post("http://3.129.66.238:8000/filter_games/76561197963264495?limit=300",
        JSON.stringify({
            "max_price": selection.price, // optional, in dollars
            "tags": selection.tags, // optional, array of tags
            "max_positive_review_ratio": selection.popularity, // optional, maximum of ratio of positive review
            "developers": selection.developers, // optional
        }),
        //update steamtree
        function(data, status) {
            console.log('ok', data.games);
            steamtree = [];
            steamtree.push({ "name": "Steamuser", "children": data.games });
            steamtree = JSON.stringify(Object.assign({}, steamtree));
            steamtree = JSON.parse(steamtree);

            root = steamtree[0];
            update();
        });
}

$("#send_request").click(function() {
    if ((selection.categories).length != 0) {
        sendRequestCat();
    } else {
        sendRequestNoCat();
    }
});

/*
$("#send_request2").click(function(){
    $.post("http://3.129.66.238:8000/filter_games", 
    JSON.stringify({
        "category": "Shooter Games", // optional
        "max_price": 100, // optional, in dollars
        "tags": ["Shooter"], // optional, array of tags
        "max_positive_review_ratio": 1, // optional, maximum of ratio of positive review
        "developer": "Valve", // optional
    }),
    function(data, status){
      console.log('ok', data)
    });
});
*/
/*
function addToFilter(type, value) {
console.log('hej');

if(selection.includes( $(this).val() )) {   // check if item already in filter
    // do nothing
}else {
    console.log
    //selection.tags.push( $(this).val() );
    selection_div.append('li')              // add to list of filtered items
    .attr('id', () => {
        var val = $(this).val();
        val.toLowerCase().replace(/^[^a-z]+|[^\w:.-]+/gi, "");
    })
    .attr('class', 'a')
    .text( '✕ '+$(this).val() )
    //.on('click', () => { removeFromFilter($(this)) });
}
$('.a').click(removeFromFilter);

}

function removeFromFilter() {
    var index = selection.tags.indexOf( $(this).text() );
    if(index != -1) {
        selection.tags.splice(index, 1);
    }
    $(this).remove();
}
*/