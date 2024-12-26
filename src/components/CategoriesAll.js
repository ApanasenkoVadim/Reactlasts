import React from "react";
import Categories from "./Categories";

const AllCategoriesPage = () => {
  return (
    <div style={{ padding: "40px" }}>
      <Categories showAll={true} />
    </div>
  );
};

export default AllCategoriesPage;
