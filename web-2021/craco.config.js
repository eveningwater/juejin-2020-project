module.exports = {
    style: {
      sass: {
        loaderOptions: {
          additionalData: `
            @import "src/style/color.scss";
            @import "src/style/variable.scss";
          `,
        },
      },
    },
  };