const router = require("express").Router();
const { response } = require("express");
let Employee = require("../models/employee");

//Add employee
router.route("/add").post((req,res)=>{

    const name = req.body.name;
    const role = req.body.role;
    const email = req.body.email;
    const idNo = req.body.idNo;
    const contactNO = req.body.contactNO;
    const basicSallary = req.body.basicSallary;
    const allowance = req.body.allowance;
    const deductions = req.body.deductions;
    const join = req.body.join;
    const pariod = req.body.pariod;
    const ot = req.body.ot;

    const newEmployee = new Employee({

        name,
        role,
        email,
        idNo,
        contactNO,
        basicSallary,
        allowance,
        deductions,
        join,
        pariod,
        ot
    })

    newEmployee.save().then(()=>{
        res.json("New Employee Created")
    }).catch((err)=>{
        console.log(err)
    })

})

//View all employee
router.route("/").get((req,res)=>{

    Employee.find().then((employees)=>{
        res.json(employees)
    }).catch((err)=>{
        console.log(err)
    })

})

// Update employee by id
router.route("/update/:id").put((req, res) => {
    const { name, role, email, idNo, contactNO, basicSallary,allowance,deductions,join,pariod,ot} = req.body;
    const employeeId = req.params.id;
  
    Employee.findByIdAndUpdate(
      employeeId,
      {
        $set: {
          name,
          role,
          email,
          idNo,
          contactNO,
          basicSallary,
          allowance,
          deductions,
          join,
          pariod,
          ot,
        },
      },
      { new: true }
    )
      .then((updatedEmployee) =>
        res.json({
          success: true,
          message: "Employee updated",
          updatedEmployee: updatedEmployee // change variable name to updatedEmployee
        })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          success: false,
          message: "Unable to update employee",
          error: err,
        });
      });
  });
  
//Delete User by ID
router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    await Employee.findByIdAndDelete(userId)
    .then(() => {
        res.status(200).send({status: "Employee deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete user",error:err.message})
    })
})

//View user by ID
router.route("/get/:id").get(async(req, res) =>{
  let userId = req.params.id;
  const user = await Employee.findById(userId)
  .then((employee)=>{
      res.status(200).send({status: "user fetched", employee})
  }).catch(()=>{
      console.log(err.message);
      res.status(500).send({status: "Error with get user",error:err.message})
  })
}) 

//Employee view by id
router.route('/view/:idNo').get(async (req, res) => {
  const employeeIdNo = req.params.idNo;
  try {
    const employee = await Employee.findOne({ idNo: employeeIdNo });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ status: 'Employee fetched', employee });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ status: 'Error with get employee', error: err.message });
  }
});

//Search 
router.get('/search/:searchInput', async (req, res) => {
  try {
    const { searchInput } = req.params;
    const employees = await Employee.find({
      $or: [
        { name: { $regex: searchInput, $options: 'i' } },
        { role: { $regex: searchInput, $options: 'i' } },
        { email: { $regex: searchInput, $options: 'i' } },
        { idNo: { $regex: searchInput, $options: 'i' } },
        { contactNO: { $regex: searchInput, $options: 'i' } },
      ],
    });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
             


module.exports = router;


