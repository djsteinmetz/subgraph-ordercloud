const { RESTDataSource } = require('apollo-datasource-rest');

class OrderCloudAPI extends RESTDataSource {
    constructor() {
        super();
        // the Catstronauts catalog is hosted on this server
        this.baseURL = 'https://sandboxapi.ordercloud.io/v1';
    }

    willSendRequest(request: Request) {
        request.headers.set('Authorization', `${this.context.token}`);
    }

    getAllAddresses(buyerID: string, pageSize: number, page: number, search: string, searchOn: string) {
        let url = `/buyers/${buyerID}/addresses?pageSize=${pageSize ?? 25}&page=${page ?? 1}`
        if (search) url+=`&search=${search}`
        if (searchOn) url+=`&searchOn=${searchOn}`
        return this.get(url)
    }

    getAddress(buyerID: string, id: string) {
        return this.get(`/buyers/${buyerID}/addresses/${id}?pageSize=100`)
    }

    getAddressAssignments(buyerId: string, addressID: string, page: number, pageSize: number, filterString: string) {
        let url = `/buyers/${buyerId}/addresses/assignments?addressID=${addressID}&pageSize=${pageSize ?? 25}&page=${page ?? 1}`
        if (filterString) url+=filterString
        return this.get(url)
    }

    getUserGroup(buyerID: string, id: string) {
        return this.get(`/buyers/${buyerID}/usergroups/${id}`)
    }

    getUser(buyerID: string, id: string) {
        return this.get(`/buyers/${buyerID}/users/${id}`)
    }

    getBuyer(buyerID: string) {
        console.log(buyerID)
        return this.get(`/buyers/${buyerID}`)
    }
}

module.exports = OrderCloudAPI;
