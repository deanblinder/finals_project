var express = require("express");
var router = express.Router();
const admin_utils = require("./utils/admin_utils");

// router.get("/getAdminByAdminName/:name", async (req, res, next) => {
//     let admin = [];
//     try {
//         const admin_details = await admin_utils.getAdminByAdminName(
//             req.params.name
//         );
//         console.log(admin_details)
//         admin.push(admin_details)
//         res.send(admin).status(200);
//     } catch (error) {
//         next(error);
//     }
// });
//
// router.get("/getAdminByEmail/:email", async (req, res, next) => {
//     let admin = [];
//     try {
//         const admin_details = await admin_utils.getAdminByEmail(
//             req.params.name
//         );
//         console.log(admin_details)
//         admin.push(admin_details)
//         res.send(admin).status(200);
//     } catch (error) {
//         next(error);
//     }
// });


router.post("/addAdmin/:name/:password", async (req, res, next) => {
    try {
        const name = req.params.name
        const password = req.params.password
        await admin_utils.addAdmin(name,password);
        res.status(201).send("The Admin added");
    } catch (error) {
        next(error);
    }
});

router.delete("/deleteAdminByUserName/:name", async (req, res, next) => {
    try {
        await admin_utils.deleteAdminByUserName(
            req.params.name
        );
        res.status(200);
    } catch (error) {
        next(error);
    }
});

module.exports = router;