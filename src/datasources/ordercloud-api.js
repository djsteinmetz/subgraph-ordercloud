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
        console.log('here')
        return this.get(`/buyers/${buyerID}/addresses?pageSize=100`);
    }

    getAddress(buyerID, id) {
        return this.get(`/buyers/${buyerID}/addresses/${id}?pageSize=100`)
    }

    getAddressAssignments(buyerID, id) {
        console.log('here too')
        return this.get(`/buyers/${buyerID}/addresses/assignments?addressID=${id}?pageSize=100`)
    }

    getUserGroup(buyerID, id) {
        return this.get(`/buyers/${buyerID}/usergroups/${id}?pageSize=100`)
    }

    getUser(buyerID, id) {
        return this.get(`/buyers/${buyerID}/users/${id}?pageSize=100`)
    }

    getBuyer(buyerID) {
        return this.get(`/buyers/${buyerID}?pageSize=100`)
    }
}

module.exports = OrderCloudAPI;
