// SearchComponent.js
import React from "react";

const SearchComponent = ({ searchList }) => {
  return (
    <div style={{display:'flex',justifyContent:'right'}}>
 <div className="search-box abc">
      <input
        type="text"
        id="searchTaskList"
        className="form-control search anc"
        placeholder="Search"
        onKeyUp={(e) => searchList(e.target.value)}
      />
      <i className="ri-search-line search-icon"></i>
    </div>
    </div>
   
  );
};

export default SearchComponent;