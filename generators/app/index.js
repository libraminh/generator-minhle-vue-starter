"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const mkdirp = require("mkdirp");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the ${chalk.red("MinhLe VueJS Starter")} generator!`)
    );

    const prompts = [
      {
        type: "input",
        name: "projectName",
        message: "What would you like to name your project?",
        default: "Vue Starter"
      },
      {
        type: "checkbox",
        name: "additional",
        message: "Which additional features would you like to include?",
        choices: [
          {
            name: "Vuex",
            value: "includeVuex",
            checked: true
          },
          {
            name: "Vue Router",
            value: "includeVueRouter",
            checked: true
          }
        ]
      },
      {
        type: "checkbox",
        name: "features",
        message: "Would you like to install these utility libraries?",
        choices: [
          {
            name: "Axios",
            value: "includeAxios",
            checked: true
          },
          {
            name: "Moment js",
            value: "includeMomentJs",
            checked: true
          },
          {
            name: "Jquery",
            value: "includeJquery",
            checked: true
          },
          {
            name: "Vue2 Animate",
            value: "includeVue2Animate",
            checked: true
          },
          {
            name: "FontAwesome 4",
            value: "includeFontAwesome",
            checked: true
          }
        ]
      }
    ];

    return this.prompt(prompts).then(answers => {
      const features = answers.features;
      const additional = answers.additional;
      const hasFeature = feat => features && features.indexOf(feat) !== -1;
      const hasAdditional = add => additional && additional.indexOf(add) !== -1;

      // manually deal with the response, get back and store the results.
      // we change a bit this way of doing to automatically do this in the self.prompt() method.
      this.includeAxios = hasFeature("includeAxios");
      this.includeMomentJs = hasFeature("includeMomentJs");
      this.includeJquery = hasFeature("includeJquery");
      this.includeVue2Animate = hasFeature("includeVue2Animate");
      this.includeFontAwesome = hasFeature("includeFontAwesome");
      this.includeVuex = hasAdditional("includeVuex");
      this.includeVueRouter = hasAdditional("includeVueRouter");
      this.projectName = answers.projectName;
    });
  }

  writing() {
    this.writePackageJSON();
    this.writeBabelrc();
    this.writingPostCss();
    this.writingWebpack();
    this.writingRouter();
    this.writingStore();
    this.writingMisc();
    this.writingIndexHtml();
    this.writingIndexJs();
  }

  writePackageJSON() {
    this.fs.copyTpl(
      this.templatePath("_package.json"),
      this.destinationPath("package.json"),
      {
        includeAxios: this.includeAxios,
        includeMomentJs: this.includeMomentJs,
        includeJquery: this.includeJquery,
        includeFontAwesome: this.includeFontAwesome,
        includeVue2Animate: this.includeVue2Animate,
        includeVueRouter: this.includeVueRouter,
        includeVuex: this.includeVuex
      }
    );
  }

  writeBabelrc() {
    this.fs.copyTpl(
      this.templatePath("babelrc"),
      this.destinationPath(".babelrc")
    );
  }

  writingPostCss() {
    this.fs.copyTpl(
      this.templatePath("postcss.config.js"),
      this.destinationPath("postcss.config.js")
    );
  }

  writingWebpack() {
    this.fs.copyTpl(
      this.templatePath("webpack.config.js"),
      this.destinationPath("webpack.config.js"),
      {
        includeAxios: this.includeAxios,
        includeJquery: this.includeJquery,
        includeFontAwesome: this.includeFontAwesome,
        includeVue2Animate: this.includeVue2Animate,
        includeVueRouter: this.includeVueRouter,
        includeVueRouter: this.includeVueRouter
      }
    );
  }

  writingRouter() {
    if(this.includeVueRouter) {
      this.fs.copyTpl(
        this.templatePath("src/router.js"),
        this.destinationPath("src/router.js")
      );
    }
  }

  writingStore() {
    if(this.includeVuex) {
      this.fs.copyTpl(
        this.templatePath("src/store"),
        this.destinationPath("src/store")
      );
    }
  }

  writingIndexHtml() {
    this.fs.copyTpl(
      this.templatePath("src/index.html"),
      this.destinationPath("src/index.html"),
      {
        projectName: this.projectName
      }
    );
  }

  writingMisc() {
    mkdirp("src/assets");
    this.fs.copyTpl(
      this.templatePath("src/components"),
      this.destinationPath("src/components")
    );
    this.fs.copyTpl(
      this.templatePath("src/App.vue"),
      this.destinationPath("src/App.vue"),
      {
        includeVueRouter: this.includeVueRouter,
        includeVuex: this.includeVuex,
      }
    );
  }

  writingIndexJs() {
    this.fs.copyTpl(
      this.templatePath("src/index.js"),
      this.destinationPath("src/index.js"),
      {
        includeVueRouter: this.includeVueRouter,
        includeVuex: this.includeVuex,
        includeFontAwesome: this.includeFontAwesome,
        includeVue2Animate: this.includeVue2Animate
      }
    );
  }

  install() {
    this.installDependencies({
      bower: false
    });
  }
};
