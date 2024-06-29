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
exports.getPatchCount = exports.getPatchesByRange = exports.getAllPatches = exports.addPatch = void 0;
const patch_schema_1 = require("../schemas/patch-schema");
const log_utils_1 = require("../utils/log-utils");
const log = log_utils_1.Logger.getInstance();
function addPatch() {
    return __awaiter(this, arguments, void 0, function* (params = { username: null, patchPixelHexes: [] }) {
        const username = params.username ? params.username : null;
        const patchPixelHexes = params.patchPixelHexes;
        try {
            const patchExists = yield patch_schema_1.Patch.findOne({ patchPixelHexes: patchPixelHexes });
            if (!!patchExists)
                throw new Error('Patch already exists');
            const patch = new patch_schema_1.Patch({
                patchPixelHexes: patchPixelHexes,
                username: username
            });
            yield patch.save();
            return { status: 200, message: 'success saving patch', data: {} };
        }
        catch (error) {
            log.logError("Patch error: ", error);
            return { status: 500, message: 'error saving patch', data: {} };
        }
    });
}
exports.addPatch = addPatch;
function getAllPatches() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const patches = yield patch_schema_1.Patch.find({}).select('patchPixelHexes username -_id');
            return { status: 200, message: 'success getting patches', data: patches };
            ;
        }
        catch (error) {
            log.logError("Patch error: ", error);
            return { status: 500, message: 'error getting patches', data: {} };
            ;
        }
    });
}
exports.getAllPatches = getAllPatches;
function getPatchesByRange() {
    return __awaiter(this, arguments, void 0, function* (params = { start_index: 0, end_index: 0 }) {
        const start_index = parseInt(String(params.start_index), 10);
        let end_index = parseInt(String(params.end_index), 10);
        if (start_index === end_index)
            return { status: 200, message: 'success getting patches', data: [] };
        try {
            if (end_index < start_index) {
                throw new Error('end index is less than start index');
            }
            const totalDocuments = yield patch_schema_1.Patch.countDocuments({});
            if (start_index > totalDocuments) {
                throw new Error('start index is larger than the collection size');
            }
            if (end_index > totalDocuments) {
                end_index = totalDocuments;
            }
            const patches = yield patch_schema_1.Patch.find({})
                .sort({ date: -1 })
                .skip(start_index)
                .limit(end_index - start_index)
                .select('patchPixelHexes username -_id');
            return { status: 200, message: 'success getting patches', data: patches };
        }
        catch (error) {
            log.logError("Patch error: ", error);
            return { status: 500, message: 'error getting patches', data: {} };
        }
    });
}
exports.getPatchesByRange = getPatchesByRange;
function getPatchCount() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const patchCount = yield patch_schema_1.Patch.countDocuments({});
            return { status: 200, message: 'success getting patch count', data: { patchCount } };
        }
        catch (error) {
            log.logError("Patch error: ", error);
            return { status: 500, message: 'error getting patch count', data: {} };
            ;
        }
    });
}
exports.getPatchCount = getPatchCount;
