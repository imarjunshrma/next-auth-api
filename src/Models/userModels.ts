/* This code is defining a Mongoose schema and model for a user in a TypeScript file. */
import mongoose from "mongoose";

interface UserInter {
    name: string,
    email: string,
    password: string
}

const schema = new mongoose.Schema<UserInter>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    },
    password: {
        type: String,
        required: true,
        // validate: {
        //     validator: (value: any) => value > 6,
        //     message: "value must be greater than 6"
        // },
    }
})

const User = mongoose.models.user || mongoose.model<UserInter>('user', schema)

export default User;