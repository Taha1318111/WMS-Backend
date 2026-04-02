const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    roleType: {
        type: String,
        required: true,
        enum: ['SUPPLIER', 'VENDOR', 'CUSTOMER', 'EMPLOYEE'] // optional but recommended
    },

    partyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Party', // 🔥 yaha Party model ka naam aayega
        required: true
    },

    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },

    fromDate: {
        type: Date,
        default: Date.now
    },

    thruDate: {
        type: Date
    }

}, {
    timestamps: true // 🔥 CreatedAt & UpdatedAt auto manage karega
});

module.exports = mongoose.model('PartyRole', roleSchema);