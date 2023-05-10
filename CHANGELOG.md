# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased
### Added
- update dependencies
- use rimraf, npm-run-all and cross-env modules to make npm scripts more portable
- use aedes module to get a local running server, stop using online public server for testing
- node v16, v18 and v20 tested
## 0.2.4 - 2022-10-21
### Added
- Add mqtt based chat example.
- Call subscribe() in proper order in examples.

## 0.2.3 - 2022-10-19
### Added
- Add type checking test (uses tsd npm module).
- Use texts on badges instead of unicode logos

## 0.2.2 - 2022-10-18
### Added
- First release.
- Basic test added.
- Simple connection, subscribe and publish test added.
- Workflows for github actions CI. (very basic, uses free mqtt://test.mosquitto.org service) added.
- Coverage, badges on README added.
- Use async connection (connectAsync) from async-mqtt.
- Fix npm version link to badge.
