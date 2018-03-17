$(function () {

    $("span>img").mouseover(function () {
        $(this).css({cursor: "pointer", width: "2.7%", height: "2.7%"});
    });

    $("span>img").mouseout(function () {
        $(this).css({cursor: "pointer", width: "3%", height: "3%"});
    });

    $("#but1").click(function () {
        $("#imgDiv").fadeIn(2000);
    });

    $("#img1").click(function () {
        $("#wcId").fadeIn(3000);
        $("#imgDiv").fadeOut(200);
    });
    $("#wcId").dblclick(function () {
        $(this).remove();
        $("#imgDiv").fadeToggle(2000);

    });

    $("#img3").click(function () {
        $("#imgDiv").fadeOut(200);
        // $("#albumId").html("<a href='album15/index.html'></a>")
    });
    $("#img4").on('click', function () {
        if (confirm('你确定要离开吗?')) {
            // closewin();
            window.opener = null;
            window.open('','_self')
            window.close();
        } else {

        }
    });

    // function closewin() {
    //     self.opener = null;
    //     self.close();
    // }

    var speed1 = 600;
    var speed2 = 8000;

    $(".dynamic-area1").css("animation", "posterDrop1 " + speed1 + "s linear infinite");
    $(".dynamic-area2").css("animation", "posterDrop2 " + speed2 + "s linear infinite");
    $("#but2").click(function () {
        speed1 -= 100;
        speed2 -= 1000;
        if (speed1 > 0 && speed2 > 0) {
            $(".dynamic-area1").css("animation", "posterDrop2 " + speed1 + "s linear infinite");
            $(".dynamic-area2").css("animation", "posterDrop2 " + speed2 + "s linear infinite");
        } else {
            $(this).unload();
            alert("Please stop~！");
        }
    });
    $("#but3").click(function () {
        if (speed1 < 600 && speed2 < 8000) {
            speed1 += 100;
            speed2 += 1000;
            $(".dynamic-area1").css("animation", "posterDrop2 " + speed1 + "s linear infinite");
            $(".dynamic-area2").css("animation", "posterDrop2 " + speed2 + "s linear infinite");
        } else {
            $(".dynamic-area1").css("animation", "posterDrop1 600s linear infinite");
            $(".dynamic-area2").css("animation", "posterDrop2 8000s linear infinite");

        }
    });

});