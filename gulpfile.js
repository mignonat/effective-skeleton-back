const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const forever = require('forever-monitor')
const insert = require('gulp-insert')
const gulpSync = require('gulp-sync')(gulp)

/****************** CONST ******************/

const app_index = './src/app/index.js'

/****************** FOREVER ******************/

gulp.task('run-forever', () => {
    return new (forever.Monitor)(app_index, {
        'env': {
            NODE_ENV : 'production', 
            APP_TYPE : 'back'
        },
        'killTree': true, //kills the entire child process tree on `exit`
    })
    .start()
})

/****************** NODEMON ******************/

const nodemon_ignore = [
    // nodemon is only listening for .js files
    'gulpfile.js', 'node-modules', 'src/test', '.git', 'package.json'
]

gulp.task('run-nodemon', () => {
    return nodemon({
            exec : 'node --debug', //node-inspector & node --inspect
            script : app_index,
            ext : 'js',
            env : {
                'NODE_ENV': 'development', 
                'APP_TYPE': 'back' 
            },
            ignore : nodemon_ignore
        })
})

/****************** BUILD ******************/

gulp.task('build-prod', gulpSync.sync([
    //TODO
]))

gulp.task('build-dev', gulpSync.sync([
    //TODO
]))

/****************** START ******************/

gulp.task('start-prod', gulpSync.sync([
    'run-forever'
]))

gulp.task('start-dev', gulpSync.sync([ 
    'run-nodemon'
]))