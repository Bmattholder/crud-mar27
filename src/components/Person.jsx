import React, { Fragment, useState } from "react";
import axios from "axios";

import "./Person.css";

function Person({ id, firstName, lastName, address, setToggleHelper }) {
  const [editState, setEditState] = useState(false);
  const [editPerson, setEditPerson] = useState({
    praenomens: [firstName],
    cognomen: lastName,
    number: address.number,
    street: address.street,
    city: address.city,
    state: address.state,
    zip: address.zip,
  });

  const resetState = () => {
    setEditPerson({
      praenomens: [firstName],
      cognomen: lastName,
      number: address.number,
      street: address.street,
      city: address.city,
      state: address.state,
      zip: address.zip,
    });
  };

  const { praenomens, cognomen, number, street, city, state, zip } = editPerson;

  const url = `http://localhost:8080/api/v1/people/`;

  const onChange = (e) => {
    if (e.target.name === "praenomens") {
      setEditPerson((p) => ({
        ...p,
        [e.target.name]: e.target.value.split(),
      }));
    } else {
      setEditPerson((p) => ({
        ...p,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const onSubmit = async (e, id) => {
    e.preventDefault();
    const res = await axios.patch(url + id, editPerson);
    console.log(res);
    setToggleHelper();
    editStateHelper();
  };

  const editStateHelper = () => {
    setEditState(!editState);
    resetState();
  };

  const onDelete = async (id) => {
    const res = await axios.delete(url + id);
    console.log(res);
    setToggleHelper();
  };

  return (
    <Fragment>
      {!editState ? (
        <div className="card">
          <h3>
            {id}: {firstName} {lastName}
          </h3>
          <p>
            {address.number} {address.street} {address.city} {address.state}{" "}
            {address.zip}
          </p>
          <button onClick={editStateHelper}>Edit</button>
          <button className="delete" onClick={() => onDelete(id)}>
            Delete
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="card">
          <div>
            <input
              type="text"
              name="praenomens"
              id="praenomens"
              value={praenomens}
              onChange={onChange}
              placeholder="Praenomens"
            />
          </div>
          <div>
            <input
              type="text"
              name="cognomen"
              id="cognomen"
              value={cognomen}
              onChange={onChange}
              placeholder="Cognomen"
            />
          </div>
          <div>
            <input
              type="text"
              name="number"
              id="number"
              value={number}
              onChange={onChange}
              placeholder="Number"
            />
          </div>
          <div>
            <input
              type="text"
              name="street"
              id="street"
              value={street}
              onChange={onChange}
              placeholder="Street"
            />
          </div>
          <div>
            <input
              type="text"
              name="city"
              id="city"
              value={city}
              onChange={onChange}
              placeholder="City"
            />
          </div>
          <div>
            <input
              type="text"
              name="state"
              id="state"
              value={state}
              onChange={onChange}
              placeholder="State"
            />
          </div>
          <div>
            <input
              type="text"
              name="zip"
              id="zip"
              value={zip}
              onChange={onChange}
              placeholder="Zip"
            />
          </div>
          <button onClick={(e) => onSubmit(e, id)}>Submit Edit</button>
          <button onClick={editStateHelper}>Cancel</button>
        </form>
      )}
    </Fragment>
  );
}

export default Person;
