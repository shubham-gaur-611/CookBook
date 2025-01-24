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
exports.FavoriteReceipeService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const favorite_receipe_model_1 = require("./favorite_receipe.model");
const create_receipe_model_1 = require("../create_receipe/create_receipe.model");
let FavoriteReceipeService = class FavoriteReceipeService {
    constructor(favorite_receipeModel, create_receipeModel) {
        this.favorite_receipeModel = favorite_receipeModel;
        this.create_receipeModel = create_receipeModel;
    }
    async create(receip_id, favorite_by) {
        await this.favorite_receipeModel.create({ receip_id, favorite_by });
        return { message: "Done" };
    }
    async findReceipes(id) {
        const favReceipes = await this.favorite_receipeModel.findAll({
            where: { favorite_by: id },
            attributes: ['receip_id'],
        });
        const receipIds = favReceipes.map((fav) => fav.receip_id);
        const recipes = await this.create_receipeModel.findAll({
            where: { id: receipIds },
        });
        return recipes;
    }
    async deleteReceipe(id, email) {
        const receipe = await this.favorite_receipeModel.findOne({
            where: { receip_id: id, favorite_by: email }
        });
        if (!receipe) {
            throw new common_1.NotFoundException(`Favorite receipe with ID ${id} not found`);
        }
        await receipe.destroy();
        return { message: `Favorite receipe with ID ${id} has been deleted successfully` };
    }
};
exports.FavoriteReceipeService = FavoriteReceipeService;
exports.FavoriteReceipeService = FavoriteReceipeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(favorite_receipe_model_1.Favorite_Receipe)),
    __param(1, (0, sequelize_1.InjectModel)(create_receipe_model_1.Create_Receipe)),
    __metadata("design:paramtypes", [Object, Object])
], FavoriteReceipeService);
//# sourceMappingURL=favorite_receipe.service.js.map