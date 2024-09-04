// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import Swal from "sweetalert2";
// import QrScanner from "react-qr-scanner";

// const Revoke = () => {
//   const [certificateHash, setCertificateHash] = useState("");
//   const scanResult = certificateHash;
//   const token = useSelector((state) => state.auth.token);

//   const swalWithBootstrapButtons = Swal.mixin({
//     customClass: {
//       confirmButton: "btn btn-success",
//       cancelButton: "btn btn-danger",
//     },
//     buttonsStyling: false,
//   });

//   const revokeCertificate = async (hash) => {
//     try {
//       if (!token) {
//         Swal.fire({
//           title: "Authentication Error",
//           text: "No authentication token found. Please log in.",
//           icon: "warning",
//         });
//         return;
//       }

//       swalWithBootstrapButtons
//         .fire({
//           title: "Are you sure?",
//           text: "You won't be able to revert this!",
//           icon: "warning",
//           showCancelButton: true,
//           confirmButtonText: "Yes, revoke it!",
//           cancelButtonText: "No, cancel!",
//           reverseButtons: true,
//         })
//         .then(async (result) => {
//           if (result.isConfirmed) {
//             try {
//               const response = await axios.post(
//                 `http://localhost:4000/api/certificates/revoke/${hash}`,
//                 {
//                   headers: {
//                     authorization: `Bearer ${token}`,
//                   },
//                 }
//               );
//               console.log(token, response);
//               if (response.status === 200) {
//                 swalWithBootstrapButtons.fire({
//                   title: "Revoked!",
//                   text: "The certificate has been revoked successfully.",
//                   icon: "success",
//                 });
//               } else {
//                 throw new Error("Failed to revoke the certificate.");
//               }
//             } catch (error) {
//               Swal.fire({
//                 title: "Revocation Error",
//                 text: `Failed to revoke certificate: ${error.message}`,
//                 icon: "error",
//               });
//             }
//           } else if (result.dismiss === Swal.DismissReason.cancel) {
//             swalWithBootstrapButtons.fire({
//               title: "Cancelled",
//               text: "The certificate is safe :)",
//               icon: "error",
//             });
//           }
//         });
//     } catch (error) {
//       Swal.fire({
//         title: "Error",
//         text: `An error occurred: ${error.message}`,
//         icon: "error",
//       });
//     }
//   };

//   const handleScan = (data) => {
//     if (data) {
//       setCertificateHash(data);
//       revokeCertificate(data);
//     }
//   };

//   const handleError = (err) => {
//     console.error(err);
//     Swal.fire({
//       title: "QR Scan Error",
//       text: "Failed to scan QR code. Please try again.",
//       icon: "error",
//     });
//   };

//   const handleManualSubmit = (e) => {
//     e.preventDefault();
//     if (certificateHash) {
//       revokeCertificate(certificateHash);
//     } else {
//       Swal.fire({
//         title: "Input Required",
//         text: "Please provide a certificate hash or scan a QR code.",
//         icon: "warning",
//       });
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h2>Revoke Certificate</h2>
//       <div style={{ display: "inline-block", margin: "20px auto" }}>
//         <QrScanner
//           delay={300}
//           style={{ width: "300px" }}
//           onError={handleError}
//           onScan={handleScan}
//         />
//       </div>
//       {scanResult && (
//         <p>
//           Scanned Result: <strong>{scanResult}</strong>
//         </p>
//       )}
//       <div style={{ marginTop: "30px" }}>
//         <h3>Or Enter Certificate Hash Manually</h3>
//         <form onSubmit={handleManualSubmit}>
//           <input
//             type="text"
//             value={certificateHash}
//             onChange={(e) => setCertificateHash(e.target.value)}
//             placeholder="Enter certificate hash"
//             style={{
//               padding: "10px",
//               width: "300px",
//               borderRadius: "5px",
//               border: "1px solid #ccc",
//             }}
//           />
//           <button
//             type="submit"
//             style={{
//               padding: "10px 20px",
//               marginLeft: "10px",
//               borderRadius: "5px",
//               border: "none",
//               backgroundColor: "#dc3545",
//               color: "#fff",
//               cursor: "pointer",
//             }}
//           >
//             Revoke
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Revoke;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import QrScanner from "react-qr-scanner";
import CelebrationGif from "../../Images/Celebration.gif";
import { useNavigate } from "react-router-dom";

