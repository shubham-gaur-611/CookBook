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
exports.CreateReceipeController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const create_receipe_service_1 = require("./create_receipe.service");
const file_upload_helper_1 = require("../common/helpers/file-upload.helper");
const public_decorator_1 = require("../common/decorators/public.decorator");
const get_user_decorator_1 = require("../common/decorators/get-user.decorator");
let CreateReceipeController = class CreateReceipeController {
    constructor(createreceipeservices) {
        this.createreceipeservices = createreceipeservices;
    }
    async create(data, file) {
        if (file) {
            data.receip_image = `/assets/receipe_images/${file.filename}`;
        }
        return await this.createreceipeservices.create(data);
    }
    async findAll() {
        return await this.createreceipeservices.findAll();
    }
    async findReceipe(id) {
        return await this.createreceipeservices.findReceipe(id);
    }
    async findUserReceipe(id) {
        return await this.createreceipeservices.findUserReceipe(id);
    }
    async deleteReceipe(id, user) {
        return this.createreceipeservices.deleteReceipe(id, user);
    }
};
exports.CreateReceipeController = CreateReceipeController;
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('receip_image', {
        storage: file_upload_helper_1.storage,
        fileFilter: file_upload_helper_1.fileFilter,
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CreateReceipeController.prototype, "create", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('getreceipes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CreateReceipeController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CreateReceipeController.prototype, "findReceipe", null);
__decorate([
    (0, common_1.Get)('user-recipe/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CreateReceipeController.prototype, "findUserReceipe", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], CreateReceipeController.prototype, "deleteReceipe", null);
exports.CreateReceipeController = CreateReceipeController = __decorate([
    (0, common_1.Controller)('create-receipe'),
    __metadata("design:paramtypes", [create_receipe_service_1.CreateReceipeService])
], CreateReceipeController);
//# sourceMappingURL=create_receipe.controller.js.map