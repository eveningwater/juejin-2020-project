module.exports = {
    style: {
      sass: {
        loaderOptions: {
          additionalData: `
            @import "src/style/common/color.scss";
            @import "src/style/common/variable.scss";
            @import "src/style/common/common.scss";
          `,
        },
      },
    },
  };