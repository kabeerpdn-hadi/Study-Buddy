import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name is required"] },
    email: { 
        type: String, 
        required: [true, "Email is required"], 
        unique: true, 
        lowercase: true, 
        trim: true 
    },
    password: { 
        type: String, 
        required: [true, "Password is required"], 
        minlength: [6, "Password must be at least 6 characters long"],
        select: false  // ✅ Added: Hide password by default
    },
    badges: [{ type: String }],

    money: { type: Number, default: 0, min: 0 },

    plan: { type: String, enum: ["free", "premium"], default: "free" },

    level: { type: Number, default: 1 },

    role: { type: String, enum: ["student", "teacher", "admin"], default: "student" } , // ✅ Fixed typo

    refreshToken: { type: String, default: null },

    lessonsCompleted: { type: Number, default: 0 },
}, { timestamps: true });

userSchema.pre("save", async function() {  // ✅ FIXED: No 'next'
    if(!this.isModified("password")) return;

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        throw error;
    }
});

userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
