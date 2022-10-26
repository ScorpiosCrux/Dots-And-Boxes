const gameboard = document.querySelector(".gameboard");



// const gameboard_width = gameboard.clientWidth;
// const gameboard_height = gameboard.clientHeight;

// const circle = document.createElement("div");
// circle.setAttribute("id", "1");
// circle.setAttribute("class", "circle");
// circle.style.
// gameboard.appendChild(circle);

// console.log(gameboard);

// Function to change the content of t2
function addEdge() {
    const btn_name = this.getAttribute("name")
    const parent = this.parentElement.style
    
    switch(btn_name) {
        case "btn-top":
            parent.borderTop = "solid 5px blue"
            break;
        case "btn-bottom":
            parent.borderBottom = "solid 5px blue"
            break;
        case "btn-left":
            parent.borderLeft = "solid 5px blue"
            break;
        case "btn-right":
            parent.borderRight = "solid 5px blue"
            break;
    }
}

function onHover(){
    const btn_name = this.getAttribute("name")
    const parent = this.parentElement.style
    const player_1_color = "blue"
    
    switch(btn_name) {
        case "btn-top":
            if (parent.outlineTopColor != player_1_color)
                parent.borderTop = "dashed 5px black"
            break;
        case "btn-bottom":
            if (parent.borderBottomColor != player_1_color)
                parent.borderBottom = "dashed 5px black"
            break;
        case "btn-left":
            if (parent.borderLeftColor != player_1_color)
                parent.borderLeft = "dashed 5px black"
            break;
        case "btn-right":
            if (parent.borderRightColor != player_1_color)
                parent.borderRight = "dashed 5px black"
            break;
    }
}

function onMouseOut(){
    const btn_name = this.getAttribute("name")
    const parent = this.parentElement.style
    const hover_color = "black"
    
    switch(btn_name) {
        case "btn-top":
            if (parent.borderTopColor == hover_color)
                parent.borderTop = "none"
            break;
        case "btn-bottom":
            if (parent.borderBottomColor == hover_color)
                parent.borderBottom = "none"
            break;
        case "btn-left":
            if (parent.borderLeftColor == hover_color)
                parent.borderLeft = "none"
            break;
        case "btn-right":
            if (parent.borderRightColor == hover_color)
                parent.borderRight = "none"
            break;
    }
}


for (let i = 1; i <= 9; i++){
    // Add event listener to table
    const square = document.getElementById(i).children
    for (child of square){
        if (child.nodeName == "BUTTON"){
            child.addEventListener("mouseover", onHover, false)
            child.addEventListener("mouseout", onMouseOut, false)
            child.addEventListener("click", addEdge, false)

        }
    }
}





// box.addEventListener("click", addEdge, false);
