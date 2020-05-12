import React, { Component } from "react";
class TableHeader extends Component {
  raiseSort(col) {
    let sortColumn = { ...this.props.sortColumn };
    if (sortColumn.col === col) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.col = col;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  }
  renderSortIcon = (column) => {
    if (column.col !== this.props.sortColumn.col || column.content) return null;
    if (this.props.sortColumn.order === "asc")
      return <i className="fa fa-sort-asc m-2"></i>;
    return <i className="fa fa-sort-desc m-2"></i>;
  };
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              className={column.col ? "clickable" : ""}
              key={column.col || column.key}
              onClick={() => this.raiseSort(column.col)}
            >
              {column.label}
              {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
