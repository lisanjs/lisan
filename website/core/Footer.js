/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc) {
    const baseUrl = this.props.config.baseUrl;
    const docsUrl = this.props.config.docsUrl;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    return `${baseUrl}${docsPart}${doc}`;
  }

  pageUrl(doc) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + doc;
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="72"
                height="72"
              />
            )}
          </a>
          <div>
            <h5>Docs</h5>
            <a href={this.pageUrl('docs/what-is-lisan')}>About</a>
            <a href={this.pageUrl('docs/translations')}>Components</a>
            <a href={this.pageUrl('docs/lisan-plugins')}>Plugins</a>
            <a href={this.pageUrl('docs/pluralization')}>{'Guide & Tips'}</a>
            <a href={this.pageUrl('docs/full-api-reference')}>API Reference</a>
          </div>
          <div>
            <h5>Ecosystem</h5>
            <a href={this.pageUrl('docs/what-is-lisan#installation')}>Lisan</a>
            <a href={this.pageUrl('docs/what-is-lisan-locales')}>
              Lisan Locales
            </a>
            <a href={this.pageUrl('docs/what-is-lisan-compiler')}>
              Lisan Compiler
            </a>
            <a href={this.pageUrl('docs/what-is-lisan-cli')}>Lisan CLI</a>
            <a href={this.pageUrl('docs/lisan-plugin-l10n')}>
              Localization Plugin
            </a>
            <a href={this.pageUrl('docs/lisan-plugin-loader')}>Loader Plugin</a>
            <a
              href={
                'https://github.com/lisanjs/lisan/tree/master/packages/lisan-types'
              }
              target="_blank"
            >
              Lisan Types
            </a>
          </div>
          <div>
            <h5>More</h5>
            <a
              href="https://github.com/lisanjs/lisan"
              target="_blank"
              rel="noreferrer noopener"
            >
              Issues
            </a>
            <a href="https://github.com/">GitHub</a>
            <a
              className="github-button"
              href="https://github.com/lisanjs/lisan"
              data-icon="octicon-star"
              data-show-count="true"
              aria-label="Star lisanjs/lisan on GitHub"
            >
              Support Us
            </a>
          </div>
        </section>
      </footer>
    );
  }
}

module.exports = Footer;
