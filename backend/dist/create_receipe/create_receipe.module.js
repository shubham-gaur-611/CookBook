"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReceipeModule = void 0;
const common_1 = require("@nestjs/common");
const create_receipe_service_1 = require("./create_receipe.service");
const create_receipe_controller_1 = require("./create_receipe.controller");
const sequelize_1 = require("@nestjs/sequelize");
const create_receipe_model_1 = require("./create_receipe.model");
let CreateReceipeModule = class CreateReceipeModule {
};
exports.CreateReceipeModule = CreateReceipeModule;
exports.CreateReceipeModule = CreateReceipeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([create_receipe_model_1.Create_Receipe]),
        ],
        providers: [create_receipe_service_1.CreateReceipeService],
        controllers: [create_receipe_controller_1.CreateReceipeController]
    })
], CreateReceipeModule);
//# sourceMappingURL=create_receipe.module.js.map