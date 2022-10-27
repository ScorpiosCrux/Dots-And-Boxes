const player_colors = ["blue", "red", "lime"];
const players = 2;
const gameboard_size = 3;

let player_scores = [0, 0, 0];
let turn = 0;
let turn_color = player_colors[turn];
let gameboard_ids = new Array(gameboard_size);
let gameboard_data = {};

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

    isPopulated(side) {
        if (side == "left") {
            return this.left.populated;
        } else if (side == "right") {
            return this.right.populated;
        } else if (side == "top") {
            return this.top.populated;
        } else if (side == "bottom") {
            return this.bottom.populated;
        }
        return false;
    }

    setPopulated(side) {
        if (side == "left") {
            this.left.setPopulated();
        } else if (side == "right") {
            this.right.setPopulated();
        } else if (side == "top") {
            this.top.setPopulated();
        } else if (side == "bottom") {
            this.bottom.setPopulated();
        }
    }
}

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
                } else if (i == gameboard_size - 1) {
                    // bottom
                    // connect top UNTESTED
                    const square_top_edge = gameboard_data[gameboard_ids[i - 1][j]].bottom;
                    gameboard_data[id].connectTop(square_top_edge); //connect top
                } else {
                    // mid
                    // connect top, don't need to connect bottom because the next will connect their top which is our bottom
                    const square_top_edge = gameboard_data[gameboard_ids[i - 1][j]].bottom;
                    gameboard_data[id].connectTop(square_top_edge);
                }
            } else if (j == gameboard_size - 1) {
                // right
                if (i == 0) {
                    const square_right_edge = gameboard_data[gameboard_ids[i][j - 1]].right;
                    gameboard_data[id].connectLeft(square_right_edge);
                } else if (i == gameboard_size - 1) {
                    // bottom
                    // connect top
                    const square_top_edge = gameboard_data[gameboard_ids[i - 1][j]].bottom;
                    gameboard_data[id].connectTop(square_top_edge); //connect top

                    const square_right_edge = gameboard_data[gameboard_ids[i][j - 1]].right;
                    gameboard_data[id].connectLeft(square_right_edge);
                } else {
                    // mid
                    // connect top, don't need to connect bottom because the next will connect their top which is our bottom
                    const square_top_edge = gameboard_data[gameboard_ids[i - 1][j]].bottom;
                    gameboard_data[id].connectTop(square_top_edge);

                    const prev_id = gameboard_ids[i][j - 1];
                    const square_right_edge = gameboard_data[gameboard_ids[i][j - 1]].right;
                    gameboard_data[id].connectLeft(square_right_edge);
                }
            } else {
                if (i == 0) {
                    const square_right_edge = gameboard_data[gameboard_ids[i][j - 1]].right;
                    gameboard_data[id].connectLeft(square_right_edge);
                } else if (i == gameboard_size - 1) {
                    // bottom
                    const square_top_edge = gameboard_data[gameboard_ids[i - 1][j]].bottom;
                    gameboard_data[id].connectTop(square_top_edge); //connect top

                    const square_right_edge = gameboard_data[gameboard_ids[i][j - 1]].right;
                    gameboard_data[id].connectLeft(square_right_edge);
                } else {
                    // mid
                    // connect top, don't need to connect bottom because the next will connect their top which is our bottom
                    const square_top_edge = gameboard_data[gameboard_ids[i - 1][j]].bottom;
                    gameboard_data[id].connectTop(square_top_edge);

                    const prev_id = gameboard_ids[i][j - 1];
                    const square_right_edge = gameboard_data[gameboard_ids[i][j - 1]].right;
                    gameboard_data[id].connectLeft(square_right_edge);
                }
            }

            id += 1;
        }
    }

    console.log("Done");
}

function getCoordinates(id) {
    for (let i = 0; i < gameboard_size; i++) {
        for (let j = 0; j < gameboard_size; j++) {
            if (gameboard_ids[i][j] == id) return { i_index: i, j_index: j };
        }
    }
}

function updateScore() {
    const numbers = ["One", "Two", "Three"];
    for (let i = 1; i <= players; i++) {
        const score_el = document.getElementById(`p${i}_score`);
        score_el.textContent = `Player ${numbers[i - 1]}: ${player_scores[i - 1]}`;
        score_el.style.color = player_colors[i - 1];
    }
}

