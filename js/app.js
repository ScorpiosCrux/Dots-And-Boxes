const gameboard_el = document.querySelector(".gameboard");

const player_colors = ["blue", "red", "lime"];
const players = 2;

let turn = 0;
let turn_color = player_colors[turn];

const gameboard_size = 3;
let gameboard_data = {};
let gameboard_ids = new Array(gameboard_size);

for (var i = 0; i < gameboard_ids.length; i++) {
    gameboard_ids[i] = new Array(gameboard_size);
}

// console.log(x);

function switchTurns() {
    turn += 1;
    if (turn >= players) turn = 0;
    turn_color = player_colors[turn];
}

class EdgeData {
    constructor() {
        this.populated = false;
    }

    setPopulated() {
        this.populated = true;
    }
}

class SquareData {
    constructor() {
        this.top = new EdgeData();
        this.bottom = new EdgeData();
        this.right = new EdgeData();
        this.left = new EdgeData();
    }

    connectTop(top) {
        this.top = top;
    }

    connectBottom(bottom) {
        this.bottom = bottom;
    }

    connectLeft(left) {
        this.left = left;
    }

    connectRight(right) {
        this.right = right;
    }

    checkStatus() {
        if (this.top.populated && this.bottom.populated && this.left.populated && this.right.populated) return true;
        else return false;
    }
}

// const test = new SquareData();
// test.left.setPopulated();
// console.log(test);

// const connected = new SquareData();
// connected.connectLeft(test.left);
// connected.connectTop(test.top);

// test.top.setPopulated();
// connected.bottom.setPopulated();
// connected.right.setPopulated();
// console.log(connected.checkStatus());

// console.log(connected);

createGameBoardLogic();

function createGameBoardLogic() {
    let id = 0;
    for (let i = 0; i < gameboard_size; i++) {
        for (let j = 0; j < gameboard_size; j++) {
            gameboard_data[id] = new SquareData();
            gameboard_ids[i][j] = id;
            if (j == 0) {
                // left
                if (i == 0) {
                    // pass
                } else if (i == gameboard_size - 1) {// bottom
                    // connect top UNTESTED
                    const square_top_edge = gameboard_data[gameboard_ids[i - 1][j]].bottom;
                    gameboard_data[id].connectTop(square_top_edge); //connect top
                    // gameboard_data[id].top.setPopulated();
                    // console.log(gameboard_data);
                } else {// mid
                    // connect top, don't need to connect bottom because the next will connect their top which is our bottom
                    const square_top_edge = gameboard_data[gameboard_ids[i - 1][j]].bottom;
                    gameboard_data[id].connectTop(square_top_edge); 

                    // gameboard_data[id].top.setPopulated();
                    // console.log(gameboard_data);
                }
            } else if (j == gameboard_size - 1) {
                // right
                if (i == 0) {
                    const square_right_edge = gameboard_data[gameboard_ids[i][j-1]].right;
                    gameboard_data[id].connectLeft(square_right_edge);
                } else if (i == gameboard_size - 1) {// bottom
                    // connect top 
                    const square_top_edge = gameboard_data[gameboard_ids[i - 1][j]].bottom;
                    gameboard_data[id].connectTop(square_top_edge); //connect top
                    // gameboard_data[id].top.setPopulated();
                    // console.log(gameboard_data);

                    const square_right_edge = gameboard_data[gameboard_ids[i][j-1]].right;
                    gameboard_data[id].connectLeft(square_right_edge);
                } else {// mid
                    // connect top, don't need to connect bottom because the next will connect their top which is our bottom
                    const square_top_edge = gameboard_data[gameboard_ids[i - 1][j]].bottom;
                    gameboard_data[id].connectTop(square_top_edge); 

                    const prev_id = gameboard_ids[i][j-1];
                    const square_right_edge = gameboard_data[gameboard_ids[i][j-1]].right;
                    gameboard_data[id].connectLeft(square_right_edge); 

                    // gameboard_data[id].left.setPopulated();
                    // console.log(gameboard_data);
                }
            } else {
                if (i == 0) {
                    const square_right_edge = gameboard_data[gameboard_ids[i][j-1]].right;
                    gameboard_data[id].connectLeft(square_right_edge);
                } else if (i == gameboard_size - 1) {// bottom
                    // connect top 
                    const square_top_edge = gameboard_data[gameboard_ids[i - 1][j]].bottom;
                    gameboard_data[id].connectTop(square_top_edge); //connect top
                    // gameboard_data[id].top.setPopulated();
                    // console.log(gameboard_data);

                    const square_right_edge = gameboard_data[gameboard_ids[i][j-1]].right;
                    gameboard_data[id].connectLeft(square_right_edge);
                } else {// mid
                    // connect top, don't need to connect bottom because the next will connect their top which is our bottom
                    const square_top_edge = gameboard_data[gameboard_ids[i - 1][j]].bottom;
                    gameboard_data[id].connectTop(square_top_edge); 

                    const prev_id = gameboard_ids[i][j-1];
                    const square_right_edge = gameboard_data[gameboard_ids[i][j-1]].right;
                    gameboard_data[id].connectLeft(square_right_edge); 

                    // gameboard_data[id].left.setPopulated();
                    // console.log(gameboard_data);
                }
            }

            id += 1;
        }
    }

    console.log("Done")
}

