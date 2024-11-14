import express from "express";
const app = express();
import db from "@repo/db/client";

app.post("/hdfcWebhook", (req, res) => {
    //TODO: Add a zod validation here?
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };
    //Updtae balance in db, add txn
})