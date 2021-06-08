$("#submitButton").click(function () {
    document.getElementById("loading").style.width = "100%";
    document.getElementById("loading").style.padding = "0 0 0 30%";

    const l1 = document.getElementById("l1");
    const l2 = document.getElementById("l2");

    var time1 = 0;
    var id1 = setInterval(function () {
        time1++;
        if (time1 % 4 == 0) {
            l1.innerHTML = "";
            l1.innerHTML = "Loading"
        } else if (time1 % 4 == 1) {
            l1.innerHTML = "";
            l1.innerHTML = "Loading ."
        } else if (time1 % 4 == 2) {
            l1.innerHTML = "";
            l1.innerHTML = "Loading . ."
        } else {
            l1.innerHTML = "";
            l1.innerHTML = "Loading . . ."
        }
    }, 800);

    var time2 = 0;
    var id2 = setInterval(function () {
        time2++;
        l2.innerHTML = "";
        l2.innerHTML = "소요 시간: &nbsp;" + String(time2) + "초";
    }, 1000);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            $.ajax ({
                url: "https://pacific-garden-17851.herokuapp.com/",
                type: "POST",
                data: {
                    personnel: $("input[name=personnel]").val(),
                    from: $("input[name=from]").val(),
                    to: $("input[name=to]").val(),
                    preference: $("input[name=preference]").serialize(),
                    latitude: latitude,
                    longitude: longitude
                },
                success: function(data) {
                    localStorage.clear();
                    localStorage.setItem('item', data);
                    clearInterval(id1);
                    time1 = 0;
                    l1.innerHTML = "";
                    clearInterval(id2);
                    time2 = 0;
                    l2.innerHTML = "";
                    document.getElementById("loading").style.width = "0%";
                    document.getElementById("loading").style.padding = "0";
                },
                error: function(){
                    window.alert("error occured\nIf you didn't choose any category, please choose one.\nOtherwise, server may be under regular inspection.");
                    location.reload();
                }
            })
        });
    } else {
        window.alert("오류: 사용자 위치 정보 액세스 권한을 허용해주세요");
    }
})
