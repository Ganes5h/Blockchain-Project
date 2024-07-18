import React from "react";
import "./NewLogin.css";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
const NewRegister = () => {
  return (
    <>
      <div>
        <Box display="flex" justifyContent="flex-end">
          <Box
            width="100%"
            height="50px"
            //   border="1px solid red"
            // borderRadius="50px"
            display="flex"
            alignItems="center"
            justifyContent="end"
            padding="10px"
            position="absolute"
            zIndex={100}
            top="10px"
            left="0"
          >
            <Link to="/">
              <Button
                variant="contained"
                sx={{
                  borderRadius: "50px",
                  marginTop: "15px",
                  backgroundColor: "white",
                  color: "black",
                  "&:hover": {
                    color: "white",
                  },
                }}
              >
                <HomeIcon />
              </Button>
            </Link>
            {/* Rounded Button using MUI */}
            <Link to="/login">
              <Button
                variant="contained"
                //   color="success"
                sx={{
                  borderRadius: "50px",
                  marginTop: "15px",
                  marginLeft: "8px",
                  width: "110px",
                  marginTop: "15px",
                  backgroundColor: "white",
                  color: "black",
                  borderRadius: "40px",
                  "&:hover": {
                    color: "white", // Change text color to white on hover
                  },
                }}
              >
                Login
              </Button>
            </Link>
          </Box>
        </Box>
      </div>
      <section>
        <div className="login-box" style={{ width: "600px", padding: "20px" }}>
          <form>
            <h2>Register</h2>
            <Link to="/government_register">
              <Button
                variant="contained"
                // color="success"
                fullWidth
                sx={{
                  mt: 6,
                  height: "40px",
                  borderRadius: "20px",
                  backgroundColor: "#1C8ADB",
                }}
              >
                Governement Registration
              </Button>
            </Link>
            <Link to="/student_register">
              <Button
                variant="contained"
                // color="success"
                fullWidth
                sx={{
                  mt: 6,
                  height: "40px",
                  borderRadius: "20px",
                  backgroundColor: "#1C8ADB",
                }}
              >
                Student Registration
              </Button>
            </Link>
            <Link to="/institute_register">
              <Button
                variant="contained"
                // color="success"
                fullWidth
                sx={{
                  mt: 6,
                  height: "40px",
                  borderRadius: "20px",
                  backgroundColor: "#1C8ADB",
                }}
              >
                Institute Registration
              </Button>
            </Link>
            <Link to="/industry_register">
              <Button
                variant="contained"
                // color="success"
                fullWidth
                sx={{
                  mt: 6,
                  height: "40px",
                  borderRadius: "20px",
                  backgroundColor: "#1C8ADB",
                }}
              >
                Industry Registration
              </Button>
            </Link>
          </form>
        </div>
      </section>
    </>
  );
};

export default NewRegister;

// import React, { useState } from "react";
// import EmailIcon from "@mui/icons-material/Email";
// import LockIcon from "@mui/icons-material/Lock";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import TextField from "@mui/material/TextField";
// import InputAdornment from "@mui/material/InputAdornment";
// import { Link } from "react-router-dom";
// import { Box } from "@mui/material";

// const NewRegister = () => {
//   const [step, setStep] = useState(1); // State to track the current step of the form

//   const handleNextStep = () => {
//     if (step < 2) setStep(step + 1);
//   };

//   const handlePreviousStep = () => {
//     if (step > 1) setStep(step - 1);
//   };

