const Employe = require("../model/Employe")

const getAllEmployees = async(req,res) => {
    const employees = await Employe.find()
    if(!employees){
        return res.status(204).json({ message : "No employees found" })
    }
    res.json(employees)
}

const creteEmployees = async(req,res) => {
    if(!req?.body?.firstname || !req?.body?.lastname){
        return res.status(400).json(({ message : "First and last names are required" }))
    }

    try{
        const result = await Employe.create({
            firstname : req.body.firstname,
            lastname : req.body.lastname
        })
        res.status(201).json(result)
    } catch(err){
        console.error(err)
    }
}

const updateEmployee = async(req , res ) => {
    if(req?.body?.id){
        return res.status(400).json({ message : 'ID required'})
    }

    const employee = await Employe.findOne({ _id : req.body.id }).exec()
    if(!employee){
        return res.status(204).json({ message : `there is no employee with ${req.body.id}.` })
    }
    if(req.body?.firstname){
        employee.firstname = req.body.firsname
    }
    if(req.body?.lastname){
        employee.lastname = req.body.lastname
    }
    const result = await employee.save()
    res.json(result)
}

const deleteEmployee = async (req , res) => {
    if(req?.body?.id){
        return res.status(400).json({ message : 'ID required'})
    }
    const employee = await Employe.findOne({ _id : req.body.id }).exec()
    if(!employee){
        return res.status(204).json({ message : `there is no employee with ${req.body.id}.` })
    }
    const result = await employee.deleteOne({ _id : req.body.id })
    res.json(result)
}

const getEmployee = async (req,res) => {
    if(req?.params?.id){
        return res.status(400).json({ message : 'ID required'})
    }

    const employee = await Employe.findOne({ _id : req.params.id }).exec()
    if(!employee){
        return res.status(204).json({ message : `there is no employee with ${req.params.id}.` })
    }
    res.json(employee)
}

module.exports = {
    getAllEmployees,
    creteEmployees,
    updateEmployee,
    deleteEmployee,
    getEmployee 
}