// const gameboard_width = gameboard.clientWidth;
// const gameboard_height = gameboard.clientHeight;

// const circle = document.createElement("div");
// circle.setAttribute("id", "1");
// circle.setAttribute("class", "circle");
// circle.style.
// gameboard.appendChild(circle);

// console.log(gameboard);

// Function to change the content of t2

function updateData(){

}

function addEdge() {
    const btn_name = this.getAttribute("name");
    const parent = this.parentElement;

    let id = -1
    let border_style = `solid 5px ${turn_color}`;

    switch (btn_name) {
        case "btn-top":
            parent.style.borderTop = border_style;
            parent.style.marginTop = "0";
            id = parent.getAttribute("id");
            gameboard_data[id].top.setPopulated();
            switchTurns();
            break;
        case "btn-bottom":
            parent.style.borderBottom = border_style;
            parent.style.marginBottom = "0";
            id = parent.getAttribute("id");
            gameboard_data[id].bottom.setPopulated();
            switchTurns();
            break;
        case "btn-left":
            parent.style.borderLeft = border_style;
            parent.style.marginLeft = "0";
            id = parent.getAttribute("id");
            gameboard_data[id].left.setPopulated();
            switchTurns();
            break;
        case "btn-right":
            parent.style.borderRight = border_style;
            parent.style.marginRight = "0";
            id = parent.getAttribute("id");
            gameboard_data[id].right.setPopulated();
            switchTurns();
            break;
    }
    console.log(gameboard_data)

}

function onHover() {
    const btn_name = this.getAttribute("name");
    const parent = this.parentElement.style;
    const player_1_color = "blue";

    switch (btn_name) {
        case "btn-top":
            if (parent.outlineTopColor != player_1_color) {
                parent.borderTop = "dashed 5px black";
                parent.marginTop = "0";
            }
            break;
        case "btn-bottom":
            if (parent.borderBottomColor != player_1_color) {
                parent.borderBottom = "dashed 5px black";
                parent.marginBottom = "0";
            }
            break;
        case "btn-left":
            if (parent.borderLeftColor != player_1_color) {
                parent.borderLeft = "dashed 5px black";
                parent.marginLeft = "0";
            }
            break;
        case "btn-right":
            if (parent.borderRightColor != player_1_color) {
                parent.borderRight = "dashed 5px black";
                parent.marginRight = "0";
            }
            break;
    }
}

function onMouseOut() {
    const btn_name = this.getAttribute("name");
    const parent = this.parentElement.style;
    const hover_color = "black";

    switch (btn_name) {
        case "btn-top":
            if (parent.borderTopColor == hover_color) {
                parent.borderTop = "none";
                parent.marginTop = "5px";
            }
            break;
        case "btn-bottom":
            if (parent.borderBottomColor == hover_color) {
                parent.borderBottom = "none";
                parent.marginBottom = "5px";
            }
            break;
        case "btn-left":
            if (parent.borderLeftColor == hover_color) {
                parent.borderLeft = "none";
                parent.marginLeft = "5px";
            }
            break;
        case "btn-right":
            if (parent.borderRightColor == hover_color) {
                parent.borderRight = "none";
                parent.marginRight = "5px";
            }
            break;
    }
}

for (let i = 0; i < gameboard_size*gameboard_size; i++) {
    // Add event listener to table
    const square = document.getElementById(i).children;
    for (child of square) {
        if (child.nodeName == "BUTTON") {
            child.addEventListener("mouseover", onHover, false);
            child.addEventListener("mouseout", onMouseOut, false);
            child.addEventListener("click", addEdge, false);
        }
    }
}

// box.addEventListener("click", addEdge, false);