//   return (
//     <>
//       <div>
//         <Box display="flex" justifyContent="flex-end">
//           <Box
//             width="100%"
//             height="50px"
//             display="flex"
//             alignItems="center"
//             justifyContent="end"
//             padding="10px"
//             position="absolute"
//             zIndex={100}
//             top="10px"
//             left="0"
//           >
//             <Link to="/login">
//               <Button variant="contained">Login</Button>
//             </Link>
//             <Link to="/register">
//               <Button variant="contained">Register</Button>
//             </Link>
//           </Box>
//         </Box>
//       </div>
//       <section>
//         <div
//           className="login-box"
//           style={{ width: "600px", padding: "20px", position: "relative" }}
//         >
//           <form>
//             {/* Step 1: First set of fields */}
//             {step === 1 && (
//               <>
//                 <h2>Register</h2>
//                 {/* Field 1 */}
//                 <TextField
//                   fullWidth
//                   margin="normal"
//                   placeholder="Email"
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <EmailIcon style={{ color: "white" }} />
//                       </InputAdornment>
//                     ),
//                     style: { backgroundColor: "white" },
//                   }}
//                 />
//                 {/* Field 2 */}
//                 <TextField
//                   fullWidth
//                   margin="normal"
//                   type="password"
//                   placeholder="Password"
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <LockIcon style={{ color: "white" }} />
//                       </InputAdornment>
//                     ),
//                     style: { backgroundColor: "white" },
//                   }}
//                 />
//                 {/* Field 3 */}
//                 <TextField
//                   fullWidth
//                   margin="normal"
//                   type="password"
//                   placeholder="Confirm Password"
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <LockIcon style={{ color: "white" }} />
//                       </InputAdornment>
//                     ),
//                     style: { backgroundColor: "white" },
//                   }}
//                 />
//                 {/* Field 4 */}
//                 <TextField
//                   fullWidth
//                   margin="normal"
//                   placeholder="Field 4"
//                   InputProps={{
//                     style: { backgroundColor: "white" },
//                   }}
//                 />
//                 {/* Field 5 */}
//                 <TextField
//                   fullWidth
//                   margin="normal"
//                   placeholder="Field 5"
//                   InputProps={{
//                     style: { backgroundColor: "white" },
//                   }}
//                 />
//               </>
//             )}

//             {/* Step 2: Second set of fields */}
//             {step === 2 && (
//               <>
//                 <h2>Register</h2>
//                 {/* Field 6 */}
//                 <TextField
//                   fullWidth
//                   margin="normal"
//                   placeholder="Field 6"
//                   InputProps={{
//                     style: { backgroundColor: "white" },
//                   }}
//                 />
//                 {/* Field 7 */}
//                 <TextField
//                   fullWidth
//                   margin="normal"
//                   placeholder="Field 7"
//                   InputProps={{
//                     style: { backgroundColor: "white" },
//                   }}
//                 />
//                 {/* Field 8 */}
//                 <TextField
//                   fullWidth
//                   margin="normal"
//                   placeholder="Field 8"
//                   InputProps={{
//                     style: { backgroundColor: "white" },
//                   }}
//                 />
//                 {/* Field 9 */}
//                 <TextField
//                   fullWidth
//                   margin="normal"
//                   placeholder="Field 9"
//                   InputProps={{
//                     style: { backgroundColor: "white" },
//                   }}
//                 />
//                 {/* Field 10 */}
//                 <TextField
//                   fullWidth
//                   margin="normal"
//                   placeholder="Field 10"
//                   InputProps={{
//                     style: { backgroundColor: "white" },
//                   }}
//                 />
//                 <Button
//                   variant="contained"
//                   type="submit"
//                   style={{ marginTop: "20px" }}
//                 >
//                   Submit
//                 </Button>
//               </>
//             )}

//             <Box
//               display="flex"
//               justifyContent={step === 2 ? "flex-start" : "space-between"}
//               position="absolute"
//               bottom="10px"
//               width="100%"
//               padding="0 20px"
//             >
//               <IconButton
//                 onClick={handlePreviousStep}
//                 disabled={step === 1}
//                 style={{
//                   backgroundColor: "#3f51b5",
//                   color: "white",
//                   width: "50px",
//                   height: "50px",
//                 }}
//               >
//                 <ArrowBackIcon />
//               </IconButton>
//               {step === 1 && (
//                 <IconButton
//                   onClick={handleNextStep}
//                   disabled={step === 2}
//                   style={{
//                     backgroundColor: "#3f51b5",
//                     color: "white",
//                     width: "50px",
//                     height: "50px",
//                   }}
//                 >
//                   <ArrowForwardIcon />
//                 </IconButton>
//               )}
//             </Box>
//           </form>
//         </div>
//       </section>
//     </>
//   );
// };

// export default NewRegister;
