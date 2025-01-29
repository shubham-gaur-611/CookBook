"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteReceipeController = void 0;
const common_1 = require("@nestjs/common");
const favorite_receipe_service_1 = require("./favorite_receipe.service");
const get_user_decorator_1 = require("../common/decorators/get-user.decorator");
let FavoriteReceipeController = class FavoriteReceipeController {
    constructor(favoritereceipeservice) {
        this.favoritereceipeservice = favoritereceipeservice;
    }
    async create(body) {
        return await this.favoritereceipeservice.create(body.receip_id, body.favorite_by);
    }
    async findReceipe(id) {
        return await this.favoritereceipeservice.findReceipes(id);
    }
    async deleteReceipe(id, user) {
        return this.favoritereceipeservice.deleteReceipe(id, user);
    }
};
exports.FavoriteReceipeController = FavoriteReceipeController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FavoriteReceipeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FavoriteReceipeController.prototype, "findReceipe", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], FavoriteReceipeController.prototype, "deleteReceipe", null);
exports.FavoriteReceipeController = FavoriteReceipeController = __decorate([
    (0, common_1.Controller)('favorite-receipe'),
    __metadata("design:paramtypes", [favorite_receipe_service_1.FavoriteReceipeService])
], FavoriteReceipeController);
//# sourceMappingURL=favorite_receipe.controller.js.map