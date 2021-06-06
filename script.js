function opennav () {
    document.getElementById("sidenav").style.width = "15em";
}

function closenav () {
    document.getElementById("sidenav").style.width = "0";
}

function selectAll (selectAll) {
    const checkboxes = document.getElementsByName("preference");
    
    if (selectAll.id == "selectall1")
    {
        for (var i = 0; i < 3; i++) {
            checkboxes[i].checked = selectAll.checked;
        }
    } if (selectAll.id == "selectall2")
    {
        for (var i = 3; i < 18; i++) {
            checkboxes[i].checked = selectAll.checked;
        }
    } if (selectAll.id == "selectall3")
    {
        for (var i = 18; i < 25; i++) {
            checkboxes[i].checked = selectAll.checked;
        }
    } if (selectAll.id == "selectall4")
    {
        for (var i = 25; i < 33; i++) {
            checkboxes[i].checked = selectAll.checked;
        }
    } if (selectAll.id == "selectall5")
    {
        for (var i = 33; i < 40; i++) {
            checkboxes[i].checked = selectAll.checked;
        }
    } if (selectAll.id == "selectall6")
    {
        for (var i = 40; i < checkboxes.length; i++) {
            checkboxes[i].checked = selectAll.checked;
        }
    }
}

function display (button) {
    if (button.id == "button1") {
        const content = document.getElementById("checkbox1");
        if (content.style.display == "none") {
            content.style.display = "inline";
            button.innerHTML = "&utrif;";
        } else {
            content.style.display = "none";
            button.innerHTML = "&dtrif;";
        }
    } if (button.id == "button2") {
        const content = document.getElementById("checkbox2");
        if (content.style.display == "none") {
            content.style.display = "inline";
            button.innerHTML = "&utrif;";
        } else {
            content.style.display = "none";
            button.innerHTML = "&dtrif;";
        }
    } if (button.id == "button3") {
        const content = document.getElementById("checkbox3");
        if (content.style.display == "none") {
            content.style.display = "inline";
            button.innerHTML = "&utrif;";
        } else {
            content.style.display = "none";
            button.innerHTML = "&dtrif;";
        }
    } if (button.id == "button4") {
        const content = document.getElementById("checkbox4");
        if (content.style.display == "none") {
            content.style.display = "inline";
            button.innerHTML = "&utrif;";
        } else {
            content.style.display = "none";
            button.innerHTML = "&dtrif;";
        }
    } if (button.id == "button5") {
        const content = document.getElementById("checkbox5");
        if (content.style.display == "none") {
            content.style.display = "inline";
            button.innerHTML = "&utrif;";
        } else {
            content.style.display = "none";
            button.innerHTML = "&dtrif;";
        }
    } if (button.id == "button6") {
        const content = document.getElementById("checkbox6");
        if (content.style.display == "none") {
            content.style.display = "inline";
            button.innerHTML = "&utrif;";
        } else {
            content.style.display = "none";
            button.innerHTML = "&dtrif;";
        }
    }
}
