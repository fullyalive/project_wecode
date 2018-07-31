import React from "react";

const RenderForm = props => (
  <form onSubmit={props.onFormSubmit}>
    {console.log(props)}
    <h1>File Upload</h1>
    <input type="file" onChange={props.onChange} />
    <button type="submit">Upload</button>
  </form>
);

export default RenderForm;
