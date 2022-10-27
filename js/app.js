const gameboard_el = document.querySelector(".gameboard");

const player_colors = ["blue", "red", "lime"];
const players = 2;

let player_scores = [0, 0, 0];

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
    console.log(turn_color);
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

    isPopulated(side){
        if (side == "left"){
            return this.left.populated
        } else if (side == "right"){
            return this.right.populated
        } else if (side == "top"){
            return this.top.populated
        } else if (side == "bottom"){
            return this.bottom.populated
        }
        return false;
    }

    setPopulated(side){
        if (side == "left"){
            this.left.setPopulated()
        } else if (side == "right"){
            this.right.setPopulated()
        } else if (side == "top"){
            this.top.setPopulated()
        } else if (side == "bottom"){
            this.bottom.setPopulated()
        }
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
function getCoordinates(id){
    for (let i = 0; i < gameboard_size; i++){
        for (let j = 0; j < gameboard_size; j++){
            if (gameboard_ids[i][j] == id)
                return {i_index: i, j_index: j};
        }
    }
}


function checkPoint(edge, id){
    const {i_index, j_index} = getCoordinates(id);
    if (edge == "right"){
        if (j_index == 0){
            

        } else if (j_index == gameboard_size-1){

        }else{
            if (i_index == 0){
                let target_id = gameboard_ids[i_index][j_index];
                let square = gameboard_data[target_id];
                if (square.checkStatus()){
                    player_scores[turn] += 1;
                    console.log(player_scores);
                }

                // Check box on the right
                target_id = gameboard_ids[i_index][j_index+1];
                square = gameboard_data[target_id];
                if (square.checkStatus()){
                    player_scores[turn] += 1;
                    console.log(player_scores);
                }

            }
        }



        console.log("test")
    } else if (edge == "left"){

    }

}

function getSide(btn_name){
    switch (btn_name) {
        case "btn-top":
            return "top";
        case "btn-bottom":
            return "bottom";
        case "btn-left":
            return "left";
        case "btn-right":
            return "right";
    }
}

function updateBorderAndMargin(element, side, border_style, margin_style){
    switch (side) {
        case "top":
            element.style.borderTop = border_style;
            element.style.marginTop = "0";
            return;
        case "bottom":
            element.style.borderBottom = border_style;
            element.style.marginBottom = "0";
            return;
        case "left":
            element.style.borderLeft = border_style;
            element.style.marginLeft = "0";
            return;
        case "right":
            element.style.borderRight = border_style;
            element.style.marginRight = "0";
            return;
    }
}


function addEdge() {
    const btn_name = this.getAttribute("name");
    const parent = this.parentElement;
    square_id = parent.getAttribute("id");

    let id = -1
    let border_style = `solid 5px ${turn_color}`;

    const side = getSide(btn_name);
    updateBorderAndMargin(parent, side, border_style);
    gameboard_data[square_id].setPopulated(side);
    checkPoint();
    switchTurns();

    // switch (btn_name) {
    //     case "btn-top":
    //         parent.style.borderTop = border_style;
    //         parent.style.marginTop = "0";
    //         id = parent.getAttribute("id");
    //         gameboard_data[id].top.setPopulated();
    //         checkPoint();
    //         switchTurns();
    //         break;
    //     case "btn-bottom":
    //         parent.style.borderBottom = border_style;
    //         parent.style.marginBottom = "0";
    //         id = parent.getAttribute("id");
    //         gameboard_data[id].bottom.setPopulated();
    //         checkPoint();
    //         switchTurns();
    //         break;
    //     case "btn-left":
    //         parent.style.borderLeft = border_style;
    //         parent.style.marginLeft = "0";
    //         id = parent.getAttribute("id");
    //         gameboard_data[id].left.setPopulated();
    //         checkPoint();
    //         switchTurns();
    //         break;
    //     case "btn-right":
    //         parent.style.borderRight = border_style;
    //         parent.style.marginRight = "0";
    //         id = parent.getAttribute("id");
    //         gameboard_data[id].right.setPopulated();
    //         checkPoint("right", id);
    //         switchTurns();
    //         break;
    // }
    console.log(gameboard_data)

}

function onHover() {
    const btn_name = this.getAttribute("name");
    const parent = this.parentElement;
    const id = parent.getAttribute("id");
    
    const player_1_color = "blue";

    switch (btn_name) {
        case "btn-top":
            if (!gameboard_data[id].isPopulated("top")) {
                parent.style.borderTop = "dashed 5px black";
                parent.style.marginTop = "0";
            }
            break;
        case "btn-bottom":
            if (!gameboard_data[id].isPopulated("bottom")) {
                parent.style.borderBottom = "dashed 5px black";
                parent.style.marginBottom = "0";
            }
            break;
        case "btn-left":
            if (!gameboard_data[id].isPopulated("left")) {
                parent.style.borderLeft = "dashed 5px black";
                parent.style.marginLeft = "0";
            }
            break;
        case "btn-right":
            if (!gameboard_data[id].isPopulated("right")) {
                parent.style.borderRight = "dashed 5px black";
                parent.style.marginRight = "0";
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
