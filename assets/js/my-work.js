var MyWork = {
    Data: {},
    Load: function(){
        $("#dates li").off().on("click", function(e){
            if(e.currentTarget.className.indexOf("not-a-link") > -1){
                clearTimeout(MyWork.Data.timelineTimeout);
                MyWork.Data.workType = e.currentTarget.dataset.toType;

                var oldType = (MyWork.Data.workType == "work") ? "proj" : "work";
                $("." + oldType + "-link").fadeOut(500, function(){
                    $("." + MyWork.Data.workType + "-link").fadeIn();
                });
            }
            else{
                $("#dates").removeClass("open");
            }

            MyWork.Data.continue = false;
            MyWork.ChangeTimelineItem(e.currentTarget.dataset.id);
        });

        $(".toggleProjects").off().on("click", function(e){
            $("#dates").toggleClass("open");
        });

        MyWork.Data.busy = false;
        MyWork.Data.continue = true;
        MyWork.Data.timelineTimeout = null;
        MyWork.Data.workType = "work";
        MyWork.ChangeTimelineItem(1);
    },
    Pause: function(){
        MyWork.Data.continue = !MyWork.Data.continue;
        var msg = MyWork.Data.continue ? "Pause" : "Resume";

        if(MyWork.Data.continue){
            MyWork.ChooseTimelineItem();
        }
        else{
            MyWork.ChangeTimelineItem(MyWork.Data.target);
        }
    },
    ChooseTimelineItem: function(){
        var id = 1;
        var selector = "#items ." + MyWork.Data.workType + "-item";
        var w = $(selector);

        for(var i=0; i<w.length; i++){
            if($(w[i]).is(":visible")){
                id = $(w[i])[0].id;
                break;
            }
        }

        if(id >= w.length)
            id = 1;
        else
            id++;

        MyWork.ChangeTimelineItem(id);
    },
    ChangeTimelineItem: function(target){
        if(!MyWork.Data.busy){
            MyWork.Data.busy = true;
            MyWork.Data.target = target;
            clearTimeout(MyWork.Data.timelineTimeout);

            var id = "1";
            var w = $("#items .item");
            for(var i=0; i<w.length; i++){
                if($(w[i]).is(":visible")){
                    id = $(w[i])[0].id;
                    break;
                }
            }

            if(MyWork.Data.continue){
                $("#timelineProgressBar").show().animate({
                    width: "0px"
                }, 200);
            }
            else{
                $("#timelineProgressBar").hide();
            }

            $("li[data-id=" + id + "]").removeClass("selected-item");
            $("#" + id).removeClass("show-pseudo");
            setTimeout(function(){
                $("#" + id).fadeOut(500, function(){
                    $("#items .item").hide();

                    $("li[data-id=" + target + "]").addClass("selected-item");

                    $("#" + target).fadeIn(500, function(){
                        if(MyWork.Data.target != target){
                            $("#" + target).hide();
                        }

                        if(MyWork.Data.continue){
                            MyWork.Data.timelineTimeout = setTimeout(MyWork.ChooseTimelineItem, 5000);
                            $("#timelineProgressBar").animate({
                                width: "100%"
                            }, 5000);
                        }

                        $("#" + target).addClass("show-pseudo");
                        MyWork.Data.busy = false;
                    });
                });
            }, 500);
        }
    }
};
