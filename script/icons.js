import path from "path";
import camelcase from "camelcase";

export const icons = [
  {
    id: "ci",
    name: "Circum Icons",
    path: "circumIcons",
    logo: "/images/logo/circum-icons.png",
    contents: [
      {
        files: "icons/Circum-Icons/svg/*.svg"
      },
    ],
    projectUrl: "https://circumicons.com/",
    license: "MPL-2.0 license",
    licenseUrl:
      "https://github.com/Klarr-Agency/Circum-Icons/blob/main/LICENSE",
    source: {
      type: "git",
      localName: "Circum-Icons",
      remoteDir: "svg/",
      url: "https://github.com/Klarr-Agency/Circum-Icons.git",
      branch: "main",
      hash: "cec1364b5199f55e946a9a8360385a958b98cc60",
    },
  },
  //////// THIS SEEM TO ALREADY EXIXST NAME DOES NOT EXIST I.E FONT_AWESOME
  // {
  //   id: "fa",
  //   name: "Font Awesome 5",
  // path: "fontAwesomeIcons",

  //   contents: [
  //     {
  //       files: "icons/fontawesome/svgs/*.svg"
  //     },
  //   ],
  //   projectUrl: "https://fontawesome.com/",
  //   license: "CC BY 4.0 License",
  //   licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  //   source: {
  //     type: "git",
  //     localName: "Font-Awesome",
  //     remoteDir: "svgs/",
  //     url: "https://github.com/FortAwesome/Font-Awesome.git",
  //     branch: "5.x",
  //     hash: "afecf2af5d897b763e5e8e28d46aad2f710ccad6",
  //   },
  // },
  // // {
  // //   id: "io5",
  // path: "ionicons",
  // //   name: "Ionicons 5",
  // //   contents: [
  // //     {
  // //       files: 

  // //         "..node_modules/ionicons-5/dist/svg/*.svg"
  // //       
  // //       processWithSVGO: true,
  // //     },
  // //   ],
  // //   projectUrl: "https://ionicons.com/",
  // //   license: "MIT",
  // //   licenseUrl: "https://github.com/ionic-team/ionicons/blob/master/LICENSE",
  // // },

  // // ///////////////////////////////////////////
  {
    id: "md",
    path: "googleIcons",
    logo: "/images/logo/gfonts.png",
    name: "Material Design icons",
    contents: [
      {
        files: "icons/material-design-icons/src/24px.svg"
      },
    ],
    projectUrl: "http://google.github.io/material-design-icons/",
    license: "Apache License Version 2.0",
    licenseUrl:
      "https://github.com/google/material-design-icons/blob/master/LICENSE",
    source: {
      type: "git",
      localName: "material-design-icons",
      remoteDir: "src/",
      url: "https://github.com/google/material-design-icons.git",
      branch: "master",
      hash: "9beae745bb758f3ad56654fb377ea5cf62be4915",
    },
  },
  // // ////////////////////////////////////////////////
  {
    id: "ti",
    name: "Typicons",
    path: "typicons",
    logo: "/images/logo/typicons.png",
    contents: [
      {
        files: "icons/typicons/src/svg/*.svg"
      },
    ],
    projectUrl: "http://s-ings.com/typicons/",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    source: {
      type: "git",
      localName: "typicons",
      remoteDir: "src/svg/",
      url: "https://github.com/stephenhutchings/typicons.font.git",
      branch: "master",
      hash: "0aa64f6ce8b892a83aeeafa42c74fb9c1f22ec84",
    },
  },
  {
    id: "go",
    name: "Github Octicons icons",
    path: "octicons",
    logo: "/images/logo/octicons.png",
    contents: [
      {
        files: "icons/octicons/icons/*.svg"
      },
    ],
    source: {
      localName: "octicons",
      url: "https://github.com/primer/octicons.git",
      // UPDATE-----------------------------------
    },
    projectUrl: "https://octicons.github.com/",
    license: "MIT",
    licenseUrl: "https://github.com/primer/octicons/blob/master/LICENSE",
  },
  {
    id: "fi",
    name: "Feather",
    path: "featherIcons",
    logo: "/images/logo/feather-icons.png",
    contents: [
      {
        localName: "feather",
        files: "icons/feather/icons/*.svg"
      },
    ],
    projectUrl: "https://feathericons.com/",
    license: "MIT",
    licenseUrl: "https://github.com/feathericons/feather/blob/master/LICENSE",
    source: {
      localName: "feather",
      url: "https://github.com/feathericons/feather.git",
      // UPDATE-----------------------------------
    },
  },
  {
    id: "lu",
    name: "Lucide",
    path: "lucideIcons",
    logo: "/images/logo/lucide-icons.png",
    contents: [
      {
        files: "icons/lucide-static/icons/*.svg"
      },
    ],
    projectUrl: "https://lucide.dev/",
    license: "ISC",
    licenseUrl: "https://github.com/lucide-icons/lucide/blob/main/LICENSE",
    source: {
      localName: "lucide-static",
      url: "https://github.com/lucide-icons/lucide.git",
      // UPDATE-----------------------------------
    },
  },
  {
    id: "gi",
    name: "Game Icons",
    path: "gameIcons",
    logo: "/images/logo/game-icons.png",
    contents: [
      {
        files: "icons/game-icons-inverted/all-icons/*.svg"
      },
    ],
    projectUrl: "https://game-icons.net/",
    license: "CC BY 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
    source: {
      type: "git",
      localName: "game-icons-inverted",
      remoteDir: "all-icons/",
      url: "https://github.com/delacannon/game-icons-inverted.git",
      branch: "master",
      hash: "12920d6565588f0512542a3cb0cdfd36a497f910",
    },
  },
  {
    id: "wi",
    path: "weatherIcons",
    name: "Weather Icons",
    logo: "/images/logo/weather-icons.png",
    contents: [
      {
        files: "icons/weather-icons/svg/*.svg"
      },
    ],
    projectUrl: "https://erikflowers.github.io/weather-icons/",
    license: "SIL OFL 1.1",
    licenseUrl: "http://scripts.sil.org/OFL",
    source: {
      type: "git",
      localName: "weather-icons",
      remoteDir: "svg/",
      url: "https://github.com/erikflowers/weather-icons.git",
      branch: "master",
      hash: "bb80982bf1f43f2d57f9dd753e7413bf88beb9ed",
    },
  },
  {
    id: "di",
    path: "devicons",
    name: "Devicons",
    logo: "/images/logo/devicons.png",
    contents: [
      {
        files: "icons/devicons/!SVG/*.svg"
      },
    ],
    projectUrl: "https://vorillaz.github.io/devicons/",
    license: "MIT",
    licenseUrl: "https://opensource.org/licenses/MIT",
    source: {
      type: "git",
      localName: "devicons",
      remoteDir: "!SVG/",
      url: "https://github.com/vorillaz/devicons.git",
      branch: "master",
      hash: "ba75593fdf8d66496676a90cbf127d721f73e961",
    },
  },
  {
    id: "ai",
    path: "antDesignIcons",
    name: "Ant Design Icons",
    logo: "/images/logo/group.png",
    // This path has multiple icons in folder TODO
    contents: [
      {
        files:
          "icons/ant-design-icons/packages/icons-svg/svg/filled/*.svg"

      },
    ],
    projectUrl: "https://github.com/ant-design/ant-design-icons",
    license: "MIT",
    licenseUrl: "https://opensource.org/licenses/MIT",
    source: {
      type: "git",
      localName: "ant-design-icons",
      remoteDir: "packages/icons-svg/svg/",
      url: "https://github.com/ant-design/ant-design-icons.git",
      branch: "master",
      hash: "655d46ec72d78357d7c6c0ac1c623b8975bc4f76",
    },
  },
  // {
  //   id: "bs",
  // path: "bootstrapIcons",
  //   name: "Bootstrap Icons",
  //  logo: "/images/logo/bootstrap-icons.png",

  //   contents: [
  //     {
  //       files: 
  //         "icons/bootstrap/icons/*!(-reverse)-fill.svg"
  //       
  //     },
  //     {
  //       files: 
  //         "icons/bootstrap/icons/*-reverse!(-fill).svg"
  //       
  //     },
  //     {
  //       files: 
  //         "icons/bootstrap/icons/*!(-fill|-reverse|reverse-).svg"
  //       
  //     },
  //   ],
  //   projectUrl: "https://github.com/twbs/icons",
  //   license: "MIT",
  //   licenseUrl: "https://opensource.org/licenses/MIT",
  //   source: {
  //     type: "git",
  //     localName: "bootstrap",
  //     remoteDir: "icons/",
  //     url: "https://github.com/twbs/icons.git",
  //     branch: "main",
  //     hash: "92b6aee4c53aec1b5227360e0c9c63490b4b90c5",
  //   },
  // },
  {
    id: "ri",
    name: "Remix Icon",
    path: "radixIcons",
    logo: "/images/logo/remix-icons.png",
    contents: [
      {
        files: "icons/RemixIcon/icons/*.svg"
      },
    ],
    projectUrl: "https://github.com/Remix-Design/RemixIcon",
    license: "Apache License Version 2.0",
    licenseUrl: "http://www.apache.org/licenses/",
    source: {
      type: "git",
      localName: "RemixIcon",
      remoteDir: "icons/",
      url: "https://github.com/Remix-Design/RemixIcon.git",
      branch: "master",
      hash: "e252d6eac05b33a01c80794ffa0c745ed5d0b20e",
    },
  },
  {
    id: "fc",
    name: "Flat Color Icons",
    path: "flatColorIcons",
    logo: "/images/logo/flat-color-icons.png",
    contents: [
      {
        files: "icons/flat-color-icons/svg/*.svg",
        multiColor: true,
      },
    ],
    projectUrl: "https://github.com/icons8/flat-color-icons",
    license: "MIT",
    licenseUrl: "https://opensource.org/licenses/MIT",
    source: {
      type: "git",
      localName: "flat-color-icons",
      remoteDir: "svg/",
      url: "https://github.com/icons8/flat-color-icons.git",
      branch: "master",
      hash: "8eccbbbd8b2af1d2c9593e7cfba5ecb0d68ee378",
    },
  },
  {
    id: "gr",
    name: "Grommet-Icons",
    path: "grommetIcons",
    logo: "/images/logo/grommet-icons.png",
    contents: [
      {
        files: "icons/grommet-icons/public/img/*.svg"
      },
    ],
    projectUrl: "https://github.com/grommet/grommet-icons",
    license: "Apache License Version 2.0",
    licenseUrl: "http://www.apache.org/licenses/",
    source: {
      type: "git",
      localName: "grommet-icons",
      remoteDir: "public/img/",
      url: "https://github.com/grommet/grommet-icons.git",
      branch: "master",
      hash: "bfb635567739ba4303d72eefcc908f310eaec351",
    },
  },
  {
    id: "hi",
    name: "Heroicons",
    path: "heroicons",
    logo: "/images/logo/heroicons.png",
    contents: [
      {
        files: "icons/heroicons/optimized/*.svg"
      },
    ],
    projectUrl: "https://github.com/tailwindlabs/heroicons",
    license: "MIT",
    licenseUrl: "https://opensource.org/licenses/MIT",
    source: {
      type: "git",
      localName: "heroicons",
      remoteDir: "optimized/",
      url: "https://github.com/tailwindlabs/heroicons.git",
      branch: "v1",
      hash: "b6de5792d3d53ff81c71b1b8283463aad622e0e3",
    },
  },
  // {
  //   id: "hi2",
  //   name: "Heroicons 2",
  // path: "heroicons",
  // logo: "/images/logo/heroicons.png",
  //   contents: [
  //     {
  //       files: "icons/heroicons-2/optimized/24/solid/*.svg"
  //     },
  //     {
  //       files: 
  //         "icons/heroicons-2/optimized/24/outline/*.svg"
  //       
  //     },
  //     {
  //       files: "icons/heroicons-2/optimized/20/solid/*.svg"
  //     },
  //   ],
  //   projectUrl: "https://github.com/tailwindlabs/heroicons",
  //   license: "MIT",
  //   licenseUrl: "https://opensource.org/licenses/MIT",
  //   source: {
  //     type: "git",
  //     localName: "heroicons-2",
  //     remoteDir: "optimized/",
  //     url: "https://github.com/tailwindlabs/heroicons.git",
  //     branch: "master",
  //     hash: "9a17872e685bf48b83c047572c45617b6fd345e7",
  //   },
  // },
  {
    id: "si",
    name: "Simple Icons",
    path: "simpleIcons",
    logo: "/images/logo/simple-icons.jpeg",
    contents: [
      {
        files: "icons/simple-icons/icons/*.svg"
      },
    ],
    projectUrl: "https://simpleicons.org/",
    license: "CC0 1.0 Universal",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    source: {
      type: "git",
      localName: "simple-icons",
      remoteDir: "icons/",
      url: "https://github.com/simple-icons/simple-icons.git",
      branch: "develop",
      hash: "a1df74e8004f80d02a8023b8ef091610b9a1136c",
    },
  },
  {
    id: "sl",
    name: "Simple Line Icons",
    path: "simpleLineIcons",
    logo: "/images/logo/simple-line-icons.png",
    contents: [
      {
        files: "icons/simple-line-icons/src/svgs/*.svg"
      },
    ],
    projectUrl: "https://thesabbir.github.io/simple-line-icons/",
    license: "MIT",
    licenseUrl: "https://opensource.org/licenses/MIT",
    source: {
      type: "git",
      localName: "simple-line-icons",
      remoteDir: "src/svgs/",
      url: "https://github.com/thesabbir/simple-line-icons.git",
      branch: "master",
      hash: "f3ed94dd797bdcab52d6f27ba589aea4bb6f3e4d",
    },
  },
  {
    id: "im",
    name: "IcoMoon Free",
    path: "icoMoonIcons",
    logo: "/images/logo/ico-moon-icons.png",
    contents: [
      {
        files: "icons/icomoon-free/SVG/*.svg"
      },
    ],
    projectUrl: "https://github.com/Keyamoon/IcoMoon-Free",
    license: "CC BY 4.0 License",
    licenseUrl:
      "https://github.com/Keyamoon/IcoMoon-Free/blob/master/License.txt",
    source: {
      type: "git",
      localName: "IcoMoon-Free",
      remoteDir: "SVG/",
      url: "https://github.com/Keyamoon/IcoMoon-Free.git",
      branch: "master",
      hash: "d006795ede82361e1bac1ee76f215cf1dc51e4ca",
    },
  },
  {
    id: "bi",
    name: "BoxIcons",
    path: "boxIcons",
    logo: "/images/logo/boxicons.png",
    contents: [
      {
        files: "icons/boxicons/svg/*.svg"
      },
    ],
    projectUrl: "https://github.com/atisawd/boxicons",
    license: "MIT",
    licenseUrl: "https://github.com/atisawd/boxicons/blob/master/LICENSE",
    source: {
      type: "git",
      localName: "boxicons",
      remoteDir: "svg/",
      url: "https://github.com/atisawd/boxicons.git",
      branch: "master",
      hash: "9ffa9136e8681886bb7bd2145cd4098717ce1c11",
    },
  },
  {
    id: "cg",
    name: "css.gg",
    path: "cssGGIcons",
    logo: "/images/logo/cssgg.png",
    contents: [
      {
        files: "icons/css.gg/icons/svg/*.svg"
      },
    ],
    projectUrl: "https://github.com/astrit/css.gg",
    license: "MIT",
    licenseUrl: "https://opensource.org/licenses/MIT",
    source: {
      type: "git",
      localName: "css.gg",
      remoteDir: "icons/svg/",
      url: "https://github.com/astrit/css.gg.git",
      branch: "master",
      hash: "deea4fa5f39a2980d7586aed18d65cdba6fd85e3",
    },
  },
  {
    id: "vsc",
    path: "vsCodeIcons",
    name: "VS Code Icons",
    logo: "/images/logo/vscode-icons.png",
    contents: [
      {
        files: "icons/vscode-codicons/src/icons/*.svg"
      },
    ],
    projectUrl: "https://github.com/microsoft/vscode-codicons",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    source: {
      type: "git",
      localName: "vscode-codicons",
      remoteDir: "src/icons/",
      url: "https://github.com/microsoft/vscode-codicons.git",
      branch: "main",
      hash: "05f8886984a3f6ffa44e283928fae0e3c4cbe6c4",
    },
  },
  {
    id: "tb",
    name: "Tabler Icons",
    path: "tablerIcons",
    logo: "/images/logo/tabler-icons.png",
    contents: [
      {
        files: "icons/tabler-icons/icons/*.svg"
      },
    ],
    projectUrl: "https://github.com/tabler/tabler-icons",
    license: "MIT",
    licenseUrl: "https://opensource.org/licenses/MIT",
    source: {
      type: "git",
      localName: "tabler-icons",
      remoteDir: "icons/",
      url: "https://github.com/tabler/tabler-icons.git",
      branch: "main",
      hash: "4ec2a71d4faa6a9dab1228b97311391143324fb7",
    },
  },
  {
    id: "tfi",
    name: "Themify Icons",
    path: "themifyIcons",
    logo: "/images/logo/themify-icons.png",
    contents: [
      {
        files: "icons/themify-icons/SVG/*.svg"
      },
    ],
    projectUrl: "https://github.com/lykmapipo/themify-icons",
    license: "MIT",
    licenseUrl:
      "https://github.com/thecreation/standard-icons/blob/master/modules/themify-icons/LICENSE",
    source: {
      type: "git",
      localName: "themify-icons",
      remoteDir: "SVG/",
      url: "https://github.com/lykmapipo/themify-icons.git",
      branch: "master",
      hash: "9600186b24a7242f0e1e0a186983e6253301bb5d",
    },
  },
  // // {
  // //   id: "rx",
  // //   name: "Radix Icons",
  // path: "radixIcons",
  // logo: "/images/logo/radix-icons.png",

  // //   contents: [
  // //     {
  // //       files: 
  // //         "icons/radix-icons/packages/radix-icons/icons/*.svg"
  // //       
  // //     },
  // //   ],
  // //   projectUrl: "https://icons.radix-ui.com",
  // //   license: "MIT",
  // //   licenseUrl: "https://github.com/radix-ui/icons/blob/master/LICENSE",
  // //   source: {
  // //     type: "git",
  // //     localName: "radix-icons",
  // //     remoteDir: "packages/radix-icons/icons/",
  // //     url: "https://github.com/radix-ui/icons.git",
  // //     branch: "master",
  // //     hash: "94b3fcf4e972566b34cb3b3a36296f70a2558dfa",
  // //   },
  // // },
  // // {
  // //   id: "pi",
  // logo: "/images/logo/phosphor-icons.png",
  // path: "phosphorIcons",

  // //   name: "Phosphor Icons",
  // //   contents: [
  // //     {
  // //       files: "icons/phosphor-icons/assets/*/*.svg"
  // //     },
  // //   ],
  // //   projectUrl: "https://github.com/phosphor-icons/core",
  // //   license: "MIT",
  // //   licenseUrl: "https://github.com/phosphor-icons/core/blob/main/LICENSE",
  // //   source: {
  // //     type: "git",
  // //     localName: "phosphor-icons",
  // //     remoteDir: "assets/",
  // //     url: "https://github.com/phosphor-icons/core.git",
  // //     branch: "main",
  // //     hash: "fe23e2534cdb7bec24bd8e6bd99b3676bcf0d54f",
  // //   },
  // // },

  // // /////////// THis seem to already existt by LINE-AWESOME
  // // {
  // //   id: "lia",
  // logo: "/images/logo/line-awesome-icons.png",
  // path: "lineAwesomeIcons",
  // //   name: "Icons8 Line Awesome",
  // //   contents: [
  // //     {
  // //       files: "icons/line-awesome/svg/*.svg"
  // //     },
  // //   ],
  // //   projectUrl: "https://icons8.com/line-awesome",
  // //   license: "MIT",
  // //   licenseUrl: "https://github.com/icons8/line-awesome/blob/master/LICENSE.md",
  // //   source: {
  // //     type: "git",
  // //     localName: "line-awesome",
  // //     remoteDir: "svg/",
  // //     url: "https://github.com/icons8/line-awesome.git",
  // //     branch: "master",
  // //     hash: "78a101217707c9b1c4dcf2a821be75684e36307f",
  // //   },
  // // },
];
