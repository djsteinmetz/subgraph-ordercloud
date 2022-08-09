const { RESTDataSource } = require('apollo-datasource-rest');

class OrderCloudAPI extends RESTDataSource {
    constructor() {
        super();
        // the Catstronauts catalog is hosted on this server
        this.baseURL = 'https://api.ordercloud.io/v1';
    }

    willSendRequest(request) {
        request.headers.set('Authorization', `Bearer ${this.context.token}`);
    }

    getAllAddresses(buyerID) {
        return this.get(`/buyers/${buyerID}/addresses`);
    }

    getAddress(buyerID, id) {
        return this.get(`/buyers/${buyerID}/addresses/${id}`)
    }
}

module.exports = OrderCloudAPI;
