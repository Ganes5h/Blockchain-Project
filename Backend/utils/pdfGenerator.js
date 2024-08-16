// const puppeteer = require("puppeteer");
// const fs = require("fs");
// const path = require("path");

// const generateCertificatePDF = async (
//   recipient,
//   course,
//   date,
//   qrCodeUrl,
//   certificateHash
// ) => {
//   console.log(
//     "recipant",
//     recipient,
//     "course",
//     course,
//     "date",
//     date,
//     "qrurl",
//     qrCodeUrl,
//     "hashcert",
//     certificateHash
//   );
//   const htmlPath = path.join(__dirname, "certificate-template.html");
//   let htmlContent = fs.readFileSync(htmlPath, "utf8");
//   //   htmlContent = htmlContent.replace("{{IMG1}}", process.env.IMG1);
//   // Replace placeholders with actual data
//   htmlContent = htmlContent
//     .replace("{{recipient}}", recipient)
//     .replace("{{course}}", course)
//     .replace("{{date}}", date)
//     .replace("{{qrCodeFilename}}", path.basename(qrCodeUrl));

//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.setContent(htmlContent);

//   // Define the path where the PDF will be saved
//   const pdfPath = path.join("uploads/certificates", `${certificateHash}.pdf`);

//   // Generate the PDF and save it to the specified path in landscape format
//   await page.pdf({
//     path: pdfPath,
//     format: "A4",
//     landscape: true,
//   });

//   await browser.close();

//   // Return the path to the generated PDF
//   return pdfPath;
// };

// module.exports = generateCertificatePDF;

const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const generateCertificatePDF = async (
  recipientName,
  courseName,
  issueDate,
  qrCodeUrl,
  issuerName,
  certificateHash
) => {
  // Path to the HTML template
  const htmlPath = path.join(__dirname, "certificate-template.html");
  console.log(htmlPath);
  let htmlContent = fs.readFileSync(htmlPath, "utf8");

  const qr = `http://localhost:4000/${qrCodeUrl}`;
  console.log(qr);
  // Replace placeholders with actual data
  htmlContent = htmlContent
    .replace("{{recipient}}", recipientName)
    .replace("{{course}}", courseName)
    .replace("{{date}}", issueDate)
    .replace("{{issuer}}", issuerName)
    .replace("{{qrCodeFilename}}", path.basename(qrCodeUrl));

  // Launch Puppeteer and generate the PDF
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent);

  // Ensure the output directory exists
  //   const outputDir = path.join(__dirname, "uploads", "certificates");
  //   if (!fs.existsSync(outputDir)) {
  //     fs.mkdirSync(outputDir, { recursive: true });
  //   }

  // Define the path where the PDF will be saved
  const pdfPath = path.join("uploads/certificates", `${certificateHash}.pdf`);

  console.log("Saving PDF to:", pdfPath);

  // Generate the PDF and save it to the specified path in landscape format
  await page.pdf({
    path: pdfPath,
    format: "A4",
    landscape: true,
  });

  await browser.close();

  // Return the path to the generated PDF
  return pdfPath;
};

module.exports = generateCertificatePDF;
