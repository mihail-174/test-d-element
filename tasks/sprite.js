"use strict";

import gulp from "gulp";
import spritesmith from 'gulp.spritesmith';
import buffer from 'vinyl-buffer';
import merge from 'merge-stream';
// import browsersync from "browser-sync";

var spritesPaths = {
    icons: {
        images: 'assets/img/icons/*.png',
        imgName: 'sprite.png',
        cssName: '_sprites.scss',
        imgPath: '../img/sprite.png',
        scss: 'scss/helpers'
    }
}

gulp.task('sprite', function() {
    var spriteData = gulp.src(spritesPaths.icons.images).pipe(spritesmith({
        imgName: spritesPaths.icons.imgName,
        cssName: spritesPaths.icons.cssName,
        imgPath: spritesPaths.icons.imgPath,
        padding: 5,
    }));
    var imgStream = spriteData.img
    .pipe(buffer())
    .pipe(gulp.dest('assets/img'))
    var cssStream = spriteData.css
    .pipe(gulp.dest(spritesPaths.icons.scss))
    // .on("end", browsersync.reload);
    return merge(imgStream, cssStream);
});
