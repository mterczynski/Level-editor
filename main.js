const relations = [
    { type: "wall", color: "lightgreen" },
    { type: "enemy", color: "red" },
    { type: "treasure", color: "dodgerblue" },
    { type: "light", color: "yellow" },
    { type: "item1", color: "purple" },
    { type: "item2", color: "cyan" },
    { type: "delete", color: "white" },
    { type: "player", color: "chartreuse" },
];

let activeType = "delete";
let activeColor = "white";

let isInTilePlacementMode = true;

const createBoard = (size) => {
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

    $("td").mousedown(function (e) {
        $(this).removeClass();
        $(this).addClass(activeColor);
        generateJSON();
        isInTilePlacementMode = true;
    });

    $("td").mouseover(function (e) {
        if(isInTilePlacementMode) {
            $(this).removeClass();
            $(this).addClass(activeColor);
            generateJSON();
        }
    });
}

const generateJSON = () => {
    var panel = $("#JSON");
    var size = $("#sizeChoose").val();
    var output =
    {
        size: size,
        tiles: []
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
                    x: j,
                    y: i,
                    type: type
                };
                output.tiles.push(cell);
            }
        }
    }
    panel.val(JSON.stringify(output, null, "\t"));
}

const loadJSON = () => {
    const data = JSON.parse($("#JSON").val());
    const size = data.size;
    const tiles = data.tiles;

    createBoard(size);
    
    for (let i = 0; i < tiles.length; i++) {
        const cellData = data.tiles[i];
        const cell = document.getElementById("board").children[cellData.y].children[cellData.x];
        const colorIndex = relations.findIndex(el => el.type == cellData.type);
        const color = relations[colorIndex].color;

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

$("body").mouseup(() => {
    isInTilePlacementMode = false;
})

createBoard(document.getElementById("sizeChoose").value);
generateJSON();
