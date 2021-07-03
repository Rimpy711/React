import React, { Component } from "react";

import axios from "axios";

class Patient extends Component {
  state = {
    patient: {},
    isCreate: false,
  };

  handleId = (id) => {
    axios.get("https://localhost:5001/Patients/" + id).then((response) => {
      this.setState({ patient: response.data === "" ? {} : response.data });
      this.props.onCurrentPatient(response.data);
      this.setState({ isCreate: response.data.name !== undefined });
    });
  };

  UpdatePatient = () => {
    let patient = Object.assign({}, this.state.patient);

    axios
      .put("https://localhost:5001/Patients/" + this.state.patient.id, patient)
      .then((responce) => {
        console.log("PUT : ", responce);
      });
  };

  AddNewPatient = () => {
    let patient = Object.assign({}, this.state.patient);

    axios.post("https://localhost:5001/Patients", patient).then((responce) => {
      this.props.onCurrentPatient(patient);
      console.log("POST : ", responce);
    });
  };

  render() {
    return (
      <React.Fragment>
        Search Id:
        <input
          className="form-control m-2"
          type="text"
          placeholder="Search by Id"
          onBlur={(e) => this.handleId(e.target.value)}
        ></input>
        Health Number:
        <input
          className="form-control m-2"
          type="text"
          placeholder="Health Number"
          value={this.state.patient.healthNumber || ""}
          onChange={(e) =>
            this.setState((prevState) => {
              let patient = Object.assign({}, prevState.patient);
              patient.healthNumber = e.target.value;
              return { patient };
            })
          }
        ></input>
        Patient Name:
        <input
          className="form-control m-2"
          type="text"
          placeholder="Name"
          value={this.state.patient.name || ""}
          onChange={(e) =>
            this.setState((prevState) => {
              let patient = Object.assign({}, prevState.patient);
              patient.name = e.target.value;
              return { patient };
            })
          }
        ></input>
        Date Of Birth:
        <input
          className="form-control m-2"
          type="date"
          placeholder="Date of Birth"
          value={this.state.patient.dateOfBirth || ""}
          onChange={(e) =>
            this.setState((prevState) => {
              let patient = Object.assign({}, prevState.patient);
              patient.dateOfBirth = e.target.value;
              return { patient };
            })
          }
        ></input>
        Phone Number:
        <input
          className="form-control m-2"
          type="text"
          placeholder="Phone Number"
          value={this.state.patient.phoneNumber || ""}
          onChange={(e) =>
            this.setState((prevState) => {
              let patient = Object.assign({}, prevState.patient);
              patient.phoneNumber = e.target.value;
              return { patient };
            })
          }
        ></input>
        Address:
        <input
          className="form-control m-2"
          type="text"
          placeholder="Address"
          value={this.state.patient.address || ""}
          onChange={(e) =>
            this.setState((prevState) => {
              let patient = Object.assign({}, prevState.patient);
              patient.address = e.target.value;
              return { patient };
            })
          }
        ></input>
        <button
          type="button"
          className="btn btn-success  m-2"
          disabled={this.state.isCreate}
          onClick={this.AddNewPatient}
        >
          Add New Patient
        </button>
        <button
          type="button"
          class="btn btn-warning m-2"
          disabled={!this.state.isCreate}
          onClick={this.UpdatePatient}
        >
          Update Patient
        </button>
      </React.Fragment>
    );
  }
}

export default Patient;
