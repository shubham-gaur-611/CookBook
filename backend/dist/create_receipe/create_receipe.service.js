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
exports.CreateReceipeService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const create_receipe_model_1 = require("./create_receipe.model");
let CreateReceipeService = class CreateReceipeService {
    constructor(create_receipeModel) {
        this.create_receipeModel = create_receipeModel;
    }
    create(data) {
        return this.create_receipeModel.create(data);
    }
    findAll() {
        return this.create_receipeModel.findAll();
    }
    findRecipe(id) {
        const oneReceipe = this.create_receipeModel.findByPk(id);
        if (!oneReceipe) {
            throw new common_1.NotFoundException(`Receipe with ID ${id} not found`);
        }
        return oneReceipe;
    }
    async findUserRecipe(email) {
        try {
            const userReceipe = await this.create_receipeModel.findAll({
                where: { posted_by: email },
            });
            return userReceipe;
        }
        catch (error) {
            console.error('Error finding user recipes:', error);
            throw error;
        }
    }
    async deleteRecipe(id, email) {
        const receipe = await this.create_receipeModel.findOne({
            where: { id: id, posted_by: email },
        });
        if (!receipe) {
            throw new common_1.NotFoundException(`Favorite receipe with ID ${id} not found`);
        }
        await receipe.destroy();
        return {
            message: `Favorite receipe with ID ${id} has been deleted successfully`,
        };
    }
};
exports.CreateReceipeService = CreateReceipeService;
exports.CreateReceipeService = CreateReceipeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(create_receipe_model_1.Create_Receipe)),
    __metadata("design:paramtypes", [Object])
], CreateReceipeService);
//# sourceMappingURL=create_receipe.service.js.map