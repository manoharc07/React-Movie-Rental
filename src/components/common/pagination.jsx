/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import _ from "lodash";
import "bootstrap/dist/css/bootstrap.css";
import { number, func } from "prop-types";
const Pagination = (props) => {
  const itemsPerPage = props.pageSize;
  const totalPages = Math.ceil(props.count / itemsPerPage);
  const pages = _.range(1, totalPages + 1);
  if (totalPages <= 1) return null;
  return (
    <ul className="pagination">
      {pages.map((i) => {
        return (
          <li
            key={i}
            className={
              i === props.currentPage ? "page-item active" : "page-item "
            }
          >
            <a onClick={() => props.ChangePage(i)} className="page-link">
              {i}
            </a>
          </li>
        );
      })}
    </ul>
  );
};
Pagination.propTypes = {
  count: number.isRequired,
  currentPage: number.isRequired,
  pageSize: number.isRequired,
  ChangePage: func.isRequired,
};
export default Pagination;
