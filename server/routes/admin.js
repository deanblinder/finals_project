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


router.get("/administratorLogin/:name/:password", async (req, res, next) => {
    try {
        console.log('---in administratorLogin---')
        const name = req.params.name
        const password = req.params.password
        const admin_details = await admin_utils.administratorLogin(name,password);
        console.log(admin_details)
        if (admin_details[0]) {
            console.log("in status 200")
            res.status(200).send('admin exists');
        }else{
            console.log('in else')
            res.status(404).send("Admin doesnt exists");
        }
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