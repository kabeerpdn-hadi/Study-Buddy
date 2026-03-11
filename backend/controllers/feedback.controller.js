import feedbackModel from "../models/feedback.model.js";

const submitFeedbackorComplain = async (req, res) => {
    try {
        const type = req.body.type;

        if (!type) {
            return res.status(400).json({ message: "Type is required" });
        }

        const content = req.body.message;

        const feedback = await feedbackModel.create({
            type: type,
            message: content,
            user: req.userId
        });

        res.status(201).json({ feedback });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

const getFeedbacks = async (req, res) => {
    try {
        const feedbacks = await feedbackModel.find().populate("user", "name email");
        res.json({ feedbacks });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export { submitFeedbackorComplain, getFeedbacks };