import React, { Component } from 'react';
import Node from './Node/Node';
import {
  START_NODE_COL,
  START_NODE_ROW,
  FINISH_NODE_COL,
  FINISH_NODE_ROW
} from './../common/constants';
import {
  dijkstra,
  getNodesInShortestPathOrder
} from '../algorithms/dijkstra';
import {
  getInitialGrid,
  getNewGridWithWallToggled,
} from '../common/gridUtilities';

import './PathfindingVisualizer.css';

export default class PathfindingVisualizer extends Component {
  state = {
    grid: [],
    dijkstraIsProcessing: false,
    mouseIsPressed: false,
  };

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleMouseDown = (e, row, col) => {
    console.log("PathFindingVisualier hanldeMouseDown => ", { row, col });
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter = (row, col) => {
    const { mouseIsPressed, grid } = this.state;
    if (!mouseIsPressed) return;
    this.setState({
      grid: getNewGridWithWallToggled(grid, row, col),
    });
  }

  handleMouseUp = (e) => {
    console.log("PathFindingVisualier hanldeMouseUp => ", e);
    this.setState({ mouseIsPressed: false });
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {

    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        //=> refactor        
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;

      }

      //=> refactor      
      setTimeout(() => {
        const nodeClass = 'node';
        const visitedClass = `${nodeClass}-visited`;
        const startPulseClass = `${nodeClass}-pulse-start`;
        const finishPulseClass = `${nodeClass}-pulse-finish`;

        const node = visitedNodesInOrder[i];
        document.getElementById(`${nodeClass}-${node.row}-${node.col}`).className =
          (i === 0)
            ? `${nodeClass} ${startPulseClass}`
            //TODO: verify this....
            : (i === visitedNodesInOrder.length - 1)
              ? `${nodeClass} ${finishPulseClass}`
              : `${nodeClass} ${visitedClass}`;
      }, 10 * i);
    }

  }

  animateShortestPath(nodesInShortestPathOrder) {
    const nodeClass = 'node';
    const shortestPathClass = `${nodeClass}-shortest-path`;
    const startPulseClass = `${nodeClass}-pulse-start`;
    const finishPulseClass = `${nodeClass}-pulse-finish`;

    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {

      //=> refactor
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`${nodeClass}-${node.row}-${node.col}`).className =
          (i === 0)
            ? `${nodeClass} ${startPulseClass}`
            : (i === nodesInShortestPathOrder.length - 1)
              ? `${nodeClass} ${finishPulseClass}`
              : `${nodeClass} ${shortestPathClass}`;
      }, 50 * i);

    }
  }

  visualizeDijkstra() {
    const { dijkstraIsProcessing, grid } = this.state;
    this.setState({
      dijkstraIsProcessing: true,
    },
      () => {
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
      });

  }

  render() {
    const {
      grid,
      mouseIsPressed,
      dijkstraIsProcessing
    } = this.state;
    return (
      <div>
        {
          //TODO:
          //======
          // create inputs for start/finish nodes
          //
        }
        <button onClick={() => this.visualizeDijkstra()}>
          Visualize Dijkstra's Algorithm
        </button>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      dijkstraIsProcessing={dijkstraIsProcessing}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={this.handleMouseDown}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={this.handleMouseUp}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
