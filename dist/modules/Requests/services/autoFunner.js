"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function autoRunner(component) {
    return new class extends component {
        start() {
            this.run();
        }
    };
}
exports.default = autoRunner;
//# sourceMappingURL=autoFunner.js.map