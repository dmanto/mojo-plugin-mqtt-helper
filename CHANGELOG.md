# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

## 0.4.0 - 2024-09-05
### Added
- Switched from `async-mqtt` to `mqtt` module for improved maintenance and performance.
- Updated method names to use asynchronous versions, see following list:
- Method `subscribe()` is now blocking, should be replaced by `await subscribeAsync()`.
- Method `unsubscribe()` is now blocking, should be replaced by `await unsubscribeAsync()`.
- Method `publish()` is now blocking, should be replaced by `await publishAsync()`.
- Method `end()` is now blocking, should be replaced by `await endAsync()`.
- The previous methods are blocking in the `mqtt` module.

## 0.3.0 - 2024-09-04
### Added
- runs latest versions of prettier and eslint
- node 22.x added to matrix tests
- uses mqtt module instead of async-mqtt

### Fixed
- issue with coverage:ci tests, running on node 22 fixes it
- wrong setting on env var for online tests
- does not depend on inflight module anymore (avoids potencial memory leaks)

## 0.2.5 - 2023-05-10
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
