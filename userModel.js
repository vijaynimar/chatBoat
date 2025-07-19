import {Schema,model} from "mongoose"
const userSchema=new Schema({
    phone:{type:Number,required:true,unique:true},
    name:{type:String},
    city:{type:String},

    selectedActivity:{type:String},
     deletedAt: {
      type: Date, 
      default: null,
    },
    joined:{type:Boolean,default:false},
    createdAt:{type:Date,default:Date.now},
    deletedAt:{type:String}
})
const user=model("user",userSchema)
export {user}