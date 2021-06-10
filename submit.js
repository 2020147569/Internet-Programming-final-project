$("#submitButton").click(function () {
    $("#sidenav").width("0");

    const personnel = $("input[name=personnel]").val();
    var from = $("input[name=from]").val();
    const from_hh = parseInt(from.substring(0, 2));
    const from_mm = parseInt(from.substring(3));
    const to = $("input[name=to]").val();
    const to_hh = parseInt(to.substring(0, 2));
    const to_mm = parseInt(to.substring(3));
    const preferencetext = $("input[name=preference]").serialize();
    if (personnel < 1 || personnel > 4) {
        window.alert("인원은 최소 1명, 최대 4명으로 제한됩니다!");
    } else if ((from_hh < 9 || from_hh > 21) && !(from_hh == 22 && from_mm == 0)) {
        window.alert("시간은 09:00 부터 22:00 까지로 제한됩니다!");
    } else if ((to_hh < 9 || to_hh > 21) && !(to_hh == 22 && to_mm == 0)) {
        window.alert("시간은 09:00 부터 22:00 까지로 제한됩니다!");
    } else if ((from_hh * 60 + from_mm) - (to_hh * 60 + to_mm) >= 0) {
        window.alert("시작 시간이 끝 시간보다 앞서야 합니다!");
    } else if (preferencetext == "") {
        window.alert("선호도를 선택하세요!");
    } else  {
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
                
                var preference = decodeURI(preferencetext).split("&preference=");
                preference[0] = preference[0].slice(11);

                $.ajax ({
                    url: "https://pacific-garden-17851.herokuapp.com/",
                    type: "POST",
                    data: {
                        personnel: personnel,
                        from: from,
                        to: to,
                        preference: preference,
                        latitude: latitude,
                        longitude: longitude
                    },
                    success: function(data) {
                        if(data.length == 0){
                            window.alert("No data matches the request");
                        } else{
                            data_display(data);
                            data_marker(data);
                        }
                    },
                    error: function(){
                        window.alert("* ERROR * occured!\nServer may be under regular inspection.");
                    },
                    complete: function(){
                        clearInterval(id1);
                        time1 = 0;
                        l1.innerHTML = "";
                        clearInterval(id2);
                        time2 = 0;
                        l2.innerHTML = "";
                        document.getElementById("loading").style.width = "0%";
                        document.getElementById("loading").style.padding = "0";
                    }
                })
            });
        } else {
            window.alert("오류: 사용자 위치 정보 액세스 권한을 허용해주세요");
        }
    }
})
