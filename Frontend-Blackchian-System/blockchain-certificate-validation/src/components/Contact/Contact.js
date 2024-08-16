// // components/ContactForm.js

// import React, { useState } from "react";
// import { TextField, Button, Typography, Container } from "@mui/material";
// import axios from "axios";
// import { toast } from "sonner"; // Using Sonner for notifications

// const ContactForm = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);

//     try {
//       const response = await axios.post(
//         "http://localhost:4000/api/contact/send-mail",
//         {
//           name,
//           email,
//           message,
//         }
//       );
//       toast.success("Message sent successfully!");
//       setName("");
//       setEmail("");
//       setMessage("");
//     } catch (error) {
//       toast.error("Failed to send message. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Typography variant="h4" gutterBottom>
//         Contact Us
//       </Typography>
//       <form onSubmit={handleSubmit} noValidate>
//         <TextField
//           label="Name"
//           fullWidth
//           margin="normal"
//           variant="outlined"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <TextField
//           label="Email"
//           fullWidth
//           margin="normal"
//           variant="outlined"
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <TextField
//           label="Message"
//           fullWidth
//           margin="normal"
//           variant="outlined"
//           multiline
//           rows={4}
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           required
//         />
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           disabled={loading}
//           sx={{ mt: 2 }}
//         >
//           {loading ? "Sending..." : "Send Message"}
//         </Button>
//       </form>
//     </Container>
//   );
// };

// export default ContactForm;

import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./ContactForm.css"; // Make sure this path matches your CSS file location
import Footer from "../Footer/Footer";
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/contact/send-mail",
        formData
      );
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: response.data.message,
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.error || "Failed to send email",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <span className="big-circle"></span>
      <img src="img/shape.png" className="square" alt="" /> */}
        <div className="form">
          <div className="contact-info">
            <h3 className="title">Let's get in touch</h3>
            <p className="text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
              dolorum adipisci recusandae praesentium dicta!
            </p>
            <div className="info">
              <div className="information">
                <i className="fas fa-map-marker-alt"></i> &nbsp; &nbsp;
                <p>92 Cherry Drive Uniondale, NY 11553</p>
              </div>
              <div className="information">
                <i className="fas fa-envelope"></i> &nbsp; &nbsp;
                <p>lorem@ipsum.com</p>
              </div>
              <div className="information">
                <i className="fas fa-phone"></i>&nbsp; &nbsp;
                <p>123-456-789</p>
              </div>
            </div>
            <div className="social-media">
              <p>Connect with us :</p>
              <div className="social-icons">
                <a href="#">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <span className="big-circle"></span>
            </div>
          </div>

          <div className="contact-form">
            <span className="circle one"></span>
            <span className="circle two"></span>
            <form onSubmit={handleSubmit} autoComplete="off">
              <h3 className="title">Contact us</h3>
              <div className="input-container">
                <input
                  type="text"
                  name="name"
                  className="input"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Username"
                />
                {/* <label htmlFor="">Username</label>
              <span>Username</span> */}
              </div>
              <div className="input-container">
                <input
                  type="email"
                  name="email"
                  className="input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email"
                />
                {/* <label htmlFor="">Email</label>
              <span>Email</span> */}
              </div>
              <div className="input-container textarea">
                <textarea
                  name="message"
                  className="input"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Message"
                ></textarea>
                {/* <label htmlFor="">Message</label>
              <span>Message</span> */}
              </div>
              <input type="submit" value="Send" className="btn" />
              {loading && (
                <div className="loader">
                  {/* Loader styling can be added to CSS */}
                  <div className="spinner"></div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactForm;
