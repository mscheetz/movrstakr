const express = require("express");
const router = express.Router();
const addressSvc = require('../services/address.service');

router.get("/api/v1/address", [], async (req, res, next) => {
    const addresses = await addressSvc.getAddresses();

    res.status(200).json(addresses);
});

module.exports = router;