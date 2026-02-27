const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const warehouseSchema = new Schema({
    warehouseName:{type:String, required:true},
    warehouseId:{type:String, required:true, unique:true, index:true},
    warehouseIdType:{type:String},
    Area:{type:Number},
    AreaUomId:{type:String},
    Status:{type:String, maxLength:1},
    Address:{type:String},
    City:{type:String},
    State:{type:String},
    PostalCode:{type:String},
    Country:{type:String},
    isActive:{type:Boolean, default:true},
    isDeleted:{type:Boolean, default:false},
    DeletedAt:{type:Date}

},{
    // Yeh automatically CreatedAt aur UpdatedAt handle karega
  timestamps: { createdAt: 'createdStamp', updatedAt: 'lastUpdatedStamp' }
 })

 module.exports = mongoose.model('Warehouse', warehouseSchema);