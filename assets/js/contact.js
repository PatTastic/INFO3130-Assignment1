var Contact = {
    Load: function(){
        var init = function (selector, root) {
            var width = $(window).width(),
                height = $(window).height(),
                root;

            var tick = function () {
                link.attr("x1", function (d) {
                    return d.source.x;
                }).attr("y1", function (d) {
                    return d.source.y;
                }).attr("x2", function (d) {
                    return d.target.x;
                }).attr("y2", function (d) {
                    return d.target.y;
                });

                node.attr("cx", function (d) {
                    return d.x;
                }).attr("cy", function (d) {
                    return d.y;
                });

                labels.attr("x", function (d) {
                    return ((d.x - (this.getBBox().width / 2)) - 8);
                }).attr("y", function (d) {
                    return d.y;
                });
            }

            var force = d3.layout.force()
                .size([width, height])
                .linkDistance(30)
                .charge(-520)
                .on("tick", tick);

            var svg = d3.select(selector).append("svg")
                .attr("width", width)
                .attr("height", height);

            var link = svg.selectAll(".link"),
                node = svg.selectAll(".node"),
                labels = svg.selectAll(".labels");

            var update = function () {
                var nodes = flatten(root),
                    links = d3.layout.tree().links(nodes),
                    length = $(window).width() <= 750 ? 80 : 300;

                // Restart the force layout.
                force.nodes(nodes)
                    .links(links)
                    .linkStrength(0.5)
                    .friction(0.9)
                    .linkDistance(length)
                    .charge(-1800)
                    .gravity(0.1)
                    .theta(0.8)
                    .alpha(-0.8)
                    .start();

                // Update the links…
                link = link.data(links, function (d) {
                    return d.target.id;
                });

                // Exit any old links.
                link.exit().remove();

                // Enter any new links.
                link.enter().insert("line", ".node")
                    .attr("class", "link")
                    .attr("x1", function (d) {
                    return d.source.x;
                }).attr("y1", function (d) {
                    return d.source.y;
                }).attr("x2", function (d) {
                    return d.target.x;
                }).attr("y2", function (d) {
                    return d.target.y;
                });

                // Update the text resize
                var textSize = $(window).width() <= 750 ? 100 : 150;
                $("#holder").css("font-size", textSize.toString() + "%");

                // Update the nodes…
                node = node.data(nodes, function (d) {
                    return d.id;
                }).attr("r", function(d){
                    var size = $(window).width() <= 750 ? 20 : 10;
                    return Math.sqrt(d.size) / size || 4.5;
                }).style("fill", color).style("stroke", stroke);

                // Exit any old nodes.
                node.exit().remove();

                // Enter any new nodes.
                node.enter().append("circle")
                    .attr("class", "node")
                    .attr("cx", function (d) {
                    return d.x;
                }).attr("cy", function (d) {
                    return d.y;
                }).attr("r", function (d) {
                    var size = $(window).width() <= 750 ? 20 : 10;
                    return Math.sqrt(d.size) / size || 4.5;
                }).style("fill", color)
                  .style("stroke", stroke)
                  .style("stroke-width", 5)
                  .on("click", click)
                  .call(force.drag);

                labels = labels.data(nodes, function (d) {
                    return d.id;
                })

                // Exit any old labels.
                labels.exit().remove();

                labels.enter().append("text")
    				.attr("pointer-events", "none")
                    .attr("class", "labels")
                    .attr("x", function (d) {
                    return d.x;
                }).attr("y", function (d) {
                    return d.y;
                }).attr("dx", 9)
                    .attr("dy", ".31em")
                    .text(function (d) {
                    return d.name;
                }).style("fill-opacity", function (d) {
                    var opacity = 1;
                    if (d.name === "parentnode") {
                        opacity = 0;
                    }

                    return opacity;
                });
            }

            var color = function (d) {
            	var c = "";

                switch(d.name.toLowerCase()){
                	case "contact me": c = "7fb800"; break;
                    //case "email": c = "de5145"; break;
                    //case "github": c = "800080"; break;
                    //case "last.fm": c = "e31b23"; break;
                    //case "linkedin": c = "007bb6"; break;
                    //case "steam": c = "ffffff"; break;
                    //case "skype": c = "00aff0"; break;
                    //case "jsfiddle": c = "2795ee"; break;
                    default: c = "fecf2d"; break;
                }

                return ("#" + c);
            }
            var stroke = function(d){
            	var c = "";

                switch(d.name.toLowerCase()){
                	case "contact me": c = "fecf2d"; break;
                    default: c = "7fb800"; break;
                }

                return ("#" + c);
            }

            var click = function (d) {
                launchLink(d.name);
                if (!d3.event.defaultPrevented) {
                    update();
                }
            }

            var flatten = function (root) {
                var nodes = [],
                    i = 0;

                var recurse = function (node) {
                    if (node.children) node.children.forEach(recurse);
                    if (!node.id) node.id = ++i;
                    nodes.push(node);
                }

                recurse(root);
                return nodes;
            }

            $(window).on("resize", function(){
                var width = window.innerWidth, height = window.innerHeight;
                svg.attr('width', width).attr('height', height);
                force.size([width, height]).resume();
            });

            update();
        };

    	function launchLink(name){
        	var link = "", target = "_blank";

            switch(name.toLowerCase()){
                case "email":
                    link = "mailto:patrickwilken28@gmail.com";
                    target = "_parent";
                    break;
                case "skype":
                    link = "skype:patman2142?chat";
                    target = "_parent";
                    break;
                case "jsfiddle": link = "http://jsfiddle.net/user/PatTastic/"; break;
                case "github": link = "https://github.com/PatTastic"; break;
                case "steam": link = "https://steamcommunity.com/id/PatTastic"; break;
                case "linkedin": link = "https://www.linkedin.com/in/patwilken/"; break;
                case "last.fm": link = "http://www.last.fm/user/CrypticEcho"; break;
            }

            if(link !== "")
            	window.open(link, target);
        }

        var size = $(window).width() <= 750 ? 600000 : 900000;
        var datajson = {
            "name": "Contact Me",
            "size": size,
            "children": [{
                "name": "Email",
                "size": size
            }, {
                "name": "GitHub",
                "size": size
            }, {
                "name": "JSFiddle",
                "size": size
            }, {
                "name": "LinkedIn",
                "size": size
            }, {
                "name": "Skype",
                "size": size
            }, {
                "name": "Last.fm",
                "size": size
            }, {
                "name": "Steam",
                "size": size
            }]
        };

        init("#holder", datajson);
    }
};
