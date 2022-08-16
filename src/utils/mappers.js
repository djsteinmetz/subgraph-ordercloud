const mapOcAssignmentToGql = (assignments, meta, buyerId) => {
    return {
        meta: mapOcMetaToGql(meta),
        items: assignments.map(a => {
            return {
                entityID: a.UserGroupID || a.UserID || buyerId,
                buyerID: buyerId,
                type: a.UserID ? 'User' : a.UserGroupID ? 'Group' : 'Company',
                level: a.UserID ? 'User' : a.UserGroupID ? 'Group' : 'Company',
                isShipping: a.IsShipping,
                isBilling: a.IsBilling,
            }
        })
    }
}

const mapOcAddressToGql = (address) => {
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
        lastName: address.LastName,
        xp: JSON.stringify(address.xp)
    }
}

const mapOcMetaToGql = (meta) => {
    return {
        page: meta.Page,
        pageSize: meta.PageSize,
        totalCount: meta.TotalCount,
        totalPages: meta.TotalPages,
        itemRange: meta.ItemRange,
        nextPageKey: meta.NextPageKey
    }
}

module.exports = {mapOcAssignmentToGql, mapOcAddressToGql, mapOcMetaToGql}