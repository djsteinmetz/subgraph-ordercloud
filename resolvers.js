const resolvers = {
    Query: {
      addresses: async (_, {buyerID}, { dataSources }) => {
        const addressesListPage = await dataSources.ordercloudAPI.getAllAddresses(buyerID)
        return addressesListPage.Items.map(a => {
            return {
                id: a.ID,
                buyerID,
                addressName: a.AddressName,
                street1: a.Street1,
                street2: a.Street2,
                city: a.City,
                state: a.State,
                zip: a.Zip,
                country: a.Country,
                firstName: a.FirstName,
                lastName: a.LastName,
                xp: JSON.stringify(a.xp)
            }
        });
      },
      address: async (_, { buyerID, id }, { dataSources, token }) => {
        try {
            const address = await dataSources.ordercloudAPI.getAddress(buyerID, id);
            return {
                id: address.ID,
                buyerID,
                addressName: address.AddressName,
                street1: address.Street1,
                street2: address.Street2,
                city: address.City,
                state: address.State,
                zip: address.Zip,
                country: address.Country,
                firstName: address.FirstName,
                lastName: address.LastName,
                xp: JSON.stringify(address.xp)
            }
        } catch(err) {
            console.log(err)
            if (err && !token) {
                return {message: "Authentication.InvalidToken"}
            }
        }
      },
    },
    Address: {
      assignments: async ({buyerID, id}, _, { dataSources }) => {
        const assignments = await dataSources.ordercloudAPI.getAddressAssignments(buyerID, id)
        return assignments.Items.map(a => {
          return {
            entityID: a.UserGroupID || a.UserID || buyerID,
            buyerID,
            type: a.UserID ? 'User' : a.UserGroupID ? 'UserGroup' : 'Buyer',
            isShipping: a.IsShipping,
            isBilling: a.IsBilling,
          }
        })
      }
    },
    AddressAssignment: {
      entity: async ({buyerID, entityID, type}, _, { dataSources }) => {
        let entity
        if (type === 'UserGroup') {
          entity = await dataSources.ordercloudAPI.getUserGroup(buyerID, entityID)
          return {
            id: entity.ID,
            type,
            name: entity.Name,
            description: entity.Description
          }
        } else if (type === 'User') {
          entity = await dataSources.ordercloudAPI.getUser(buyerID, entityID)
          return {
            id: entity.ID,
            type,
            name: `${entity?.FirstName} ${entity?.LastName}`,
            description: null
          }
        } else if (type === 'Buyer') {
          entity = await dataSources.ordercloudAPI.getBuyer(buyerID)
          return {
            id: buyerID,
            type,
            name: entity.Name,
            description: entity.Description
          }
        }
      }
    }
  };
  
  module.exports = resolvers;
  