const { mapOcAddressToGql, mapOcAssignmentToGql, mapOcMetaToGql, mapOcBuyerToGql } = require("./utils/mappers")
const resolvers = {
  Query: {
    addresses: async (_, { buyerID, pageSize, page, search, searchOn }, { dataSources }) => {
      const addressesListPage = await dataSources.ordercloudAPI.getAllAddresses(buyerID, pageSize, page, search, searchOn)
      console.log(addressesListPage)
      return {
        meta: mapOcMetaToGql(addressesListPage.Meta),
        items: addressesListPage.Items.map(a => {
          return mapOcAddressToGql(a)
        })
      }
    },
    addressAssignments: async (_, { buyerID, id, pageSize, page, userID, groupID, level }, { dataSources }) => {
      const assignments = await dataSources.ordercloudAPI.getAddressAssignments(buyerID, id, pageSize, page, userID, groupID, level)
      return mapOcAssignmentToGql(assignments.Items, assignments.Meta, buyerID)
    },
    address: async (_, { buyerID, id }, { dataSources, token }) => {
      const address = await dataSources.ordercloudAPI.getAddress(buyerID, id);
      console.log(address)
      return mapOcAddressToGql(address)
    },
    buyer: async(_, { buyerID }, { dataSources }) => {
      const buyer = await dataSources.ordercloudAPI.getBuyer(buyerID);
      return mapOcBuyerToGql(buyer);
    }
  },
  Address: {
    assignments: async ({ id }, _, { dataSources }, { variableValues }) => {
      const { buyerId } = variableValues
      const assignments = await dataSources.ordercloudAPI.getAddressAssignments(buyerId, id, 1, 5)
      return mapOcAssignmentToGql(assignments.Items, assignments.Meta, buyerId)
    }
  },
  AddressAssignment: {
    entity: async ({ buyerID, entityID, level }, _, { dataSources }) => {
      let entity
      if (level === 'Group') {
        entity = await dataSources.ordercloudAPI.getUserGroup(buyerID, entityID)
        return {
          id: entity.ID,
          name: entity.Name,
          description: entity.Description
        }
      } else if (level === 'User') {
        entity = await dataSources.ordercloudAPI.getUser(buyerID, entityID)
        return {
          id: entity.ID,
          name: `${entity?.FirstName} ${entity?.LastName}`,
          description: null
        }
      } else if (level === 'Company') {
        entity = await dataSources.ordercloudAPI.getBuyer(buyerID)
        return {
          id: buyerID,
          name: entity.Name,
          description: entity.Description
        }
      }
    }
  }
};

module.exports = resolvers;
