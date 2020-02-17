import React, { Component } from 'react';
import './Node.css';
export default class Node extends Component {
  render() {
    const {
      col,
      isFinish,
      isStart,
      isWall,
      dijkstraIsProcessing,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      row,
    } = this.props;

    //=> refactor 
    const extraClassName =
      (dijkstraIsProcessing && isFinish)
        ? 'node-pulse-finish'
        : (dijkstraIsProcessing && isStart)
          ? 'node-pulse-start'
          : isFinish
            ? 'node-finish'
            : isStart
              ? 'node-start'
              : isWall
                ? 'node-wall'
                : '';
    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={(e) => onMouseDown(e, row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={(e) => onMouseUp(e)}></div>
    );
  }
}
