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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../../src/app"));
//import routes from './routes/index';
const supertest_1 = __importDefault(require("supertest"));
const ImageProcessing_1 = require("../ImageProcessing");
describe('Testing the home page endpoint', function () {
    it('returns 200', function () {
        return __awaiter(this, void 0, void 0, function* () {
            // status code should be 200 `OK`
            yield (0, supertest_1.default)(app_1.default)
                .get('/')
                .expect(200);
        });
    });
});
describe('Testing the image processing endpoint', function () {
    it('returns 200', function () {
        return __awaiter(this, void 0, void 0, function* () {
            // status code should be 200 `OK`
            yield (0, supertest_1.default)(app_1.default)
                .get('/api?filename=img&height=50&width=50')
                .expect(200);
        });
    });
});
describe('Testing the image processing when the name of the image is not found ', function () {
    it('returns 404', function () {
        return __awaiter(this, void 0, void 0, function* () {
            // status code should be 400 `bad request`
            yield (0, supertest_1.default)(app_1.default)
                .get('/api?filename=imgg&height=a0&width=a50')
                .expect(404);
        });
    });
});
describe('Testing the image processing when all parameters are null', function () {
    it('returns 404', function () {
        return __awaiter(this, void 0, void 0, function* () {
            // status code should be 404 `not found`
            yield (0, supertest_1.default)(app_1.default)
                .get('/api?filename=&height=&width=')
                .expect(404);
        });
    });
});
describe('Testing the image processing', function () {
    it('No, errors, it returned the path', function () {
        return __awaiter(this, void 0, void 0, function* () {
            // status code should be 404 `not found`
            expect(() => __awaiter(this, void 0, void 0, function* () {
                yield (0, ImageProcessing_1.imageProcessing)('img', 200, 300);
            })).not.toThrow();
        });
    });
});
