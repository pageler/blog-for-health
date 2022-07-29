import React from "react";

export interface INewBlogProps {}

const NewBlog: React.FunctionComponent<INewBlogProps> = (props) => {
    return (
        <div>
            <h1>New Blog Component</h1>
        </div>
    );
};

export default NewBlog;
