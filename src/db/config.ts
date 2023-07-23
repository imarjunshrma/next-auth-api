import mongoose from "mongoose";


export default async function connection(){
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/arjun")
        console.log('connection true')
    }catch(err){
        console.log(err)
    }
}


// export async function disConnect() {
//     mongoose.disconnect()
// }