const express = require("express");
const router = express.Router();
const movrSvc = require('../services/movr.service');

router.get("/api/v1/info/:address", [], async (req, res, next) => {
    const address = req.params.address;
    const info = await movrSvc.getAddressDetails(address);

    res.status(200).json(info);
});

module.exports = router;