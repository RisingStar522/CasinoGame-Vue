"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var args_1 = require("./args");
function readEnvVar(name) {
    var deprecatedAliases = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        deprecatedAliases[_i - 1] = arguments[_i];
    }
    if (process.env[name] !== undefined) {
        return process.env[name];
    }
    for (var _a = 0, deprecatedAliases_1 = deprecatedAliases; _a < deprecatedAliases_1.length; _a++) {
        var deprecatedAlias = deprecatedAliases_1[_a];
        if (process.env[deprecatedAlias] !== undefined) {
            console.warn("warning: using deprecated environment variable '" + deprecatedAlias + "'. Please use the '" + name + "' environment variable instead.");
            return process.env[deprecatedAlias];
        }
    }
}
exports.ArgConfig = function (args) { return ({
    port: args.port,
    bind: args.bind,
    env: args.env,
    debugNamespace: args.debugnamespace,
    keyPath: args.keypath,
    crtPath: args.crtpath,
    logFile: args.logfile,
    disableSSL: args.disablessl,
    disableProxy: args.disableproxy,
    disableEnvCheck: args.disableenvcheck,
    timeout: args.timeout,
    customRootUri: args.customrooturi,
    customBitcoinNetwork: args.custombitcoinnetwork,
}); };
exports.EnvConfig = function () { return ({
    port: Number(readEnvVar('BITGO_PORT')),
    bind: readEnvVar('BITGO_BIND') || exports.DefaultConfig.bind,
    env: readEnvVar('BITGO_ENV') || exports.DefaultConfig.env,
    debugNamespace: (readEnvVar('BITGO_DEBUG_NAMESPACE') || '').split(','),
    keyPath: readEnvVar('BITGO_KEYPATH'),
    crtPath: readEnvVar('BITGO_CRTPATH'),
    logFile: readEnvVar('BITGO_LOGFILE'),
    disableSSL: readEnvVar('BITGO_DISABLE_SSL', 'BITGO_DISABLESSL', 'DISABLESSL', 'DISABLE_SSL') ?
        true : undefined,
    disableProxy: readEnvVar('BITGO_DISABLE_PROXY', 'DISABLE_PROXY') ? true : undefined,
    disableEnvCheck: readEnvVar('BITGO_DISABLE_ENV_CHECK', 'DISABLE_ENV_CHECK') ? true : undefined,
    timeout: Number(readEnvVar('BITGO_TIMEOUT')),
    customRootUri: readEnvVar('BITGO_CUSTOM_ROOT_URI'),
    customBitcoinNetwork: readEnvVar('BITGO_CUSTOM_BITCOIN_NETWORK'),
}); };
exports.DefaultConfig = {
    port: 3080,
    bind: 'localhost',
    env: 'test',
    debugNamespace: [],
    logFile: '',
    disableSSL: false,
    disableProxy: false,
    disableEnvCheck: false,
    timeout: 305 * 1000,
};
/**
 * Helper function to merge config sources into a single config object.
 *
 * Earlier configs have higher precedence over subsequent configs.
 */
