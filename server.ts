import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON Body Parser
  app.use(express.json());

  // API Route: Get SMTP Configuration Status
  app.get("/api/smtp-status", (req, res) => {
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpTo = process.env.SMTP_TO || "aabdulhafiz073@gmail.com";
    const isConfigured = !!(smtpHost && smtpPort && smtpUser && smtpPass);
    res.json({ isConfigured, smtpTo });
  });

  // API Route: Send Email via SMTP
  app.post("/api/send-email", async (req, res) => {
    try {
      const { name, email, phone, buildingType, customSpecs, message, config, referenceToken } = req.body;

      if (!name || !email || !phone) {
        return res.status(400).json({ 
          success: false, 
          message: "Required fields are missing. Please provide Name, Email, and Phone number." 
        });
      }

      const finalToken = referenceToken || `CIKAY-LIFT-${Math.floor(10000 + Math.random() * 90000)}`;

      // Check for SMTP configuration
      const smtpHost = process.env.SMTP_HOST;
      const smtpPort = process.env.SMTP_PORT;
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      const smtpFrom = process.env.SMTP_FROM || "no-reply@cikayelevator.com";
      const smtpTo = process.env.SMTP_TO || "aabdulhafiz073@gmail.com";

      const isConfigured = smtpHost && smtpPort && smtpUser && smtpPass;

      if (!isConfigured) {
        console.warn("SMTP configuration is incomplete. Mail sending is operating in SIMULATOR mode.");
        return res.status(200).json({
          success: true,
          simulator: true,
          message: "Mail processed in SIMULATOR mode. To send actual emails, please configure SMTP credentials in your .env file."
        });
      }

      // Create Nodemailer Transporter
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(smtpPort, 10),
        secure: parseInt(smtpPort, 10) === 465, // True for 465, false for other ports (like 587)
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      // Construct a highly polished HTML email template
      const htmlBody = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>CIKAY Elevator - New Lead Inquiry</title>
          <style>
            body {
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              background-color: #f4f6f8;
              color: #333333;
              margin: 0;
              padding: 0;
              -webkit-font-smoothing: antialiased;
            }
            .container {
              max-width: 600px;
              margin: 30px auto;
              background-color: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
              border: 1px solid #e1e8ed;
            }
            .header {
              background-color: #0d1527;
              padding: 30px;
              text-align: center;
              border-bottom: 3px solid #dfa057;
            }
            .header h1 {
              color: #ffffff;
              margin: 0;
              font-size: 24px;
              letter-spacing: 1px;
              font-weight: 700;
            }
            .header p {
              color: #dfa057;
              margin: 5px 0 0 0;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 2px;
              font-weight: 600;
            }
            .content {
              padding: 30px;
            }
            .section-title {
              font-size: 16px;
              font-weight: bold;
              text-transform: uppercase;
              color: #0d1527;
              border-bottom: 2px solid #f0f3f6;
              padding-bottom: 8px;
              margin-top: 25px;
              margin-bottom: 15px;
              letter-spacing: 0.5px;
            }
            .info-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            .info-table td {
              padding: 10px 0;
              border-bottom: 1px solid #f0f3f6;
              font-size: 14px;
            }
            .info-table td.label {
              color: #7f8c8d;
              font-weight: 600;
              width: 35%;
            }
            .info-table td.value {
              color: #2c3e50;
              font-weight: 500;
            }
            .badge {
              display: inline-block;
              background-color: #dfa057;
              color: #0d1527;
              font-weight: bold;
              padding: 3px 10px;
              border-radius: 20px;
              font-size: 11px;
              text-transform: uppercase;
            }
            .message-box {
              background-color: #f8fafc;
              border-left: 4px solid #dfa057;
              padding: 15px;
              font-size: 14px;
              line-height: 1.6;
              color: #475569;
              border-radius: 0 8px 8px 0;
              margin-top: 10px;
              white-space: pre-line;
            }
            .spec-card {
              background-color: #0d1527;
              color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              margin-top: 15px;
            }
            .spec-card h3 {
              color: #dfa057;
              margin-top: 0;
              margin-bottom: 15px;
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 1px;
              border-bottom: 1px solid rgba(223, 160, 87, 0.3);
              padding-bottom: 8px;
            }
            .spec-grid {
              display: table;
              width: 100%;
            }
            .spec-row {
              display: table-row;
            }
            .spec-cell {
              display: table-cell;
              padding: 6px 0;
              font-size: 13px;
            }
            .spec-cell.lbl {
              color: rgba(255, 255, 255, 0.6);
              width: 45%;
            }
            .spec-cell.val {
              color: #ffffff;
              font-weight: bold;
              text-align: right;
            }
            .footer {
              background-color: #f8fafc;
              padding: 20px;
              text-align: center;
              font-size: 11px;
              color: #94a3b8;
              border-top: 1px solid #e2e8f0;
            }
            .footer p {
              margin: 5px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>CIKAY ELEVATOR</h1>
              <p>Luxury & High-Performance Vertical Engineering</p>
            </div>
            
            <div class="content">
              <div class="section-title">Client Contact Details</div>
              <table class="info-table">
                <tr>
                  <td class="label">Reference Token:</td>
                  <td class="value"><span class="badge" style="background-color: #0d1527; color: #dfa057; border: 1px solid #dfa057;">${finalToken}</span></td>
                </tr>
                <tr>
                  <td class="label">Client Name:</td>
                  <td class="value"><strong>${name}</strong></td>
                </tr>
                <tr>
                  <td class="label">Mobile Number:</td>
                  <td class="value"><a href="tel:${phone}" style="color: #dfa057; text-decoration: none;"><strong>${phone}</strong></a></td>
                </tr>
                <tr>
                  <td class="label">Email Address:</td>
                  <td class="value"><a href="mailto:${email}" style="color: #dfa057; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td class="label">Architecture Type:</td>
                  <td class="value"><span class="badge">${buildingType}</span></td>
                </tr>
              </table>

              ${config ? `
              <div class="spec-card">
                <h3>Bespoke Cabin Specifications</h3>
                <div class="spec-grid">
                  <div class="spec-row">
                    <div class="spec-cell lbl">Cabin Architecture Style:</div>
                    <div class="spec-cell val">${config.style || 'N/A'}</div>
                  </div>
                  <div class="spec-row">
                    <div class="spec-cell lbl">Atmosphere & Lighting:</div>
                    <div class="spec-cell val">${config.lighting || 'N/A'}</div>
                  </div>
                  <div class="spec-row">
                    <div class="spec-cell lbl">Control Interface (COP):</div>
                    <div class="spec-cell val">${config.panel || 'N/A'}</div>
                  </div>
                  <div class="spec-row">
                    <div class="spec-cell lbl">Automatic Rescue Device (ARD):</div>
                    <div class="spec-cell val" style="color: ${config.hasARD ? '#4ade80' : '#f87171'}">
                      ${config.hasARD ? "CONNECTED (VVVF Logic)" : "MANUAL CRANK"}
                    </div>
                  </div>
                  <div class="spec-row">
                    <div class="spec-cell lbl">Velocity Target:</div>
                    <div class="spec-cell val">${config.speed || 'N/A'}</div>
                  </div>
                  <div class="spec-row">
                    <div class="spec-cell lbl">Passage Capacity:</div>
                    <div class="spec-cell val">${config.capacity || 'N/A'}</div>
                  </div>
                </div>
              </div>
              ` : `
              <div class="section-title">Preconfigured Specs</div>
              <p style="font-size: 14px; color: #2c3e50;">${customSpecs || 'None preconfigured'}</p>
              `}

              <div class="section-title">Project Notes & Demands</div>
              <div class="message-box">
                ${message ? message.replace(/\n/g, '<br>') : 'No custom message or special notes provided.'}
              </div>
            </div>

            <div class="footer">
              <p>© ${new Date().getFullYear()} CIKAY Elevator Private Limited. All Rights Reserved.</p>
              <p>HQ: CIKAY Industrial Gate, Sector 4, Haridwar Industrial Area, Uttarakhand - 249403, India</p>
              <p style="font-size: 10px; color: #cbd5e1;">This email is automatically generated by the CIKAY Elevator Hub portal.</p>
            </div>
          </div>
        </body>
        </html>
      `;

      // Send mail
      const mailOptions = {
        from: `"CIKAY Elevator Portal" <${smtpFrom}>`,
        to: smtpTo,
        replyTo: email,
        subject: `New CIKAY Elevator Inquiry [${finalToken}] - ${name} (${buildingType})`,
        html: htmlBody,
        text: `
          CIKAY ELEVATOR LEADS DISPATCH
          =================================
          Reference Token: ${finalToken}
          Client Name: ${name}
          Mobile Number: ${phone}
          Email Address: ${email}
          Architecture Type: ${buildingType}
          
          CABIN SPECIFICATIONS:
          - Style: ${config ? config.style : customSpecs}
          - Lighting: ${config ? config.lighting : ''}
          - COP Panel: ${config ? config.panel : ''}
          - ARD Auto Rescue: ${config ? (config.hasARD ? "CONNECTED (VVVF)" : "MANUAL") : ''}
          - Velocity Target: ${config ? config.speed : ''}
          - Passage Capacity: ${config ? config.capacity : ''}

          PROJECT NOTES & DEMANDS:
          ${message || 'No notes provided'}
        `.trim(),
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully: ", info.messageId);

      return res.status(200).json({ 
        success: true, 
        messageId: info.messageId,
        message: "Your inquiry has been successfully sent to CIKAY Sales and Engineering team." 
      });
    } catch (err: any) {
      console.error("Error sending email via SMTP: ", err);
      return res.status(500).json({ 
        success: false, 
        message: `Failed to transmit mail via SMTP. Reason: ${err.message || err}` 
      });
    }
  });

  // Serve static assets or mount Vite dev server
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[CIKAY Server] running on http://localhost:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
}

startServer();
