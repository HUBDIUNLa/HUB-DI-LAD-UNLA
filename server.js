
require("dotenv").config();
const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const upload = multer();

app.use(cors());

app.post("/enviar-presupuesto", upload.single("pdf"), async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "estefifondevilasancet@gmail.com", // Cambiá si querés enviar a otro
      subject: "Presupuesto HUB DI UNLa",
      text: "Adjunto encontrarás el presupuesto solicitado.",
      attachments: [
        {
          filename: "presupuesto.pdf",
          content: req.file.buffer,
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send("Correo enviado exitosamente.");
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).send("Error al enviar el correo.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
