"use strict";

import gulp from "gulp";
import browsersync from "browser-sync";

gulp.task("server", () => {
    browsersync.init({
        server: ["./src", "./assets", "./"],
        port: 3000,
        index: "html/index.html",
        notify: false,
        open: false
    });

    global.isWatching = true;

    gulp.watch('src/styles/**/*.scss', gulp.parallel("style"));

});