function mergeConfigs() {
    var configs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        configs[_i] = arguments[_i];
    }
    function isNilOrNaN(val) {
        return lodash_1.isNil(val) || (lodash_1.isNumber(val) && isNaN(val));
    }
    // helper to get the first defined value for a given config key
    // from the config sources in a type safe manner
    function get(k) {
        return configs
            .reverse()
            .reduce(function (entry, config) { return !isNilOrNaN(config[k]) ? config[k] : entry; }, exports.DefaultConfig[k]);
    }
    return {
        port: get('port'),
        bind: get('bind'),
        env: get('env'),
        debugNamespace: get('debugNamespace'),
        keyPath: get('keyPath'),
        crtPath: get('crtPath'),
        logFile: get('logFile'),
        disableSSL: get('disableSSL'),
        disableProxy: get('disableProxy'),
        disableEnvCheck: get('disableEnvCheck'),
        timeout: get('timeout'),
        customRootUri: get('customRootUri'),
        customBitcoinNetwork: get('customBitcoinNetwork'),
    };
}
exports.config = function () {
    var arg = exports.ArgConfig(args_1.args());
    var env = exports.EnvConfig();
    return mergeConfigs(arg, env);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLGlDQUF5QztBQUV6QywrQkFBOEI7QUFFOUIsU0FBUyxVQUFVLENBQUMsSUFBSTtJQUFFLDJCQUFvQjtTQUFwQixVQUFvQixFQUFwQixxQkFBb0IsRUFBcEIsSUFBb0I7UUFBcEIsMENBQW9COztJQUM1QyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFO1FBQ25DLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMxQjtJQUVELEtBQThCLFVBQWlCLEVBQWpCLHVDQUFpQixFQUFqQiwrQkFBaUIsRUFBakIsSUFBaUIsRUFBRTtRQUE1QyxJQUFNLGVBQWUsMEJBQUE7UUFDeEIsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxLQUFLLFNBQVMsRUFBRTtZQUM5QyxPQUFPLENBQUMsSUFBSSxDQUFDLHFEQUFtRCxlQUFlLDJCQUFzQixJQUFJLG9DQUFpQyxDQUFDLENBQUM7WUFDNUksT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQ3JDO0tBQ0Y7QUFDSCxDQUFDO0FBa0JZLFFBQUEsU0FBUyxHQUFHLFVBQUMsSUFBSSxJQUFzQixPQUFBLENBQUM7SUFDbkQsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO0lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO0lBQ2YsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO0lBQ2IsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjO0lBQ25DLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztJQUNyQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87SUFDckIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO0lBQ3JCLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtJQUMzQixZ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QUNqQixJQUFJLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUNqQixHQUFHLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUNmLGNBQWMsRUFBRSxHQUFHLENBQUMsZ0JBQWdCLENBQUM7UUFDckMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxTQUFTLENBQUM7UUFDdkIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxTQUFTLENBQUM7UUFDdkIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxTQUFTLENBQUM7UUFDdkIsVUFBVSxFQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUM7UUFDN0IsWUFBWSxFQUFFLEdBQUcsQ0FBQyxjQUFjLENBQUM7UUFDakMsZUFBZSxFQUFFLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQztRQUN2QyxPQUFPLEVBQUUsR0FBRyxDQUFDLFNBQVMsQ0FBQztRQUN2QixhQUFhLEVBQUUsR0FBRyxDQUFDLGVBQWUsQ0FBQztRQUNuQyxvQkFBb0IsRUFBRSxHQUFHLENBQUMsc0JBQXNCLENBQUM7S0FDbEQsQ0FBQztBQUNKLENBQUM7QUFFWSxRQUFBLE1BQU0sR0FBRztJQUNwQixJQUFNLEdBQUcsR0FBRyxpQkFBUyxDQUFDLFdBQUksRUFBRSxDQUFDLENBQUM7SUFDOUIsSUFBTSxHQUFHLEdBQUcsaUJBQVMsRUFBRSxDQUFDO0lBQ3hCLE9BQU8sWUFBWSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNoQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnZpcm9ubWVudE5hbWUsIFYxTmV0d29yayB9IGZyb20gJ2JpdGdvJztcclxuaW1wb3J0IHsgaXNOaWwsIGlzTnVtYmVyIH0gZnJvbSAnbG9kYXNoJztcclxuXHJcbmltcG9ydCB7IGFyZ3MgfSBmcm9tICcuL2FyZ3MnO1xyXG5cclxuZnVuY3Rpb24gcmVhZEVudlZhcihuYW1lLCAuLi5kZXByZWNhdGVkQWxpYXNlcyk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XHJcbiAgaWYgKHByb2Nlc3MuZW52W25hbWVdICE9PSB1bmRlZmluZWQpIHtcclxuICAgIHJldHVybiBwcm9jZXNzLmVudltuYW1lXTtcclxuICB9XHJcblxyXG4gIGZvciAoY29uc3QgZGVwcmVjYXRlZEFsaWFzIG9mIGRlcHJlY2F0ZWRBbGlhc2VzKSB7XHJcbiAgICBpZiAocHJvY2Vzcy5lbnZbZGVwcmVjYXRlZEFsaWFzXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGNvbnNvbGUud2Fybihgd2FybmluZzogdXNpbmcgZGVwcmVjYXRlZCBlbnZpcm9ubWVudCB2YXJpYWJsZSAnJHtkZXByZWNhdGVkQWxpYXN9Jy4gUGxlYXNlIHVzZSB0aGUgJyR7bmFtZX0nIGVudmlyb25tZW50IHZhcmlhYmxlIGluc3RlYWQuYCk7XHJcbiAgICAgIHJldHVybiBwcm9jZXNzLmVudltkZXByZWNhdGVkQWxpYXNdO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDb25maWcge1xyXG4gIHBvcnQ6IG51bWJlcjtcclxuICBiaW5kOiBzdHJpbmc7XHJcbiAgZW52OiBFbnZpcm9ubWVudE5hbWU7XHJcbiAgZGVidWdOYW1lc3BhY2U6IHN0cmluZ1tdO1xyXG4gIGtleVBhdGg/OiBzdHJpbmc7XHJcbiAgY3J0UGF0aD86IHN0cmluZztcclxuICBsb2dGaWxlPzogc3RyaW5nO1xyXG4gIGRpc2FibGVTU0w6IGJvb2xlYW47XHJcbiAgZGlzYWJsZVByb3h5OiBib29sZWFuO1xyXG4gIGRpc2FibGVFbnZDaGVjazogYm9vbGVhbjtcclxuICB0aW1lb3V0OiBudW1iZXI7XHJcbiAgY3VzdG9tUm9vdFVyaT86IHN0cmluZztcclxuICBjdXN0b21CaXRjb2luTmV0d29yaz86IFYxTmV0d29yaztcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IEFyZ0NvbmZpZyA9IChhcmdzKTogUGFydGlhbDxDb25maWc+ID0+ICh7XHJcbiAgcG9ydDogYXJncy5wb3J0LFxyXG4gIGJpbmQ6IGFyZ3MuYmluZCxcclxuICBlbnY6IGFyZ3MuZW52LFxyXG4gIGRlYnVnTmFtZXNwYWNlOiBhcmdzLmRlYnVnbmFtZXNwYWNlLFxyXG4gIGtleVBhdGg6IGFyZ3Mua2V5cGF0aCxcclxuICBjcnRQYXRoOiBhcmdzLmNydHBhdGgsXHJcbiAgbG9nRmlsZTogYXJncy5sb2dmaWxlLFxyXG4gIGRpc2FibGVTU0w6IGFyZ3MuZGlzYWJsZXNzbCxcclxuICBkaXNhYmxlUHJveHk6IGFyZ3MuZGlzYWJsZXByb3h5LFxyXG4gIGRpc2FibGVFbnZDaGVjazogYXJncy5kaXNhYmxlZW52Y2hlY2ssXHJcbiAgdGltZW91dDogYXJncy50aW1lb3V0LFxyXG4gIGN1c3RvbVJvb3RVcmk6IGFyZ3MuY3VzdG9tcm9vdHVyaSxcclxuICBjdXN0b21CaXRjb2luTmV0d29yazogYXJncy5jdXN0b21iaXRjb2lubmV0d29yayxcclxufSk7XHJcblxyXG5leHBvcnQgY29uc3QgRW52Q29uZmlnID0gKCk6IFBhcnRpYWw8Q29uZmlnPiA9PiAoe1xyXG4gIHBvcnQ6IE51bWJlcihyZWFkRW52VmFyKCdCSVRHT19QT1JUJykpLFxyXG4gIGJpbmQ6IHJlYWRFbnZWYXIoJ0JJVEdPX0JJTkQnKSB8fCBEZWZhdWx0Q29uZmlnLmJpbmQsXHJcbiAgZW52OiAocmVhZEVudlZhcignQklUR09fRU5WJykgYXMgRW52aXJvbm1lbnROYW1lKSB8fCBEZWZhdWx0Q29uZmlnLmVudixcclxuICBkZWJ1Z05hbWVzcGFjZTogKHJlYWRFbnZWYXIoJ0JJVEdPX0RFQlVHX05BTUVTUEFDRScpIHx8ICcnKS5zcGxpdCgnLCcpLFxyXG4gIGtleVBhdGg6IHJlYWRFbnZWYXIoJ0JJVEdPX0tFWVBBVEgnKSxcclxuICBjcnRQYXRoOiByZWFkRW52VmFyKCdCSVRHT19DUlRQQVRIJyksXHJcbiAgbG9nRmlsZTogcmVhZEVudlZhcignQklUR09fTE9HRklMRScpLFxyXG4gIGRpc2FibGVTU0w6IHJlYWRFbnZWYXIoJ0JJVEdPX0RJU0FCTEVfU1NMJywgJ0JJVEdPX0RJU0FCTEVTU0wnLCAnRElTQUJMRVNTTCcsICdESVNBQkxFX1NTTCcpID9cclxuICAgIHRydWUgOiB1bmRlZmluZWQsXHJcbiAgZGlzYWJsZVByb3h5OiByZWFkRW52VmFyKCdCSVRHT19ESVNBQkxFX1BST1hZJywgJ0RJU0FCTEVfUFJPWFknKSA/IHRydWUgOiB1bmRlZmluZWQsXHJcbiAgZGlzYWJsZUVudkNoZWNrOiByZWFkRW52VmFyKCdCSVRHT19ESVNBQkxFX0VOVl9DSEVDSycsICdESVNBQkxFX0VOVl9DSEVDSycpID8gdHJ1ZSA6IHVuZGVmaW5lZCxcclxuICB0aW1lb3V0OiBOdW1iZXIocmVhZEVudlZhcignQklUR09fVElNRU9VVCcpKSxcclxuICBjdXN0b21Sb290VXJpOiByZWFkRW52VmFyKCdCSVRHT19DVVNUT01fUk9PVF9VUkknKSxcclxuICBjdXN0b21CaXRjb2luTmV0d29yazogKHJlYWRFbnZWYXIoJ0JJVEdPX0NVU1RPTV9CSVRDT0lOX05FVFdPUksnKSBhcyBWMU5ldHdvcmspLFxyXG59KTtcclxuXHJcbmV4cG9ydCBjb25zdCBEZWZhdWx0Q29uZmlnOiBDb25maWcgPSB7XHJcbiAgcG9ydDogMzA4MCxcclxuICBiaW5kOiAnbG9jYWxob3N0JyxcclxuICBlbnY6ICd0ZXN0JyxcclxuICBkZWJ1Z05hbWVzcGFjZTogW10sXHJcbiAgbG9nRmlsZTogJycsXHJcbiAgZGlzYWJsZVNTTDogZmFsc2UsXHJcbiAgZGlzYWJsZVByb3h5OiBmYWxzZSxcclxuICBkaXNhYmxlRW52Q2hlY2s6IGZhbHNlLFxyXG4gIHRpbWVvdXQ6IDMwNSAqIDEwMDAsXHJcbn07XHJcblxyXG4vKipcclxuICogSGVscGVyIGZ1bmN0aW9uIHRvIG1lcmdlIGNvbmZpZyBzb3VyY2VzIGludG8gYSBzaW5nbGUgY29uZmlnIG9iamVjdC5cclxuICpcclxuICogRWFybGllciBjb25maWdzIGhhdmUgaGlnaGVyIHByZWNlZGVuY2Ugb3ZlciBzdWJzZXF1ZW50IGNvbmZpZ3MuXHJcbiAqL1xyXG5mdW5jdGlvbiBtZXJnZUNvbmZpZ3MoLi4uY29uZmlnczogUGFydGlhbDxDb25maWc+W10pOiBDb25maWcge1xyXG4gIGZ1bmN0aW9uIGlzTmlsT3JOYU4odmFsOiB1bmtub3duKTogdmFsIGlzIG51bGwgfCB1bmRlZmluZWQgfCBudW1iZXIge1xyXG4gICAgcmV0dXJuIGlzTmlsKHZhbCkgfHwgKGlzTnVtYmVyKHZhbCkgJiYgaXNOYU4odmFsKSk7XHJcbiAgfVxyXG4gIC8vIGhlbHBlciB0byBnZXQgdGhlIGZpcnN0IGRlZmluZWQgdmFsdWUgZm9yIGEgZ2l2ZW4gY29uZmlnIGtleVxyXG4gIC8vIGZyb20gdGhlIGNvbmZpZyBzb3VyY2VzIGluIGEgdHlwZSBzYWZlIG1hbm5lclxyXG4gIGZ1bmN0aW9uIGdldDxUIGV4dGVuZHMga2V5b2YgQ29uZmlnPihrOiBUKTogQ29uZmlnW1RdIHtcclxuICAgIHJldHVybiBjb25maWdzXHJcbiAgICAgIC5yZXZlcnNlKClcclxuICAgICAgLnJlZHVjZSgoZW50cnk6IENvbmZpZ1tUXSwgY29uZmlnKSA9PiAhaXNOaWxPck5hTihjb25maWdba10pID8gY29uZmlnW2tdIGFzIENvbmZpZ1tUXSA6IGVudHJ5LCBEZWZhdWx0Q29uZmlnW2tdKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBwb3J0OiBnZXQoJ3BvcnQnKSxcclxuICAgIGJpbmQ6IGdldCgnYmluZCcpLFxyXG4gICAgZW52OiBnZXQoJ2VudicpLFxyXG4gICAgZGVidWdOYW1lc3BhY2U6IGdldCgnZGVidWdOYW1lc3BhY2UnKSxcclxuICAgIGtleVBhdGg6IGdldCgna2V5UGF0aCcpLFxyXG4gICAgY3J0UGF0aDogZ2V0KCdjcnRQYXRoJyksXHJcbiAgICBsb2dGaWxlOiBnZXQoJ2xvZ0ZpbGUnKSxcclxuICAgIGRpc2FibGVTU0w6IGdldCgnZGlzYWJsZVNTTCcpLFxyXG4gICAgZGlzYWJsZVByb3h5OiBnZXQoJ2Rpc2FibGVQcm94eScpLFxyXG4gICAgZGlzYWJsZUVudkNoZWNrOiBnZXQoJ2Rpc2FibGVFbnZDaGVjaycpLFxyXG4gICAgdGltZW91dDogZ2V0KCd0aW1lb3V0JyksXHJcbiAgICBjdXN0b21Sb290VXJpOiBnZXQoJ2N1c3RvbVJvb3RVcmknKSxcclxuICAgIGN1c3RvbUJpdGNvaW5OZXR3b3JrOiBnZXQoJ2N1c3RvbUJpdGNvaW5OZXR3b3JrJyksXHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9ICgpID0+IHtcclxuICBjb25zdCBhcmcgPSBBcmdDb25maWcoYXJncygpKTtcclxuICBjb25zdCBlbnYgPSBFbnZDb25maWcoKTtcclxuICByZXR1cm4gbWVyZ2VDb25maWdzKGFyZywgZW52KTtcclxufTtcclxuIl19