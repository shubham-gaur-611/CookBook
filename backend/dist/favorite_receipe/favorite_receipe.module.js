"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteReceipeModule = void 0;
const common_1 = require("@nestjs/common");
const favorite_receipe_controller_1 = require("./favorite_receipe.controller");
const favorite_receipe_service_1 = require("./favorite_receipe.service");
const sequelize_1 = require("@nestjs/sequelize");
const favorite_receipe_model_1 = require("./favorite_receipe.model");
const create_receipe_model_1 = require("../create_receipe/create_receipe.model");
let FavoriteReceipeModule = class FavoriteReceipeModule {
};
exports.FavoriteReceipeModule = FavoriteReceipeModule;
exports.FavoriteReceipeModule = FavoriteReceipeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([favorite_receipe_model_1.Favorite_Receipe, create_receipe_model_1.Create_Receipe]),
        ],
        controllers: [favorite_receipe_controller_1.FavoriteReceipeController],
        providers: [favorite_receipe_service_1.FavoriteReceipeService]
    })
], FavoriteReceipeModule);
//# sourceMappingURL=favorite_receipe.module.js.map