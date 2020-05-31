var activeType = "delete";
var activeColor = "white";
var relations = [
    { type: "wall", color: "lightgreen" },
    { type: "enemy", color: "red" },
    { type: "treasure", color: "dodgerblue" },
    { type: "light", color: "yellow" },
    { type: "item1", color: "purple" },
    { type: "item2", color: "cyan" },
    { type: "delete", color: "white" },
    { type: "player", color: "chartreuse" },
]

var createBoard = (size) => {
    document.getElementById("sizeChoose").value = size;
    document.getElementById("board").innerHTML = "";
    for (var i = 0, buttons = document.getElementById("buttons").children; i < buttons.length; i++) {
        buttons[i].onclick = function (e) {
            activeType = e.target.innerHTML;
        }
    }
    var board = document.getElementById("board");
    for (var i = 0; i < size; i++) {
        var tr = document.createElement("tr");
        for (var j = 0; j < size; j++) {
            var td = document.createElement("td");
            tr.appendChild(td);
        }
        board.appendChild(tr);
    }
    $("table tr td").css("padding", 20 / size + "vw");
    $("td").click(function (e) {
        $(this).removeClass();
        $(this).addClass(activeColor);
        generateJSON();
    });
}

const generateJSON = () => {
    var panel = $("#JSON");
    var size = $("#sizeChoose").val();
    var output =
    {
        size: size,
        level: []
    };
    var table = document.getElementById("board");
    for (var i = 0; i < size; i++) {
        var tr = table.children[i];
        for (var j = 0; j < size; j++) {
            var td = tr.children[j];
            var color = td.classList[0];

            if (color && color != "white") {
                var typeIndex = relations.findIndex((el) => {
                    return el.color == color;
                });
                var type = relations[typeIndex].type;
                var cell =
                {
                    id: j + i * size + 1,
                    x: j,
                    z: i,
                    type: type
                };
                output.level.push(cell);
            }
        }
    }
    panel.val(JSON.stringify(output, null, "\t"));
}

const loadJSON = () => {
    var data = JSON.parse($("#JSON").val());
    var size = data.size;
    var levels = data.level;
    createBoard(size);
    for (let i = 0; i < levels.length; i++) {
        var cellData = data.level[i];
        var cell = document.getElementById("board").children[cellData.z].children[cellData.x];
        var colorIndex = relations.findIndex((el) => {
            return el.type == cellData.type;
        });
        var color = relations[colorIndex].color;
        cell.setAttribute("class", color);
    }
}

//----------- Events: -----------------/
$("#buttons button").click(function (e) {
    activeType = this.innerHTML;
    if (activeType == "wall")
        activeColor = "lightgreen";
    else if (activeType == "enemy")
        activeColor = "red";
    else if (activeType == "treasure")
        activeColor = "dodgerblue";
    else if (activeType == "light")
        activeColor = "yellow";
    else if (activeType == "item1")
        activeColor = "purple";
    else if (activeType == "item2")
        activeColor = "cyan";
    else if (activeType == "delete")
        activeColor = "white";
    else if (activeType == "player")
        activeColor = "chartreuse";
});

$("#sizeChoose").on("input", function () {
    createBoard($(this).val());
    generateJSON();
});

$("#reloadJSON").click(() => {
    loadJSON();
});

createBoard(document.getElementById("sizeChoose").value);
generateJSON();
