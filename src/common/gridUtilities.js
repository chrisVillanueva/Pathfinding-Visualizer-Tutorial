//NOTE:
//underlying data structures (Grid, Node)
//and functions to maipulate them are candidates
//for redux selectors/actions

import {
    MAX_COLS,
    MAX_ROWS,
    START_NODE_COL,
    START_NODE_ROW,
    FINISH_NODE_COL,
    FINISH_NODE_ROW,
} from './constants';

export const getInitialGrid = () => {
    const grid = [];
    //TODO:
    //======
    //initial values should be adjusted for screensize.
    for (let row = 0; row < MAX_ROWS; row++) {
        const currentRow = [];
        for (let col = 0; col < MAX_COLS; col++) {
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    return grid;
};

export const createNode = (col, row) => {
    return {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
    };
};

export const getNewGridWithWallToggled = (grid, row, col) => {
    const nextGrid = [...grid];
    nextGrid[row][col] = {
        ...grid[row][col],
        isWall: !grid[row][col].isWall
    };
    return nextGrid;
};
