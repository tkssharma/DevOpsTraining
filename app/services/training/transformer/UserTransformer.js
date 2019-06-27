const _ = require ( 'lodash');
const Helper = require ( '../../../helper');

let UserTransformer = {
    transform: (users) => {
        if (Array.isArray(users)) {
            let output = [];
            _.forEach(users, (user) => {
                output.push(UserTransformer._transform(user));
            });
            return output;
        } else {
            return UserTransformer._transform(users);
        }
    },
    _transform: (user) => {
        if (!user) {
            return {};
        }
        let user_status = (user.status === 1) ? 'active' : 'disabled';

        let host_documents = [];
        if (user.documents) {
            user.documents.map((document) => {
                host_documents.push(Helper.userDocumentURL(document.url));
            });
        }
        return {
            id: user._id,
            status: user_status,
            name: user.name,
            email: user.email,
            password: (user.password) ? true : false,
            phone: user.phone || '',
            gender: user.gender || '',
            birthday: user.birthday || '',
            type: user.type || 1,
            meta: user.meta || {},
            address: user.address || '',
            geo: user.geo || {
                place: '',
                lat: '',
                lng: '',
            },
            phone_verified: user.phone_verified ? true : false,
            // phone_verified: user.phone_verified && user.phone_verified === true ? true : false,
            documents: host_documents,
            profile_picture: user.profile_picture ? Helper.avatarURL(user.profile_picture) : null,
            resource_url: Helper.resource(`/users/${user._id}`),
        };
    }
}

module.exports =  UserTransformer;
