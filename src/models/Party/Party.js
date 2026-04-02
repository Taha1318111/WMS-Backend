const moongose = require('mongoose');

const partySchema = new moongose.Schema({
    PartyId: {
        type: String,
        required: true
    },
    PartyType: {
        type: String,
        required: true
    },

    FirstName: {
        type: String},
    LastName: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    PhoneNumber: {
        type: String
    },
    Address: {
        type: String
    },
    City: {
        type: String
    },
    State: {
        type: String
    },
    ZipCode: {
        type: String
    },
    Country: {
        type: String
    },
    status: {
        type: String,
        default: 'active'
    },
    organizationName: {
        type: String
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    },
    UpdatedAt: {
        type: Date,
        default: Date.now
    }
});    

const Party = moongose.model('Party', partySchema);

module.exports = Party;
