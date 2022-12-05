import React from "react";

const Category = ({name}) => {
  return (
    <div className="col-lg-6 mb-4">
      <div className="card bg-dark text-white shadow">
        <div className="card-body">{name}</div>
      </div>
    </div>
  );
};

export default Category;
