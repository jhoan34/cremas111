// src/services/wa.js
import pkg from "whatsapp-web.js";
const { Client, LocalAuth } = pkg;

const whatsapp = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    },
});

whatsapp.on("qr", async (qr) => {
    const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qr)}`);
    const qrCodeUrl = response.url;
    console.log(`QR code URL: ${qrCodeUrl}`);
});

whatsapp.on("ready", () => {
    console.log("Whatsapp is ready");
});

whatsapp.on("auth_failure", (msg) => {
    console.error("AUTHENTICATION FAILURE", msg);
});

whatsapp.on("disconnected", (reason) => {
    console.log("Client was logged out", reason);
});

export default whatsapp;
