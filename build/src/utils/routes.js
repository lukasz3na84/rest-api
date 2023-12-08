"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controller/user.controller");
const validateResources_1 = __importDefault(require("../middleware/validateResources"));
const user_schema_1 = require("../schema/user.schema");
const session_schema_1 = __importDefault(require("../schema/session.schema"));
const session_controller_1 = require("../controller/session.controller");
const requireUser_1 = __importDefault(require("../middleware/requireUser"));
const product_schema_1 = require("../schema/product.schema");
const product_controller_1 = require("../controller/product.controller");
function default_1(app) {
    app.get('/healthcheck', (req, res) => res.sendStatus(200));
    //Register user
    app.post('/api/users', (0, validateResources_1.default)(user_schema_1.createUserSchema), user_controller_1.createUserHandler);
    // POST /api/user
    //Login
    // POST /api/sessions
    app.post('/api/sessions', (0, validateResources_1.default)(session_schema_1.default), session_controller_1.createUserSessionHandler);
    //get user's sesions
    // GET /api/sessions
    app.get('/api/sessions', requireUser_1.default, session_controller_1.getUserSessionsHandler);
    //logout
    // DELETE /api/sessions
    app.delete('/api/sessions', requireUser_1.default, session_controller_1.deleteSessionsHandler);
    app.post('/api/products', [requireUser_1.default, (0, validateResources_1.default)(product_schema_1.createProductSchema)], product_controller_1.createProductHandler);
    app.put('/api/products/:productId', [requireUser_1.default, (0, validateResources_1.default)(product_schema_1.updateProductSchema)], product_controller_1.updateProductHandler);
    app.get('/api/products/:productId', [requireUser_1.default, (0, validateResources_1.default)(product_schema_1.getProductSchema)], product_controller_1.getProductHandler);
    app.delete('/api/products/:productId', [requireUser_1.default, (0, validateResources_1.default)(product_schema_1.deleteProductSchema)], product_controller_1.deleteProductHandler);
}
exports.default = default_1;
