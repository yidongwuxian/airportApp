var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
var Contacts = /** @class */ (function () {
    function Contacts(http) {
        this.http = http;
    }
    /**
     * Get contacts data
     * @returns {Promise<TResult|T>}
     */
    Contacts.prototype.getContacts = function (dataUrl) {
        return this.http.get(dataUrl)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(function (err) {
            return Promise.reject(err);
        });
    };
    /**
     * Grouping contacts
     * @param array
     * @returns {any}
     */
    Contacts.prototype.grouping = function (array) {
        var groupContacts = [];
        var letterStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (array.length <= 0)
            return [];
        // Create a parent container
        groupContacts = letterStr.split('')
            .map(function (str) {
            return {
                groupName: str,
                contacts: []
            };
        });
        // Push into the correct group
        groupContacts.forEach(function (item) {
            for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
                var i = array_1[_i];
                if (i.pinyin[0].toUpperCase() === item.groupName) {
                    item.contacts.push(i);
                }
                else if (letterStr.indexOf(i.pinyin[0].toUpperCase()) === -1) {
                    groupContacts[groupContacts.length - 1].contacts.push(i);
                }
            }
        });
        var tempContacts = [];
        tempContacts.push({
            groupName: '#',
            contacts: []
        }, {
            groupName: '热门',
            contacts: []
        });
        groupContacts.forEach(function (item) {
            if (item.contacts.length != 0) {
                tempContacts.push(item);
            }
        });
        return tempContacts;
    };
    Contacts = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], Contacts);
    return Contacts;
}());
export { Contacts };
//# sourceMappingURL=contacts.service.js.map