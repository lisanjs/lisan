/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
const users = [
  {
    caption: 'yatki',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/docusaurus.svg'.
    image:
      'https://avatars3.githubusercontent.com/u/26697004?s=400&u=c6bf16e1dcecfdbc440fee6855900d0d37ebcb92&v=4',
    infoLink: 'https://github.com/yatki',
    pinned: true,
  },
];

const siteConfig = {
  title: 'Lisan', // Title for your website.
  tagline: 'A blazing fast and super small i18n library for Javascript',
  url: 'https://lisanjs.com', // Your website URL
  baseUrl: '/', // Base URL for your project */
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  editUrl: 'https://github.com/lisanjs/lisan/edit/development/docs/',

  cname: 'lisanjs.com',

  // Used for publishing and more
  projectName: 'lisan',
  organizationName: 'lisanjs',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    { doc: 'what-is-lisan', label: 'Docs' },
    { page: 'try-it-out', label: 'Try it out' },
    { href: 'https://github.com/lisanjs/examples', label: 'Examples' },
    // { doc: 'examples/react', label: 'Tutorials' },
    // { search: true },
    // Links to href destination
    { href: 'https://github.com/lisanjs/lisan', label: 'GitHub' },
  ],

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: 'img/logo/lisan-512.png',
  footerIcon: 'img/logo/lisan-512.png',
  favicon: 'img/logo/lisan-512.png',

  /* Colors for website */
  colors: {
    primaryColor: '#02728e',
    secondaryColor: '#63CCC1',
  },

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  // copyright: `Copyright © ${new Date().getFullYear()} Lisan`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'darcula',
  },
  usePrism: ['jsx'],

  // Add custom scripts here that would be placed in <script> tags.
  scripts: [
    '/js/buttons.js',
    '/js/clipboard.min.js',
    '/js/highlight.min.js',
    '/js/code-block-buttons.js',
    '/js/external-links.js',
  ],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/lisan-og.png',
  twitterImage: 'img/lisan-og.png',

  // Show documentation's last contributor's name.
  enableUpdateBy: false,

  // Show documentation's last update time.
  enableUpdateTime: true,

  scrollToTop: true,

  docsSideNavCollapsible: false,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  repoUrl: 'https://github.com/lisanjs/lisan',
};

module.exports = siteConfig;
