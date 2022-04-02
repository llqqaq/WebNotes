
                (function (depsGraph) {
                    // require目的： 为了加载入口文件
                    function require(module) {
                        // 定义模块内部的require函数
                        function localRequire(relative) {
                            // 为了找到要引入模块的绝对路径，通过require加载
                            return require(depsGraph[module].deps[relativePath])
                        }
                        // 定义暴露对象（将来我们模块要暴露的内容）
                        var exports = {}

                        (function(require, exports, code) {
                            eval(code);
                        })(localRequire, export, depsGraph[module].code)

                        // 作为require函数的返回值返回出去
                        // 后面的require函数能得到暴露的内容
                        return  exports;
                    }

                    // 加载入口文件
                    require('./src/index.js')
                } )({"./src/index.js":{"code":"\"use strict\";\n\nvar _add = _interopRequireDefault(require(\"./add.js\"));\n\nvar _count = _interopRequireDefault(require(\"./count.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nconsole.log(index);\nconsole.log((0, _add[\"default\"])(1, 2));\nconsole.log((0, _count[\"default\"])(3, 1));","deps":{"./add.js":"D:\\myself-project\\WebNotes\\webpack\\webpack5\\11-myWebpack\\src\\add.js","./count.js":"D:\\myself-project\\WebNotes\\webpack\\webpack5\\11-myWebpack\\src\\count.js"}},"D:\\myself-project\\WebNotes\\webpack\\webpack5\\11-myWebpack\\src\\add.js":{"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar add = function add(a, b) {\n  return a + b;\n};\n\nvar _default = add;\nexports[\"default\"] = _default;","deps":{}},"D:\\myself-project\\WebNotes\\webpack\\webpack5\\11-myWebpack\\src\\third.js":{"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\nvar _default = {\n  demo: 1\n};\nexports[\"default\"] = _default;","deps":{}},"D:\\myself-project\\WebNotes\\webpack\\webpack5\\11-myWebpack\\src\\count.js":{"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _third = _interopRequireDefault(require(\"./third.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nconsole.log(_third[\"default\"]);\n\nvar count = function count(a, b) {\n  return a - b;\n};\n\nvar _default = count;\nexports[\"default\"] = _default;","deps":{"./third.js":"D:\\myself-project\\WebNotes\\webpack\\webpack5\\11-myWebpack\\src\\third.js"}}})
            