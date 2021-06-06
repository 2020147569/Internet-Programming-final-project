$("#submitButton").click(function () {
    $.ajax ({
        url: "https://pacific-garden-17851.herokuapp.com/",
        type: "POST",
        data: {
            personnel: $("input[name=personnel]").val(),
            from: $("input[name=from]").val(),
            to: $("input[name=to]").val(),
            preference: $("input[name=preference]").val()
        },
        success: function(data) {
            localStorage.clear();
            localStorage.setItem('item', data);
        }
    })
})
