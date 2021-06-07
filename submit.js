$("#submitButton").click(function () {
    var latitude = 0;
    var longitude = 0;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
        });
    } else {
        window.alert("오류: 사용자 위치 정보 액세스 권한을 허용해주세요");
    }

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
        }
    })
})
