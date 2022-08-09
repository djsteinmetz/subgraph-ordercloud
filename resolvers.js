const resolvers = {
    Query: {
      addresses: async (_, {buyerID}, { dataSources, token }) => {
        const addressesListPage = await dataSources.ordercloudAPI.getAllAddresses(buyerID)
        console.log(addressesListPage)
        return addressesListPage.Items.map(a => {
            return {
                id: a.ID,
                addressName: a.AddressName,
                street1: a.Street1,
                street2: a.Street2,
                city: a.City,
                state: a.State,
                zip: a.Zip,
                country: a.Country,
                firstName: a.FirstName,
                lastName: a.LastName
            }
        });
      },
      address: async (_, { buyerID, id }, { dataSources, token }) => {
        try {
            const address = await dataSources.ordercloudAPI.getAddress(buyerID, id);
            console.log(address)
            return {
                id: address.ID,
                addressName: address.AddressName,
                street1: address.Street1,
                street2: address.Street2,
                city: address.City,
                state: address.State,
                zip: address.Zip,
                country: address.Country,
                firstName: address.FirstName,
                lastName: address.LastName
            }
        } catch(err) {
            console.log(err)
            if (err && !token) {
                return {message: "Authentication.InvalidToken"}
            }
        }
      },
    },
  };
  
  module.exports = resolvers;
  