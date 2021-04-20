"use strict";
// Descriptive error types for common issues which may arise
// during the operation of BitGoJS or BitGoExpress
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// Each subclass needs the explicit Object.setPrototypeOf() so that instanceof will work correctly.
// See https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
var bitgo_1 = require("bitgo");
var TlsConfigurationError = /** @class */ (function (_super) {
    __extends(TlsConfigurationError, _super);
    function TlsConfigurationError(message) {
        var _this = _super.call(this, message || 'TLS is configuration is invalid') || this;
        Object.setPrototypeOf(_this, TlsConfigurationError.prototype);
        return _this;
    }
    return TlsConfigurationError;
}(bitgo_1.Errors.BitGoJsError));
exports.TlsConfigurationError = TlsConfigurationError;
var NodeEnvironmentError = /** @class */ (function (_super) {
    __extends(NodeEnvironmentError, _super);
    function NodeEnvironmentError(message) {
        var _this = _super.call(this, message || 'NODE_ENV is invalid for the current bitgo environment') || this;
        Object.setPrototypeOf(_this, NodeEnvironmentError.prototype);
        return _this;
    }
    return NodeEnvironmentError;
}(bitgo_1.Errors.BitGoJsError));
exports.NodeEnvironmentError = NodeEnvironmentError;
var ApiResponseError = /** @class */ (function (_super) {
    __extends(ApiResponseError, _super);
    function ApiResponseError(message, status, result) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, ApiResponseError.prototype);
        _this.status = status;
        _this.result = result;
        return _this;
    }
    return ApiResponseError;
}(bitgo_1.Errors.BitGoJsError));
exports.ApiResponseError = ApiResponseError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Vycm9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsNERBQTREO0FBQzVELGtEQUFrRDs7Ozs7Ozs7Ozs7Ozs7O0FBRWxELG1HQUFtRztBQUNuRyxtSkFBbUo7QUFFbkosK0JBQStCO0FBRS9CO0lBQTJDLHlDQUFtQjtJQUM1RCwrQkFBbUIsT0FBUTtRQUEzQixZQUNFLGtCQUFNLE9BQU8sSUFBSSxpQ0FBaUMsQ0FBQyxTQUVwRDtRQURDLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSSxFQUFFLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxDQUFDOztJQUMvRCxDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQUFDLEFBTEQsQ0FBMkMsY0FBTSxDQUFDLFlBQVksR0FLN0Q7QUFMWSxzREFBcUI7QUFPbEM7SUFBMEMsd0NBQW1CO0lBQzNELDhCQUFtQixPQUFRO1FBQTNCLFlBQ0Usa0JBQU0sT0FBTyxJQUFJLHVEQUF1RCxDQUFDLFNBRTFFO1FBREMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFJLEVBQUUsb0JBQW9CLENBQUMsU0FBUyxDQUFDLENBQUM7O0lBQzlELENBQUM7SUFDSCwyQkFBQztBQUFELENBQUMsQUFMRCxDQUEwQyxjQUFNLENBQUMsWUFBWSxHQUs1RDtBQUxZLG9EQUFvQjtBQU9qQztJQUFzQyxvQ0FBbUI7SUFHdkQsMEJBQW1CLE9BQTJCLEVBQUUsTUFBYyxFQUFFLE1BQVk7UUFBNUUsWUFDRSxrQkFBTSxPQUFPLENBQUMsU0FJZjtRQUhDLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSSxFQUFFLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hELEtBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLEtBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDOztJQUN2QixDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBVEQsQ0FBc0MsY0FBTSxDQUFDLFlBQVksR0FTeEQ7QUFUWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBEZXNjcmlwdGl2ZSBlcnJvciB0eXBlcyBmb3IgY29tbW9uIGlzc3VlcyB3aGljaCBtYXkgYXJpc2VcclxuLy8gZHVyaW5nIHRoZSBvcGVyYXRpb24gb2YgQml0R29KUyBvciBCaXRHb0V4cHJlc3NcclxuXHJcbi8vIEVhY2ggc3ViY2xhc3MgbmVlZHMgdGhlIGV4cGxpY2l0IE9iamVjdC5zZXRQcm90b3R5cGVPZigpIHNvIHRoYXQgaW5zdGFuY2VvZiB3aWxsIHdvcmsgY29ycmVjdGx5LlxyXG4vLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9UeXBlU2NyaXB0LXdpa2kvYmxvYi9tYXN0ZXIvQnJlYWtpbmctQ2hhbmdlcy5tZCNleHRlbmRpbmctYnVpbHQtaW5zLWxpa2UtZXJyb3ItYXJyYXktYW5kLW1hcC1tYXktbm8tbG9uZ2VyLXdvcmtcclxuXHJcbmltcG9ydCB7IEVycm9ycyB9IGZyb20gJ2JpdGdvJztcclxuXHJcbmV4cG9ydCBjbGFzcyBUbHNDb25maWd1cmF0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvcnMuQml0R29Kc0Vycm9yIHtcclxuICBwdWJsaWMgY29uc3RydWN0b3IobWVzc2FnZT8pIHtcclxuICAgIHN1cGVyKG1lc3NhZ2UgfHwgJ1RMUyBpcyBjb25maWd1cmF0aW9uIGlzIGludmFsaWQnKTtcclxuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBUbHNDb25maWd1cmF0aW9uRXJyb3IucHJvdG90eXBlKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBOb2RlRW52aXJvbm1lbnRFcnJvciBleHRlbmRzIEVycm9ycy5CaXRHb0pzRXJyb3Ige1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihtZXNzYWdlPykge1xyXG4gICAgc3VwZXIobWVzc2FnZSB8fCAnTk9ERV9FTlYgaXMgaW52YWxpZCBmb3IgdGhlIGN1cnJlbnQgYml0Z28gZW52aXJvbm1lbnQnKTtcclxuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBOb2RlRW52aXJvbm1lbnRFcnJvci5wcm90b3R5cGUpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEFwaVJlc3BvbnNlRXJyb3IgZXh0ZW5kcyBFcnJvcnMuQml0R29Kc0Vycm9yIHtcclxuICBwdWJsaWMgcmVhZG9ubHkgc3RhdHVzOiBudW1iZXI7XHJcbiAgcHVibGljIHJlYWRvbmx5IHJlc3VsdDogYW55O1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcgfCB1bmRlZmluZWQsIHN0YXR1czogbnVtYmVyLCByZXN1bHQ/OiBhbnkpIHtcclxuICAgIHN1cGVyKG1lc3NhZ2UpO1xyXG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIEFwaVJlc3BvbnNlRXJyb3IucHJvdG90eXBlKTtcclxuICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzO1xyXG4gICAgdGhpcy5yZXN1bHQgPSByZXN1bHQ7XHJcbiAgfVxyXG59XHJcblxyXG4iXX0=