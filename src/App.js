import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./components/navbar";
import React, { Component } from "react";

import axios from "axios";
import Doctors from "./components/doctors";
import Patient from "./components/patient";

class App extends Component {
  state = {
    doctors: [],
    patient: {},
    currentDoctorId: 0,
    currentAilment: "",
    patients:{},
    intakeform:{},
  };

  componentDidMount() {
    
    axios.get("https://localhost:5001/Doctors").then((responce) => {
      this.setState({ doctors: responce.data });
      this.setState({ currentDoctorId: this.state.doctors[0].id });
    });
  }
  
  handleCurrentDoctor = (event) => {
    console.log(event.target.value);
    this.setState({ currentDoctorId: event.target.value });
  };

  handleCurrentPatient = (event) => {
    console.log(event);
    this.setState({ patient: event });
  };
  handleAiment = (e) => {
    // console.log(e.target.value);
    this.setState({ currentAilment: e.target.value });
  };

  AddNewIntake = async () => {
    let intakeform = Object.assign(
      {
        doctorId: this.state.currentDoctorId,
        patientId: this.state.patient.id,
        ailment: this.state.currentAilment,
      },
      this.state.intakeform
    );
    console.log(intakeform);
    console.log("this.state.intakeform", this.state.intakeform);
    axios
      .post("https://localhost:5001/IntakeForms", intakeform)
      .then((response) => {
        this.setState({ intakeform: response.data });
        console.log("POST : ", response);
      });
  };


  render() {
    return (
      <React.Fragment>
        <NavBar>Doctor's office</NavBar>
        <main className="container">
           <p>
            Current Doctor ID: &nbsp;
            {this.state.currentDoctorId} <br />
            Current Patient ID: &nbsp;
            {this.state.patient.id} <br />
            Current Ailment text: &nbsp;
            {this.state.currentAilment}
            <br />
          </p>
          <Doctors
            doctors={this.state.doctors}
            onCurrentDoctor={this.handleCurrentDoctor}
          ></Doctors>
          <hr />
          <Patient onCurrentPatient={this.handleCurrentPatient}></Patient>
          <hr />
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Aiment:
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              onChange={this.handleAiment}
            ></textarea>
          </div>
          <button
          type="button"
            className="btn btn-success m-2"
            disabled={
              this.state.currentDoctorId === undefined ||
              this.state.patient.healthNumber === undefined ||
              this.state.currentAilment === ""
            }
            onClick={this.AddNewIntake}
          >
            Add Intake
          </button>
        </main>
      </React.Fragment>

    );
  }
}

export default App;

