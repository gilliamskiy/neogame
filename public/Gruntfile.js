module.exports = function (grunt) {

    // Initializes the Grunt tasks with the following settings
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        less: {
            development: {
                options: {
                    paths: ["less/"]
                },
                files: {
                    'less/style.css': 'less/style.less',
                    'less/style_games.css': 'less/p_page_slot.less',
                    'mobile/less/style_mobile.css': 'mobile/less/main.less'

                }
            }
        },
        cssmin: {

            development: {
                files: {
                    '../../../web/assets/vendor/checkbox/styleCheckbox.min.css': [
                        'vendor/checkbox/style.css'

                    ],
                    '../../../web/assets/vendor/selectbox/styleSelectbox.min.css': [
                        'vendor/selectbox/styleSelectbox.css'

                    ],
                    '../../../web/assets/css/style.min.css': [
                        'less/style.css'

                    ],
                    '../../../web/assets/css/style_games.min.css': [
                        'less/style_games.css'

                    ],
                    '../../../web/assets/vendor/sample/styles/style.min.css': [
                        'vendor/sample/styles/style.css'

                    ],
                    '../../../web/assets/css/style_mobile.min.css': [
                        'mobile/less/style_mobile.css'

                    ],
                    '../../../web/assets/vendor/flex/flexslider.min.css': [
                        'vendor/flex/flexslider.css'

                    ]

                }
            }
        },
        uglify: {
            dist: {
                files: {
                    '../../../web/assets/js/jquery.flexslider-min.js': ['js/jquery.flexslider-min.js'],
                    '../../../web/assets/js/document.min.js': ['js/document.js'],
                    '../../../web/assets/js/jquery.form.min.js': ['js/jquery.form.js'],
                    '../../../web/assets/js/reflex.min.js': ['js/reflex.js'],
                    '../../../web/assets/js/main.min.js': ['js/main.js'],
                    '../../../web/assets/js/jquery.validate.min.js': ['js/jquery.validate.js'],
                    '../../../web/assets/js/url.min.js': ['js/url.min.js'],
                    '../../../web/assets/js/jquery.cookie.js': ['js/jquery.cookie.js'],
                    '../../../web/assets/js/main_mobile.min.js': ['mobile/js/main.js'],
                    '../../../web/assets/js/jquery.maskedinput.min.js': ['js/jquery.maskedinput.min.js'],
                    '../../../web/assets/vendor/selectbox/jquery.selectbox.min.js': ['vendor/selectbox/jquery.selectbox.min.js']
                }
            }

        },
        copy: {
            images: {
                files: [
                    // Frontend images
                    //{
                    //    expand: true,
                    //    cwd: 'images/icon_img/',
                    //    src: '**',
                    //    dest: '../../../web/'},
                    //{
                    //    expand: true,
                    //    cwd: 'images/bonus_img/',
                    //    src: '**',
                    //    dest: '../../../web/assets/images/bonus_img/'},
                    //{
                    //    expand: true,
                    //    cwd: 'images/pay/',
                    //    src: '**',
                    //    dest: '../../../web/assets/images/pay/'},
                    //{
                    //    expand: true,
                    //    cwd: 'images/play_system/',
                    //    src: '**',
                    //    dest: '../../../web/assets/images/play_system/'},
                    //{
                    //    expand: true,
                    //    cwd: 'images/g_img/',
                    //    src: '**',
                    //    dest: '../../../web/assets/images/g_img/'},
                    {
                        expand: true,
                        cwd: 'images/',
                        src: '**',
                        dest: '../../../web/assets/images/'},
                    {
                        expand: true,
                        cwd: 'temp/',
                        src: '**',
                        dest: '../../../web/assets/temp/'},
                    {
                        expand: true,
                        cwd: 'vendor/sample',
                        src: '**',
                        dest: '../../../web/assets/vendor/sample'},
                    {
                        expand: true,
                        cwd: 'vendor/bootstrap',
                        src: '**',
                        dest: '../../../web/assets/vendor/bootstrap'},
                    {
                        expand: true,
                        cwd: 'vendor/build',
                        src: '**',
                        dest: '../../../web/assets/vendor/build'},
                    {
                        expand: true,
                        cwd: 'fonts',
                        src: '**',
                        dest: '../../../web/assets/fonts'},
                    {
                        expand: true,
                        cwd: 'mobile/mobile_img/',
                        src: '**',
                        dest: '../../../web/assets/mobile_img/'}

                ]

            }
            //jquery: {
            //    files: [

                    //{
                    //    expand: true,
                    //    cwd: 'js',
                    //    src: '**',
                    //    dest: '../../../web/assets/js/'}

                    //{expand: true, cwd: 'transl/ApiBundle/translations',
                    //    src: '**', dest: '../../../src/CasinoCms/ApiBundle/Resources/translations'},
                    //{expand: true, cwd: 'transl/ArticleBundle/translations',
                    //    src: '**', dest: '../../../src/CasinoCms/ArticleBundle/Resources/translations'},
                    //{expand: true, cwd: 'transl/BonusBundle/translations',
                    //    src: '**', dest: '../../../src/CasinoCms/BonusBundle/Resources/translations'},
                    //{expand: true, cwd: 'transl/DocumentBundle/translations',
                    //    src: '**', dest: '../../../src/CasinoCms/DocumentBundle/Resources/translations'},
                    //{expand: true, cwd: 'transl/FrontendBundle/translations',
                    //    src: '**', dest: '../../../src/CasinoCms/FrontendBundle/Resources/translations'},
                    //{expand: true, cwd: 'transl/GameBundle/translations',
                    //    src: '**', dest: '../../../src/CasinoCms/GameBundle/Resources/translations'},
                    //{expand: true, cwd: 'transl/LotteryBundle/translations',
                    //    src: '**', dest: '../../../src/CasinoCms/LotteryBundle/Resources/translations'},
                    //{expand: true, cwd: 'transl/NewsBundle/translations',
                    //    src: '**', dest: '../../../src/CasinoCms/NewsBundle/Resources/translations'},
                    //{expand: true, cwd: 'transl/NotificationBundle/translations',
                    //    src: '**', dest: '../../../src/CasinoCms/NotificationBundle/Resources/translations'},
                    //{expand: true, cwd: 'transl/PageBundle/translations',
                    //    src: '**', dest: '../../../src/CasinoCms/PageBundle/Resources/translations'},
                    //{expand: true, cwd: 'transl/PaymentBundle/translations',
                    //    src: '**', dest: '../../../src/CasinoCms/PaymentBundle/Resources/translations'},
                    //{expand: true, cwd: 'transl/PromotionBundle/translations',
                    //    src: '**', dest: '../../../src/CasinoCms/PromotionBundle/Resources/translations'},
                    //{expand: true, cwd: 'transl/TournamentBundle/translations',
                    //    src: '**', dest: '../../../src/CasinoCms/TournamentBundle/Resources/translations'},
                    //{expand: true, cwd: 'transl/UserBundle/translations',
                    //    src: '**', dest: '../../../src/CasinoCms/UserBundle/Resources/translations'}

            //    ]
            //}
        },


        watch: {
            options: {
                livereload:true
            },
            scripts: {
                files: ['less/*.less', 'js/*.js','mobile/less/*.less','mobile/js/*.js'],
                tasks: ['process']
            }
        }

        //imagemin: {
        //    png: {
        //        options: {
        //            optimizationLevel: 7
        //        },
        //        files: [
        //            {
        //                expand: true,
        //                cwd: 'images/',
        //                src: ['**/*.png'],
        //                dest: '../../../web/assets/images/',
        //                ext: '.png'
        //            },
        //            {
        //
        //                expand: true,
        //                cwd: 'temp/',
        //                src: ['**/*.png'],
        //                dest: '../../../web/assets/temp/',
        //                ext: '.png'
        //            }
        //        ]
        //    },
        //    jpg: {
        //        options: {
        //            progressive: true
        //        },
        //        files: [
        //            {
        //                expand: true,
        //                cwd: 'images/',
        //                src: ['**/*.jpg'],
        //                dest: '../../../web/assets/images/',
        //                ext: '.jpg'
        //            },
        //            {
        //                expand: true,
        //                cwd: 'temp/',
        //                src: ['**/*.jpg'],
        //                dest: '../../../web/assets/temp/',
        //                ext: '.jpg'
        //            }
        //        ]
        //    }
        //}
    });

    // Load the plugins that provide the tasks we specified in package.json.
//    grunt.loadNpmTasks('grunt-contrib-jshint');
//    grunt.loadNpmTasks('grunt-contrib-concat');
//    grunt.loadNpmTasks('grunt-contrib-uglify');
//    grunt.loadNpmTasks('grunt-contrib-watch');
//    grunt.loadNpmTasks('grunt-contrib-less');
//    grunt.loadNpmTasks('grunt-contrib-cssmin');




//    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-newer');

    grunt.registerTask('process', ['less', 'newer:cssmin', 'newer:uglify']);
    grunt.registerTask('default', ['less', 'cssmin', 'uglify', 'copy', 'watch']);
    grunt.registerTask('deploy', ['less', 'cssmin', 'uglify', 'copy']);

};