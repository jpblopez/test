const express = require("express");
const {
    getCustomers,
    getCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer
} = require("../controller/customers");

const router = express.Router();

router.route("/").get(getCustomers).post(createCustomer);
router.route("/:id").get(getCustomer).patch(updateCustomer).delete(deleteCustomer);

module.exports = router;