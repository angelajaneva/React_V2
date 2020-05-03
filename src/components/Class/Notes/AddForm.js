import React from 'react'
import ValidForm from "react-valid-form-component";

const AddForm = (props) => {

    return (

        <ValidForm nosubmit
                   onSubmit={props.saveNote}
        >
            <div className={"form-group"}>
                <label className="font-weight-bold">Title</label>
                <input type={"text"}
                       name="title"
                       id="title"
                       className={"form-control"}
                       placeholder={"Enter title"}
                       value={props.title}
                       onChange={(e) => props.setTitle(e.target.value)}
                       maxLength="1000"
                />
            </div>
            <div className={"form-group"}>
                <label className="font-weight-bold">Description</label>
                <textarea rows={"5"}
                          name="notes-description"
                          id="notes-description"
                          className={"form-control"}
                          placeholder={"Enter description for your note"}
                          value={props.description}
                          onChange={(e) => props.setDescription(e.target.value)}
                          required
                          maxLength="5000"
                          minLength="10"
                />
            </div>
            <div className={"form-group text-right"}>
                <button className={"btn btn-primary mr-1"}
                        onClick={() => props.openNote(null, false, false)}
                        type="button"
                >
                    Close
                </button>
                <button className={"btn btn-primary"}
                        type="submit"
                    // onClick={saveNote}
                >
                    Save
                </button>
            </div>
        </ValidForm>
    )
};

export default AddForm;