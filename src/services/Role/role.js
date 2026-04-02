// services/party/roleService.js

const PartyRole = require('../../models/Roles/role');
const User = require('../../models/User/user');
const Party = require('../../models/Party/Party');

const assignRole = async (data) => {
    const { partyId, roleType } = data;

    if (!partyId || !roleType) {
        throw new Error("partyId and roleType are required");
    }

    // 🔥 Find party using PartyId (string)
    const party = await Party.findOne({ PartyId: partyId });

    if (!party) {
        throw new Error("Party not found");
    }

    // 🔥 Duplicate role check
    const existingRole = await PartyRole.findOne({
        partyId: party._id,
        roleType
    });

    if (existingRole) {
        throw new Error("Role already assigned");
    }

    // ✅ Save role with ObjectId
    const role = await PartyRole.create({
        partyId: party._id,
        roleType
    });

    // 🔥 Update user if exists
    const user = await User.findOne({ partyId: party._id });

    let updatedUser = null;

    if (user) {
        updatedUser = await User.findOneAndUpdate(
            { partyId: party._id },
            { role: roleType.toLowerCase() },
            { new: true }
        );
    }

    return { role, user: updatedUser };
};

const getRolesByParty = async (partyId) => {

    // 🔥 Find party using custom PartyId
    const party = await Party.findOne({ PartyId: partyId });

    if (!party) {
        throw new Error("Party not found");
    }

    // ✅ Use ObjectId internally
    const roles = await PartyRole.find({
        partyId: party._id
    });

    return roles;
};

module.exports = {
    assignRole,
    getRolesByParty
};