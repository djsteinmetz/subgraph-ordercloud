const resolvers = {
    Query: {
      addresses: async (_, {buyerID}, { dataSources, token }) => {
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
      assignments: async (parent, _, { dataSources }) => {
        const assignments = await dataSources.ordercloudAPI.getAddressAssignments(parent.buyerID, parent.id)
        return assignments.Items.map(a => {
          return {
            assignmentType: a.UserID ? "User" : "UserGroup",
            name: "not-configured",
            isShipping: a.IsShipping,
            isBilling: a.IsBilling,
            description: "not-configured"
          }
        })
      }
    }
  };
  
  module.exports = resolvers;
  