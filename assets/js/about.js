var About = {
    intervals: {},
    Load: function(){
        $(window).resize(About.Resize);

        WebFont.load({
          google: {
            families: ['Open Sans:400,600,700,800']
          },
          active: function() {}
        });

        $("#music-modal").on("shown.bs.modal", function(){
            About.LastFM.WordCloud();
            About.LastFM.CurrentlyPlaying();

            if(typeof About.intervals.song == "undefined")
                About.intervals.song = setInterval(About.LastFM.CurrentlyPlaying, 60000);
        });
        $("#music-modal").on("hidden.bs.modal", function(){
            if(typeof About.intervals.song != "undefined")
                clearInterval(About.intervals.song);
        });

        $(".toggleKitty").on("click", function(){
            $("#kitty").toggleClass("open");
        });

        $("#me").on("click", function(){
            var eyeContainer = $("#eye-container");
            if(eyeContainer.is(":visible")){
                eyeContainer.hide();
            }
            else if($("#me").width() == 480){
                eyeContainer.show();
            }
        });

        $(".page-about").mousemove(function(e) {
            var eye = $(".eye");
            if(typeof eye.offset() !== "undefined"){
                var x = (eye.offset().left) + (eye.width() / 2);
                var y = (eye.offset().top) + (eye.height() / 2);
                var rad = Math.atan2(e.pageX - x, e.pageY - y);
                var rot = (rad * (180 / Math.PI) * -1) + 180;
                eye.css({
                    '-webkit-transform': 'rotate(' + rot + 'deg)',
                    '-moz-transform': 'rotate(' + rot + 'deg)',
                    '-ms-transform': 'rotate(' + rot + 'deg)',
                    'transform': 'rotate(' + rot + 'deg)'
                });
            }
        });

        About.words = [
            "JavaScript",
            "jQuery",
            "AngularJS",
            "Angular",
            "jQuery Mobile",
            "LeafletJS",
            "REST API",
            "ASP .NET",
            ".NET Core",
            "C++",
            "C#",
            "Java",
            "Java Servlets",
            "JSP",
            "Visual Basic",
            "MySQL",
            "MariaDB",
            "CSS3",
            "HTML5",
            "AODA Standards",
            "GIT",
            "Socket.IO",
            "Bootstrap",
            "WordPress",
            "GIS",
            "NodeJS",
            "ExpressJS",
            "npm",
            "PhoneGap",
            "Cordova"
        ];

        About.TC.init({
            words: About.words.slice(),
            interval: 1000,
            classPrefix: "tc",
            addTo: "#carousel"
        });

        $("[data-toggle='tooltip']").tooltip()

        About.Resize();
        if(isMobile.any)
            setTimeout(resizeImage, 1000);
    },
    Resize: function(){
        $("#tag-cloud, #tag-cloud *").unbind().removeData();
        $("#tag-cloud").html("");

        var entries = [];
        for(var i=0; i<About.words.length; i++){
            entries.push({label: About.words[i]});
        }

        var settings = {
            entries: entries,
            width: $(window).width() + "px",
            height: $(window).height() + "px",
            radius: "65%",
            radiusMin: 75,
            bgDraw: true,
            bgColor: "#111",
            opacityOver: 1.00,
            opacityOut: 0.05,
            opacitySpeed: 6,
            fov: 800,
            speed: 0.7,
            fontFamily: "Oswald, Arial, sans-serif",
            fontSize: "15",
            fontColor: "#fff",
            fontWeight: "normal",
            fontStyle: "normal",
            fontStretch: "normal",
            fontToUpperCase: false
        };

        $("#tag-cloud").svg3DTagCloud(settings);
        $("#tag-cloud svg a").removeAttr("target").removeAttr("xlink:href").addClass("tag");

        resizeImage();
    },
    TC: {
        init: function(things){
            About.TC.info = {
                i: 0,
                e: []
            };

            About.TC.info.addTo = things.addTo;
            About.TC.info.prefix = things.classPrefix;

            for(var i=0; i<things.words.length; i++){
                var elem = "<p class='" + About.TC.info.prefix + "'>";
                elem += things.words[i] + "</p>";

                things.words[i] = $(elem);
                About.TC.info.e.push(things.words[i]);
            }

            for(var i=0; i<3; i++){
                $(About.TC.info.addTo).append(About.TC.info.e[i]);
            }

            About.intervals.skills = setInterval(About.TC.run, things.interval);
            About.TC.run();
        },
        run: function(){
            var up = [];
            up.length = 0;

            // Gather all words shown
            if(About.TC.info.i == 0)
                up.push(About.TC.info.e[About.TC.info.e.length-1]);
            else
                up.push(About.TC.info.e[About.TC.info.i-1]);
            up.push(About.TC.info.e[About.TC.info.i]);
            if(About.TC.info.i == About.TC.info.e.length-1)
                up.push(About.TC.info.e[0]);
            else
                up.push(About.TC.info.e[About.TC.info.i+1]);

            // Setup the class
            for(var i=0; i<up.length; i++){
                $(up[i]).removeClass(About.TC.info.prefix + "-up");
            }
            $(up[1]).addClass(About.TC.info.prefix + "-up");

            // Iterate
            About.TC.info.i++;
            if(About.TC.info.i == About.TC.info.e.length)
                About.TC.info.i = 0;

            // Display
            $(About.TC.info.addTo + " p:first-child").remove();
            $(About.TC.info.addTo).append(up[1]);
            $(About.TC.info.addTo).append(up[2]);
        }
    },
    LastFM: {
        gotArtistCloud: false,
        WordCloud: function(){
            function loadCloud() {
                var url = 'https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=CrypticEcho&api_key=dc400521a36d99cb1c2a780cb955cea3&period=6month&format=json';

                $('#artist-cloud').empty();
                $('#artist-cloud').append('<p class="text-center"><i class="fa fa-spin fa-circle-o-notch"></i></p>');

                $.get(url).done(function(data) {
                    if (data.error !== undefined) {
                        $('#artist-cloud').empty();
                        $('#artist-cloud').append('<div class="alert alert-danger">' + data.message + '</div>');
                        return;
                    }

                    $('#artist-cloud').empty();
                    var artists = data.topartists.artist;

                    var minPlayCount = Number.MAX_VALUE;
                    var maxPlayCount = 0;
                    for (var i = 0; i < artists.length; i++) {
                        var artist = artists[i];
                        minPlayCount = Math.min(minPlayCount, artist.playcount);
                        maxPlayCount = Math.max(maxPlayCount, artist.playcount);
                    }

                    function text(d, i) {
                        return d.name.toUpperCase();
                    }

                    function fontSize(d, i) {
                        var normalizedSize = d.playcount * 2500 / maxPlayCount;
                        return Math.sqrt(normalizedSize);
                    }

                    function rotate(d, i) {
                        return (i % 2 == 1);
                    }

                    var fontFamily = '"Open Sans"';
                    var fontWeight = 800;

                    var wordcloud = new ddr_d3.layout.Wordcloud();
                    wordcloud
                        .text(text)
                        .fontSize(fontSize)
                        .fontWeight(fontWeight)
                        .fontFamily(fontFamily)
                        .ratio([1, 2])
                        .rotate(rotate)
                        .draw(draw)
                        .layout(artists);

                    function draw(data) {
                        var sizeExtent = d3.extent(data, function(d) {
                            return d.size
                        });

                        var svg = d3.select('#artist-cloud').append('svg').attr('class', 'img-responsive');
                        var container = svg.append('g');
                        container.selectAll("text")
                            .data(data)
                            .enter().append("text")
                            .attr("x", wordcloud.xPlacement())
                            .attr("y", wordcloud.yPlacement())
                            .attr('font-family', wordcloud.familyAccessor())
                            .attr('font-size', function(d) {
                                return d.size + 'px';
                            })
                            .attr('font-weight', wordcloud.weightAccessor())
                            .attr('fill', function(d) {
                                var val = 128 - (128 * ((d.size - sizeExtent[0]) / (sizeExtent[1] - sizeExtent[0])));
                                return d3.rgb(val, val, val);
                            })
                            .attr('transform', function(d, i) {
                                if (d.rotate) {
                                    return new ddr_d3.util.Transform().rotate(90, d.boundingBox.getCenter().getX(), d.boundingBox.getCenter().getY()).toString();
                                }
                            })
                            .text(text);

                        var containerBounds = container.node().getBBox();
                        svg.attr('viewBox', containerBounds.x + ' ' + containerBounds.y + ' ' + containerBounds.width + ' ' + containerBounds.height);
                        svg.attr('width', containerBounds.width);
                        svg.attr('height', containerBounds.height);

                        $('#cloud-panel .download-area').show();
                        About.LastFM.gotArtistCloud = true;
                    }
                })
                .fail(function(error) {
                    console.error(error)
                });
            }

            if(!About.LastFM.gotArtistCloud)
                loadCloud();
        },
        CurrentlyPlaying: function(){
            $.get("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=CrypticEcho&api_key=dc400521a36d99cb1c2a780cb955cea3&format=json&limit=2", function(data){

                var date = (typeof data.recenttracks.track[0].date === "undefined") ? "" : data.recenttracks.track[0].date['#text'];
                var name = data.recenttracks.track[0].name;
                name = name.replace(/ *\([^)]*\) */g, " ");
                song = {
                    current: data.recenttracks.track[0]['@attr'] || "offline",
                    name: name,
                    album: data.recenttracks.track[0].album['#text'] || "",
                    artist: data.recenttracks.track[0].artist['#text'] || "",
                    cover: data.recenttracks.track[0].image[2]['#text'] || "",
                    date: date,
                    intro: ""
                };

                //set to something obvious
                if(song.current == "offline"){
                    song.current = false;
                    song.intro = "The last song listened to was:";
                }
                else{
                    song.current = true;
                    song.intro = "Currently listening to:";
                }

                var html = "<h3>" + song.intro + "</h3>";
                html += "<div id='song'>";
                html += "<img src='" + song.cover + "' />";
                if(song.current)
                    html += "<img class='song-eq' src='assets/img/eq.gif' />";
                html += "<p class='song-name'>" + song.name + "</p><br>";
                html += "<p>From the album <b>" + song.album + "</b></p><br>";
                html += "<p>By <b>" + song.artist + "</b></p>";
                if(!song.current)
                    html += "<br><p id='song-date'>Listened to on <b>" + song.date + "</b></p>";
                html += "</div>";

                $("#song-container").html(html);

                if(song.current)
                    $("#song").addClass("song-current").removeClass("song-last");
                else
                    $("#song").addClass("song-last").removeClass("song-current");

                resizeImage();
            });
        }
    }
};

function resizeImage(){
    if($(window).width() <= 525){
        var height = $("#song").height();
        var left = "calc(50% - " + (height / 2) + "px)";

        $("#song img").css("height", height);
        $("#song img").css("left", left);
    }
    else if($("#song img").attr("style")){
        $("#song img").removeAttr("style");
    }

    if($("#eye-container").is(":visible") && $("#me").width() < 480){
        $("#eye-container").hide();
    }
}
