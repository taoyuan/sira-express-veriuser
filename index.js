"use strict";

var _defaults = require('lodash.defaults');
var veritoken = require('veritoken');

var DEFAULTS = {
    params: ['access_token'],
    headers: ['X-Access-Token', 'authorization'],
    cookies: ['access_token', 'authorization'],
    property: 'accessToken'
};

module.exports = function (sappOrModel, options) {
    if (!sappOrModel) throw new Error('sapp or model must not be null');
    var Model;
    if (typeof sappOrModel === 'function') {
        Model = sappOrModel;
    } else if (typeof sappOrModel.model === 'function' && sappOrModel.models) {
        Model = sappOrModel.model('AccessToken');
    } else {
        throw new Error('Invalid Arguments');
    }
    if (!Model) throw new Error('`AccessToken` model has not been found, please ensure to load sira-core module or ' +
        'a custom `AccessToken` model has been defined.');

    options = options || {};
    _defaults(options, DEFAULTS);

    return veritoken(options, function (tokenId, cb) {
        Model.findForId(tokenId, function (err, token) {
            cb(err, token);
        });
    });

};