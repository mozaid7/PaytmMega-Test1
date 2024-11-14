import express from "express";
const app = express();
import db from "@repo/db/client";

app.post("/hdfcWebhook", async (req, res) => {
    //TODO: Add a zod validation here?
    // check if this req actually came from hdfc bank, use a webhook secret
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };
    
    try {
        await db.$transaction([
            db.balance.update({
                where: {
                    userId: paymentInformation.userId
                },
                data: {
                    amount: {
                        increment: paymentInformation.amount
                    }
                }
            }),
            db.onRampTransaction.update({
                where: {
                   token: paymentInformation.token, 
                },
                data: {
                    status: "Success"
                }
            })
        ]);
        res.json({
            message: "Captured"
        })

    } catch(e) {
        res.status(411).json({
            message: "Error while parsing webhook"
        })
    }
})