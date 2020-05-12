import _ from "lodash";
export function pagination(items, currentPage, pageSize) {
  const start = (currentPage - 1) * pageSize;
  return _(items).slice(start).take(pageSize).value();
}