function checkAndPoint(target_id) {
    const square = gameboard_data[target_id];
    if (square.checkStatus()) {
        console.log("score updated!");
        player_scores[turn] += 1;
        updateScore();
        return true;
    }
    return false;
}

function checkPoint(edge, id) {
    const { i_index, j_index } = getCoordinates(id);

    const right = { i: i_index, j: j_index + 1 };
    const left = { i: i_index, j: j_index - 1 };

    const current = { i: i_index, j: j_index };

    const top = { i: i_index - 1, j: j_index };
    const bottom = { i: i_index + 1, j: j_index };

    const checks = [];

    if (edge == "right") {
        if (j_index == 0) {
            checks.push(current);
            checks.push(right);
        } else if (j_index == gameboard_size - 1) {
            checks.push(current);
        } else {
            // mid
            checks.push(current);
            checks.push(right);
        }
    } else if (edge == "left") {
        if (j_index == 0) {
            checks.push(current);
        } else if (j_index == gameboard_size - 1) {
            checks.push(current);
            checks.push(left);
        } else {
            // mid
            checks.push(current);
            checks.push(left);
        }
    } else if (edge == "bottom") {
        if (i_index == 0) {
            checks.push(current);
            checks.push(bottom);
        } else if (i_index == gameboard_size - 1) {
            checks.push(current);
        } else {
            // mid
            checks.push(current);
            checks.push(bottom);
        }
    } else if (edge == "top") {
        if (i_index == 0) {
            checks.push(current);
        } else if (i_index == gameboard_size - 1) {
            checks.push(top);
            checks.push(current);
        } else {
            // mid
            checks.push(top);
            checks.push(current);
        }
    }

    let gained_point = false;

    for (let check of checks) {
        let target_id = gameboard_ids[check.i][check.j];
        let boxed = checkAndPoint(target_id);
        if (boxed) gained_point = true;
    }

    if (!gained_point) {
        console.log("current turn: " + turn_color);
        turn += 1;
        if (turn >= players) turn = 0;
        turn_color = player_colors[turn];
        console.log("updated turn: " + turn_color);
    }
}

function getSide(btn_name) {
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

function updateBorderAndMargin(element, side, border_style, margin_style) {
    switch (side) {
        case "top":
            element.style.borderTop = border_style;
            element.style.marginTop = margin_style;
            return;
        case "bottom":
            element.style.borderBottom = border_style;
            element.style.marginBottom = margin_style;
            return;
        case "left":
            element.style.borderLeft = border_style;
            element.style.marginLeft = margin_style;
            return;
        case "right":
            element.style.borderRight = border_style;
            element.style.marginRight = margin_style;
            return;
    }
}

function addEdge() {
    let border_style = `solid 5px ${turn_color}`;

    const btn_name = this.getAttribute("name");
    const parent = this.parentElement;
    const square_id = parent.getAttribute("id");
    const side = getSide(btn_name);

    updateBorderAndMargin(parent, side, border_style, "0");
    gameboard_data[square_id].setPopulated(side);
    checkPoint(side, square_id);
}

function onHover() {
    const btn_name = this.getAttribute("name");
    const parent = this.parentElement;
    const id = parent.getAttribute("id");
    const border = "dashed 5px black";
    const side = getSide(btn_name);

    if (!gameboard_data[id].isPopulated(side)) 
        updateBorderAndMargin(parent, side, border, "0");
}

function onMouseOut() {
    const btn_name = this.getAttribute("name");
    const parent = this.parentElement;   
    const side = getSide(btn_name);

    let update = false;
    if (side == "top" && parent.style.borderTopColor == "black"){
        update = true;
    } else if (side == "bottom" && parent.style.borderBottomColor == "black"){
        update = true;
    } else if (side == "left" && parent.style.borderLeftColor == "black"){
        update = true;
    } else if (side == "right" && parent.style.borderRightColor == "black"){
        update = true;
    }

    if (update){
        updateBorderAndMargin(parent, side, "none", "5px");
        console.log("test");
    }

}

function main() {

    for (var i = 0; i < gameboard_ids.length; i++) {
        gameboard_ids[i] = new Array(gameboard_size);
    }

    for (let i = 0; i < gameboard_size * gameboard_size; i++) {
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

    createGameBoardLogic();
}

main();