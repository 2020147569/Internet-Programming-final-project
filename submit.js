$("#submitButton").click(function () {
    var latitude = 0;
    var longitude = 0;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
        });
    }

    $.ajax ({
        url: "https://pacific-garden-17851.herokuapp.com/",
        type: "POST",
        data: {
            personnel: $("input[name=personnel]").val(),
            from: $("input[name=from]").val(),
            to: $("input[name=to]").val(),
            preference: $("input[name=preference]").val(),
            latitude: latitude,
            longitude: longitude
        },
        success: function(data) {
            localStorage.clear();
            localStorage.setItem('item', data);
        }
    })
})
