const { RESTDataSource } = require('apollo-datasource-rest');

class OrderCloudAPI extends RESTDataSource {
    constructor() {
        super();
        // the Catstronauts catalog is hosted on this server
        this.baseURL = 'https://sandboxapi.ordercloud.io/v1';
    }

    willSendRequest(request) {
        request.headers.set('Authorization', `${this.context.token}`);
    }

    getAllAddresses(buyerID) {
        return this.get(`/buyers/${buyerID}/addresses`);
    }

    getAddress(buyerID, id) {
        return this.get(`/buyers/${buyerID}/addresses/${id}`)
    }

    getAddressAssignments(buyerID, id) {
        return this.get(`/buyers/${buyerID}/addresses/assignments?addressID=${id}`)
    }

    getUserGroup(buyerID, id) {
        return this.get(`/buyers/${buyerID}/usergroups/${id}`)
    }

    getUser(buyerID, id) {
        return this.get(`/buyers/${buyerID}/users/${id}`)
    }

    getBuyer(buyerID) {
        return this.get(`/buyers/${buyerID}`)
    }
}

module.exports = OrderCloudAPI;
