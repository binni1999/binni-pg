import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const Paginate = ({ pages, page, path, keyword = "" }) => {
  return (
    pages > 1 && (
      <Pagination className="pagination-sm-custom">
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              keyword
                ? `/admin/${path}/search/${keyword}/page/${x + 1}`
                : `/admin/${path}/page/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
