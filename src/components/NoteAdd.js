import React from 'react'
import {useHistory} from "react-router-dom";
import Navigation from "./Navigation";

const NoteAdd = (props) => {

    const history = useHistory();

    const onFormSubmit = (e) => {
        e.preventDefault();
        const newNote = {
            "classId": e.target.classID.value,
            "title": e.target.title.value,
            "description": e.target.description.value
        };

        props.onNewTermAdded(newNote);
        history.push("/" + newNote.classId + "/notes");
    };


    return (
      <div className="w-card-4 p-4 p-md-5 pt-5">
          <h3 className="mb-5">Full name of the class{}</h3>
          <Navigation/>

          <div className="card card-warning">
              <div className="card-body">
                  <form onSubmit={onFormSubmit}>
                      <div className="">
                          {/*// <!-- text input -->*/}
                          <div className="form-group">
                              <label>Class ID</label>
                              <input type="text" name={"classID"} className="form-control" placeholder="Enter ..."
                              />
                          </div>
                      </div>

                      <div className="">
                          {/*// <!-- text input -->*/}
                          <div className="form-group">
                              <label>Title</label>
                              <input type="text" name={"title"} className="form-control" placeholder="Enter ..."
                                     />
                          </div>
                      </div>
                      <div className="">
                          {/*// <!-- textarea -->*/}
                          <div className="form-group">
                              <label>Description</label>
                              <textarea name={"description"} className="form-control" rows="10"/>
                          </div>
                      </div>
                      <hr/>
                      <div>
                          <button type="submit" className="btn btn-light">Submit</button>
                          <button type="submit" className="btn btn-light float-right">Cancel</button>
                      </div>

                  </form>
              </div>
          </div>
      </div>
  )
};

export default NoteAdd