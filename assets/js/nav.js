var Nav = {};
Nav.Load = function(){
    $("#mobile-menu-open").on("click", Nav.ToggleMobileMenu);
    $("#mobile-menu-close").on("click", Nav.ToggleMobileMenu);
    $(window).resize(Nav.Resize);
    
    $(".navbar-mobile ul").hide();
    Nav.Resize();

    if(isMobile.any){
        $("#navigation .logo").addClass("logo-nav-mobile");
    }
    else{
        $("#navigation .logo").addClass("logo-nav");
    }
};

Nav.ToggleMobileMenu = function(mode){
    if(typeof mode == "undefined" || mode == null)
        mode = false;
    
    if($(".navbar-mobile").css("opacity") == 0){
        $(".navbar-mobile").show();
        $(".navbar-mobile").css("height", $(window).height());
        $(".navbar-mobile").css("opacity", "1");
        $(".navbar-mobile ul").show();
        $("#border").hide();
    }
    else{
        $(".navbar-mobile").removeAttr("style");
        $(".navbar-mobile ul").hide();
        $("#border").show();
        setTimeout(function(){$(".navbar-mobile").hide();}, 300);
    }
    
    if(mode == true){
        $(".navbar-mobile").removeAttr("style");
        $(".navbar-mobile ul").hide();
        $("#border").show();
        setTimeout(function(){$(".navbar-mobile").hide();}, 300);
    }
};

Nav.Resize = function(){
    if($(window).width() <= 767){
        if(!$("#mobile-menu-toggle").is(":visible")){
            $("#mobile-menu-toggle").show();
            //$(".navbar-mobile ul").show();
            $(".navbar-full").hide();
            $("#navigation .logo").addClass("logo-nav-mobile");
        }
    }
    else{
        if(!$(".navbar-full").is(":visible")){
            $("#mobile-menu-toggle").hide();
            $(".navbar-full").show();
            $(".navbar-mobile ul").hide();
            $(".navbar-mobile").removeAttr("style");
        }
    }
    
    if($(".navbar-mobile").css("opacity") != 0){
        $(".navbar-mobile").css("height", $(window).height());
    }
};
