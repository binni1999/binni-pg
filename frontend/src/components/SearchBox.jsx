import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const SearchBox = ({ searchType, holder, link }) => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || "");
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      setKeyword("");
      navigate(`/admin/${searchType}/search/${keyword}`);
    } else {
      navigate(link);
    }
  };
  const placeholder = `Search ${holder}`;
  return (
    <Form onSubmit={submitHandler} className="d-flex searchBoxClass">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder={placeholder}
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button
        type="submit"
        variant="outline-light"
        className="p-2 mx-2 admin-button"
      >
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
