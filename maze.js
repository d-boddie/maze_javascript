const map = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W F",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW",
];

let gloRowNum;
let gloColNum;

const maze_element = document.getElementById("maze");

const createMaze = function (blueprint) {
    for (let rowNum = 0; rowNum < blueprint.length; rowNum++) {
        const rowString = blueprint[rowNum];
        let div_blocks = "";

        for (let colNum = 0; colNum < rowString.length; colNum++) {
            const blockType = rowString[colNum];
            if (blockType === "W") {
                div_blocks += `<div class="block wall" data-column="${colNum}" data-row="${rowNum}"></div>`;
            } else if (blockType === "S") {
                div_blocks += `<div class="block" id="start" data-column="${colNum}" data-row="${rowNum}"></div>`;

                gloRowNum = rowNum;
                gloColNum = colNum;
            } else {
                div_blocks += `<div class="block" data-column="${colNum}" data-row="${rowNum}"></div>`;
            }
        }
        maze_element.innerHTML += `<div class="row">${div_blocks}</div>`;
    }

    let box = document.createElement("div")
    box.id = "box";
    document.getElementById("start").appendChild(box);


    document.addEventListener('keydown', logKey);

    function canMove(colNum, rowNum) {
        let block = document.querySelector(`[data-column="${colNum}"][data-row="${rowNum}"]`);
        console.log(block.classList.contains("wall"))
        if (block.classList.contains("wall") === false) {
            let box = document.getElementById("box");
            box.parentNode.removeChild(box);
            block.appendChild(box);

            gloColNum = colNum;
            gloRowNum = rowNum;
        }
    }

    function logKey(e) {
        // log.textContent += ` ${e.code}`;

        let rowNum = gloRowNum;
        let colNum = gloColNum;

        switch (e.code) {
            case "ArrowUp":
                rowNum--
                break;

            case "ArrowDown":
                rowNum++
                break;

            case "ArrowLeft":
                colNum--
                break;

            case "ArrowRight":
                colNum++
                break;

        }
        canMove(colNum, rowNum)
    }

}
createMaze(map);
