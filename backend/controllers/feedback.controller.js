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

const getMyFeedbacks = async (req, res) => {
    try {
        const feedbacks = await feedbackModel
            .find({ user: req.userId })
            .sort({ createdAt: -1 });
        res.json({ feedbacks });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

const deleteFeedback = async (req, res) => {
    try {
        const feedback = await feedbackModel.findByIdAndDelete(req.params.id);

        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }

        res.json({ message: "Feedback deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

const replyToFeedback = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ message: "Reply message is required" });
        }

        const feedback = await feedbackModel.findByIdAndUpdate(
            req.params.id,
            { reply: message, repliedAt: new Date() },
            { new: true }
        ).populate("user", "name email");

        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }

        res.json({ feedback, message: "Reply sent successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export { submitFeedbackorComplain, getFeedbacks, getMyFeedbacks, deleteFeedback, replyToFeedback };