const Revoke = () => {
  const [certificateHash, setCertificateHash] = useState("");
  const [scanResult, setScanResult] = useState("");
  const [manualResult, setManualResult] = useState("");
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const revokeCertificate = async (hash, source) => {
    try {
      if (!token) {
        Swal.fire({
          title: "Authentication Error",
          text: "No authentication token found. Please log in.",
          icon: "warning",
        });
        return;
      }

      swalWithBootstrapButtons
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, revoke it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            try {
              const response = await axios.post(
                `http://localhost:4000/api/certificates/revoke/${hash}`,
                {},
                {
                  headers: {
                    authorization: `Bearer ${token}`,
                  },
                }
              );

              if (response.status === 200) {
                swalWithBootstrapButtons.fire({
                  title: "Revoked!",
                  text: "The certificate has been revoked successfully.",
                  icon: "success",
                  background: `#fff url(${CelebrationGif})`,
                  backdrop: `
                    rgba(0,255,0,0.3)
                    url(${CelebrationGif})
                    left top
                    no-repeat
                    url(${CelebrationGif})
                    right top
                    no-repeat
                  `,
                });

                if (source === "scan") {
                  setScanResult("Revoked");
                } else {
                  setManualResult("Revoked");
                }
              } else {
                throw new Error("Failed to revoke the certificate.");
              }
            } catch (error) {
              Swal.fire({
                title: "Revocation Error",
                text: `Failed to revoke certificate: ${error.message}`,
                icon: "error",
              });

              if (source === "scan") {
                setScanResult("Revocation Error");
              } else {
                setManualResult("Revocation Error");
              }
            }
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
              title: "Cancelled",
              text: "The certificate is safe :)",
              icon: "error",
            });

            if (source === "scan") {
              setScanResult("Cancelled");
            } else {
              setManualResult("Cancelled");
            }
          }
        });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `An error occurred: ${error.message}`,
        icon: "error",
      });

      if (source === "scan") {
        setScanResult("Error");
      } else {
        setManualResult("Error");
      }
    }
  };

  const handleClick = () => {
    navigate("/govt-section");
  };

  const handleScan = (data) => {
    if (data) {
      setScanResult(data.text);
      revokeCertificate(data.text, "scan");
    }
  };

  const handleError = (err) => {
    console.error(err);
    Swal.fire({
      title: "QR Scan Error",
      text: "Failed to scan QR code. Please try again.",
      icon: "error",
    });
    setScanResult("Scan Error");
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (certificateHash) {
      setManualResult(certificateHash);
      revokeCertificate(certificateHash, "manual");
    } else {
      Swal.fire({
        title: "Input Required",
        text: "Please provide a certificate hash or scan a QR code.",
        icon: "warning",
      });
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        // marginTop: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "20px",
        position: "relative",
        background: "#0575E",
        background: "-webkit-linear-gradient(to right, #021B79, #0575E6)",
        background: "linear-gradient(to right, #021B79, #0575E6)",
        height: "90vh",
      }}
    >
      <button
        type="button"
        onClick={handleClick}
        className="bg-white text-center w-36 rounded-xl h-10 absolute font-sans text-black text-lg font-semibold group m-4"
        style={{ top: "0px", left: "0" }} // Adjusting the position downwards
      >
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white h-8 w-1/4 flex items-center justify-center absolute left-1 top-[2px] group-hover:w-[128px] z-10 duration-500">
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#FFFFFF"
              d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
            ></path>
            <path
              fill="#FFFFFF"
              d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
            ></path>
          </svg>
        </div>
        <p className="translate-x-2">Go Back</p>
      </button>
      <div style={{ backgroundColor: "white", borderRadius: "10px" }}>
        <h1 style={{ fontSize: "25px", margin: "5px" }}>Revoke Certificate</h1>
        <div
          style={{
            display: "inline-block",
            margin: "20px auto",
          }}
        >
          <QrScanner
            delay={300}
            style={{ width: "300px" }}
            onError={handleError}
            onScan={handleScan}
          />
        </div>
        {scanResult && (
          <p>
            Scanned Result: <strong>{scanResult}</strong>
          </p>
        )}
        <div style={{ marginTop: "30px" }}>
          <h3>Or Enter Certificate Hash Manually</h3>
          <form onSubmit={handleManualSubmit}>
            <input
              type="text"
              value={certificateHash}
              onChange={(e) => setCertificateHash(e.target.value)}
              placeholder="Enter certificate hash"
              style={{
                padding: "10px",
                width: "300px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                marginLeft: "10px",
                borderRadius: "5px",
                border: "none",
                backgroundColor: "#dc3545",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Revoke
            </button>
          </form>
          {manualResult && (
            <p>
              Manual Result: <strong>{manualResult}</strong>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Revoke;
