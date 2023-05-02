"use strict";

import gulp from "gulp";

const requireDir = require("require-dir");

requireDir("./tasks/");

export const development = gulp.series("clean",
    gulp.parallel(["sprite", "style"]),
    gulp.parallel("server"));

export const prod = gulp.series("clean", gulp.series(['sprite', 'style']));

export default development;
