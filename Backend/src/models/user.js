const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        maxlength: 16
    },
    age: {
        type: Number,
        minlength: 18
    },
    gender: {
        type: String,
        validate(value) {
            if (!['male', 'female', 'other ']) {
                throw new Error("invalid gender");
            }
        }
    },
    photourl: {
        type: String,
        default: "https://imgs.search.brave.com/F1eO9FCkTdutQz0izXsxkxblnBKfO4w_-uBSkj7Zi1A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMx/NjQyMDY2OC92ZWN0/b3IvdXNlci1pY29u/LWh1bWFuLXBlcnNv/bi1zeW1ib2wtc29j/aWFsLXByb2ZpbGUt/aWNvbi1hdmF0YXIt/bG9naW4tc2lnbi13/ZWItdXNlci1zeW1i/b2wuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPUFocVcyc3NY/OEVlSTJJWUZtNi1B/U1E3cmZlQldmckZG/VjRFODdTYUZoSkU9"
    },
    about: {
        type: String,
        default: "this is  a  default about the user!"
    },
    skills: {
        type: [String],

    }
}, { timestamps: true });

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id }, "devTinder@159", { expiresIn: "7d" });
    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(
        passwordInputByUser,
        passwordHash
    );
    return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
