'use strict'

module.exports = ShareFilterFactory

ShareFilterFactory.$inject = [
    '$q'
    , 'lodash'
    , 'iFetchCurrentUserDatasetPermissions'
]

function ShareFilterFactory($q, _, iFetchCurrentUserDatasetPermissions) {

    function ShareFilter(share) {
        var currentUser
            ;

        iFetchCurrentUserDatasetPermissions().then(setPermissions.bind(this))

        function setPermissions(datasetPermissions) {
            this.allowToEdit = datasetPermissions.edit
            this.share = _.isBoolean(share) ? share : this.allowToEdit
        }
    }

    return {
        create : function(params) {
            params = params || {}
            return new ShareFilter(params.share)
        }
    }
}
