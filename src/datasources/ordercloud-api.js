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

    getAllAddresses(buyerID, pageSize, page, search, searchOn) {
        let url = `/buyers/${buyerID}/addresses?pageSize=${pageSize ?? 25}&page=${page ?? 1}`
        if (search) url+=`&search=${search}`
        if (searchOn) url+=`&searchOn=${searchON}`
        return this.get(url)
    }

    getAddress(buyerID, id) {
        return this.get(`/buyers/${buyerID}/addresses/${id}?pageSize=100`)
    }

    getAddressAssignments(buyerId, addressID, page, pageSize, filterString) {
        let url = `/buyers/${buyerId}/addresses/assignments?addressID=${addressID}&pageSize=${pageSize ?? 25}&page=${page ?? 1}`
        if (filterString) url+=filterString
        return this.get(url)
    }

    getUserGroup(buyerID, id) {
        return this.get(`/buyers/${buyerID}/usergroups/${id}`)
    }

    getUser(buyerID, id) {
        return this.get(`/buyers/${buyerID}/users/${id}`)
    }

    getBuyer(buyerID) {
        console.log(buyerID)
        return this.get(`/buyers/${buyerID}`)
    }
}

module.exports = OrderCloudAPI;
