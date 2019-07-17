"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../entity/User");
const Category_1 = require("../../entity/Category");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const constants_1 = require("../../constants");
const registerUser = (_, { role, name, surname, email, birthday, password }) => __awaiter(this, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt.hash(password, 10);
    const user = User_1.User.create({
        email,
        birthday,
        password: hashedPassword,
        name,
        surname,
        role
    });
    const res = yield user.save();
    const token = jwt.sign({ id: user.id }, constants_1.JWT_KEY);
    return {
        token,
        user: res
    };
});
const login = (_, { email, password }) => __awaiter(this, void 0, void 0, function* () {
    const user = yield User_1.User.find({ where: { email } });
    if (!user.length)
        throw new Error("Email doesn't exist");
    const valid = yield bcrypt.compare(password, user[0].password);
    if (!valid)
        throw new Error("Wrong password !");
    const token = jwt.sign({ id: user[0].id }, constants_1.JWT_KEY);
    return {
        token,
        user: user[0]
    };
});
const registerProduct = (_, { name, price, ownerId, categoryId }) => __awaiter(this, void 0, void 0, function* () {
    const owner = User_1.User.find({ where: { id: ownerId } });
    const category = Category_1.Category.find({ where: { id: categoryId } });
    const product = ;
});
module.exports = {
    registerUser,
    login,
    registerProduct
};
//# sourceMappingURL=index.js.map