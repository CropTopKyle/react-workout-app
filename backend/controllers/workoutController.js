const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// Get all Workouts
const getAllWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

// Get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({"message": "No such workout"})
}

const workout = await Workout.findById(id)
    if (!workout){
        return res.status(404).json({error: "No such workout"})
    }

    res.status(200).json(workout)
}

// Create a new workout
const createWorkout = async (req, res) => {
    const {title, reps, load} = req.body

    try {
        const workout = await Workout.create({title, reps, load})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({"message": "No such workout"})
    }

const workout = await Workout.findOneAndDelete({_id: id})
    if (!workout){
        return res.status(404).json({error: "No such workout"})
    }

    res.status(200).json({message: "Workout Deleted", workout})
}
// Update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({"message": "No such workout"})
    }

    const workout = await Workout.findOneAndUpdate({_id: id},{
        ...req.body
    })
    
    if (!workout){
        return res.status(404).json({error: "No such workout"})
    }

    res.status(200).json({message: "Workout Updated!", workout})

}


module.exports = {
    createWorkout,
    getAllWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}