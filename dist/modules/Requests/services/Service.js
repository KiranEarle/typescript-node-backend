"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Service = (Class) => {
    const fire = () => {
        console.log('im like fire');
    };
    Object.assign(Class.prototype, { fire });
    console.log(Class.prototype);
    return class NewClass extends Class {
        hi() {
            console.log('Hi');
        }
    };
};
exports.default = Service;
//# sourceMappingURL=Service.js.map