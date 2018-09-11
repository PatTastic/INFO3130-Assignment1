var App = {};
App.ChangePage = function(toPage){
    if(typeof About != "undefined"){
        if(typeof About.intervals.skills != "undefined")
            clearInterval(About.intervals.skills);
        if(typeof About.intervals.song != "undefined")
            clearInterval(About.intervals.song);
    }

    $("body").removeClass().addClass("page-" + toPage);
    $("#page-container").load("assets/partials/" + toPage + ".html");
    $("#resources").html("<link rel='stylesheet' href='assets/css/" + toPage + ".css' />");
};

$(document).ready(function(){
    $("#navigation").load("assets/partials/nav.html");
    window.addEventListener("hashchange", getHash, false);

    var footer = "<strong>Pat Wilken</strong>&copy; 2012-";
    footer += new Date().getFullYear() + ".";
    $("#credits").html(footer);

    getHash();
});

function getHash(){
    var url = "home";
    switch(location.hash){
        case "#about": url = "about"; break;
        case "#my-work": url = "my-work"; break;
        case "#contact": url = "contact"; break;
        default: url = "home"; break;
    }

    Nav.ToggleMobileMenu(true);
    App.ChangePage(url);
}
