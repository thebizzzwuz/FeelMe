import mongoose from "mongoose"
import bcrypt from "bcrypt";

// Structure for participant schema
const participantSchema = new mongoose.Schema ({

    participantId: {
        type: Number,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    }
}, { timestamps: true })

// Hashes the password
participantSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Authenticates password based upon the hash
participantSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

//Exports the model
module.exports = mongoose.model('Participant', participantSchema);