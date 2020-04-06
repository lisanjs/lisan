/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const pre = '```';
const jsonExample = `${pre}js no-copy
// translations/main.en-US.json

{
  "locale": "en-US",
  "entries": {
    "helloWorld": "Hello World",
    "helloPerson": "Hello \${name}"
  }
}
${pre}`;

const jsExample = `${pre}js no-copy
// dictionaries/main.en-US.js

module.exports = {
  locale: "en-US",
  entries: {
    "helloWorld": "Hello World",
    "helloPerson": ({ name }) => \`Hello \${name}\`
  }
};
${pre}`;

const CodingExample = () => (
  <div className="coding-example">
    <div className="before">
      <MarkdownBlock>{jsonExample}</MarkdownBlock>
      <div>
        Store your translations as <strong>JSON</strong>,
      </div>
    </div>
    <div className="after">
      <MarkdownBlock>{jsExample}</MarkdownBlock>
      <div>
        Use them as pure JS <strong>functions</strong>.
      </div>
    </div>
  </div>
);

class HomeSplash extends React.Component {
  render() {
    const { siteConfig, language = '' } = this.props;
    const { baseUrl, docsUrl } = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
        <div className="homeSplashBottom">
          {siteConfig.tagline} - Only 1.7kb
        </div>
      </div>
    );

    const Logo = props => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Lisan" />
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        <span className="projectName">{siteConfig.title}</span>
        <small title="Internationalization, Reimagined.">
          i18n, Reimagined.
        </small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    const starMessages = [
      'Star us, bitte :)',
      'Join our Stargazers :)',
      'Twinkle, Twinkle, Little Star',
    ];

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    return (
      <SplashContainer>
        <div className="inner">
          <Logo img_src={`${baseUrl}img/logo/lisan-512.png`} />
          <ProjectTitle siteConfig={siteConfig} />
          <PromoSection>
            <Button href={docUrl('what-is-lisan')}>DOCS</Button>
            <Button href="/try-it-out">TRY COMPILER</Button>
            <Button href={docUrl('full-api-reference')}>API</Button>
          </PromoSection>
        </div>
        <div className="githubButton" style={{ minHeight: '20px' }}>
          <a
            className="github-button"
            href="https://github.com/lisanjs/lisan"
            data-icon="octicon-star"
            data-show-count="true"
            aria-label="Star lisanjs/lisan on GitHub"
          >
            {starMessages[getRandomInt(0, starMessages.length)]}
          </a>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const { config: siteConfig, language = '' } = this.props;
    const { baseUrl } = siteConfig;

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}
      >
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const Features = () => (
      <Block layout="fourColumn">
        {[
          {
            content:
              'Lisan is ~50x faster than traditional i18n libraries on average!',
            image: `${baseUrl}img/rocket.png`,
            imageAlign: 'top',
            title: 'Blazing Fast',
          },
          {
            content:
              'Lisan only provides plain Javascript objects and pure functions.',
            image: `${baseUrl}img/moyai.png`,
            imageAlign: 'top',
            title: 'Framework Agnostic',
          },
          {
            content:
              'Store your translations as separate dictionaries and load only the ones you need.',
            image: `${baseUrl}img/astronaut.png`,
            imageAlign: 'top',
            title: 'Modular',
          },
          {
            content:
              'Set Date/Time, Numbers, Currency formats for any region, with ease.',
            image: `${baseUrl}img/globe.png`,
            imageAlign: 'top',
            title: 'Pluralization & Localization',
          },
        ]}
      </Block>
    );

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <CodingExample />
          <Features />
        </div>
      </div>
    );
  }
}

module.exports = Index;
