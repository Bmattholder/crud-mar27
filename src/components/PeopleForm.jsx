import React, { Fragment, useState } from "react";
import axios from "axios";
import ListOPeople from "./ListOPeople";

import "./PeopleForm.css";

function PeopleForm(props) {
  const [toggle, setToggle] = useState(false);
  const [formData, setFormData] = useState({
    praenomens: [""],
    cognomen: "",
    number: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const { praenomens, cognomen, number, street, city, state, zip } = formData;

  const resetState = () => {
    setFormData({
      praenomens: [""],
      cognomen: "",
      number: "",
      street: "",
      city: "",
      state: "",
      zip: "",
    });
  };

  const setToggleHelper = () => {
    setToggle(!toggle);
  };

  const onChange = (e) => {
    if (e.target.name === "praenomens") {
      setFormData((p) => ({
        ...p,
        [e.target.name]: e.target.value.split(),
      }));
    } else {
      setFormData((p) => ({
        ...p,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:8080/api/v1/people",
      formData
    );
    console.log(res);
    setToggleHelper();
    resetState();
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit} className="people-form">
        <div>
          <input
            id="praenomens"
            className="people-input"
            type="text"
            name="praenomens"
            value={praenomens}
            onChange={onChange}
            placeholder="Praenomens"
            required
          />
        </div>
        <div>
          <input
            type="text"
            className="people-input"
            name="cognomen"
            id="cognomen"
            value={cognomen}
            onChange={onChange}
            placeholder="Cognomen"
            required
          />
        </div>
        <div>
          <input
            type="text"
            className="people-input"
            name="number"
            id="number"
            value={number}
            onChange={onChange}
            placeholder="Number"
            required
          />
        </div>
        <div>
          <input
            type="text"
            className="people-input"
            name="street"
            id="street"
            value={street}
            onChange={onChange}
            placeholder="Street"
            required
          />
        </div>
        <div>
          <input
            type="text"
            className="people-input"
            name="city"
            id="city"
            value={city}
            onChange={onChange}
            placeholder="City"
            required
          />
        </div>
        <div>
          <input
            type="text"
            className="people-input"
            name="state"
            id="state"
            value={state}
            onChange={onChange}
            placeholder="State"
            required
          />
        </div>
        <div>
          <input
            type="text"
            className="people-input"
            name="zip"
            id="zip"
            value={zip}
            onChange={onChange}
            placeholder="Zip"
            required
          />
        </div>
        <button className="btn">Submit</button>
      </form>
      <ListOPeople setToggleHelper={setToggleHelper} toggle={toggle} />
    </Fragment>
  );
}

export default PeopleForm;
