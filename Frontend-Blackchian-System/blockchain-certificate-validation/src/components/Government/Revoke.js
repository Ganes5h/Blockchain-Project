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

const Revoke = () => {
  const [certificateHash, setCertificateHash] = useState("");
  const [scanResult, setScanResult] = useState("");
  const [manualResult, setManualResult] = useState("");
  const token = useSelector((state) => state.auth.token);

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
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Revoke Certificate</h2>
      <div style={{ display: "inline-block", margin: "20px auto" }}>
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
  );
};

export default Revoke;
