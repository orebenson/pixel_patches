"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropCollectionIfExists = void 0;
function dropCollectionIfExists(collection, db_connection) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collections = yield db_connection.db.listCollections().toArray();
            const collectionExists = collections.some(name => name.name === collection);
            if (collectionExists) {
                yield db_connection.db.dropCollection(collection);
                console.log(`${collection} collection found and dropped (dev only)`);
            }
            else {
                console.log("collection doesn't exist, creating new");
            }
        }
        catch (err) {
            console.error(err);
        }
    });
}
exports.dropCollectionIfExists = dropCollectionIfExists;
