import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux"
import RegsterImage from "./images/purple.jpg"
import { yupResolver } from "@hookform/resolvers/yup"
import { register, useForm } from "react-hook-form"
import { RegisterDataThunk } from "../features/slice.js"
import regValidation from "../Validation/validation.js";
import "./Login.css";

export default function Register() {


  //UPDATED




  const [firstName, setFirstName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [modal, setModal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const toggle = () => setModal(!modal);

  const handleCloseModal = () => {
    toggle();
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const newUserRegisterData = {

      _username: firstName,
      _email: email,
      _password: password

    }

    try {
      const resultAction = await dispatch(RegisterDataThunk(newUserRegisterData));
      if (RegisterDataThunk.fulfilled.match(resultAction)) {
        setModal(true);
      } else {
        console.error("Registration failed:", resultAction.payload || resultAction.error);
      }
    } catch (err) {
      console.error("Unexpected error during registration:", err);
    }

    // Save to localStorage
    //navigate to inspect>Application>LocalStorage>Click the dropdown List



    // Navigate to home
    // navigate("/"); // Moved to handleCloseModal
  };



  //   const { register, handleSubmit: handleRegister, formState: { errors } } = useForm(
  //     {
  //         resolver: yupResolver(regValidation)
  //     }
  // )

  return (
    <div className="login-page d-flex align-items-center justify-content-center">
      <div className="login-card shadow-lg rounded overflow-hidden row">

        {/* Left Image */}
        <div className="col-md-6 d-none d-md-block p-0">
          <img
            src={RegsterImage}
            alt="Registration visual"
            className="img-fluid w-100 h-100"
            style={{ objectFit: "cover", height: "100%" }}
          />
        </div>

        {/* Right Form */}
        <div className="col-md-6 p-5 bg-white d-flex flex-column justify-content-center">
          <div className="form-wrapper">
            <h2 className="text-center mb-4">Registration</h2>

            <Form onSubmit={handleSubmit}>

              <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input
                  type="text"
                  placeholder=""
                  onChange={(e) => setFirstName(e.target.value)} />

              </FormGroup>





              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder=""
                  onChange={(e) => setEmail(e.target.value)}
                />

              </FormGroup>

              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder=""
                  onChange={(e) => setPassword(e.target.value)}
                />

              </FormGroup>



              <Button type="submit" color="primary" block className="mb-3">
                Register
              </Button>

              <div className="text-center">
                <span>Already have an account? </span>
                <a href="/" className="signup-link">
                  Login
                </a>
              </div>
            </Form>

          </div>
        </div>

        {/* Success Modal */}
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Registration Successful</ModalHeader>
          <ModalBody>
            You have successfully registered!
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleCloseModal}>
              OK
            </Button>
          </ModalFooter>
        </Modal>

      </div>
    </div>
  );
}
