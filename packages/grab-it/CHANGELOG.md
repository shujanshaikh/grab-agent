# Changelog

All notable changes to this project will be documented in this file.


## 0.0.5
- Added more tools to the server
- Updated system prompt to be more accurate

## 0.0.4
- Updated to use remote server architecture
- CLI connects via WebSocket to remote server
- Browser client connects via HTTP/SSE to remote server

## 0.0.3
- Updated README with accurate architecture documentation
- Clarified remote server architecture (WebSocket for CLI, HTTP/SSE for browser client)
- Added CLI usage documentation and configuration examples
- Added custom server URL configuration option

## 0.0.2
- Updated to use remote server architecture
- CLI connects via WebSocket to remote server
- Browser client connects via HTTP/SSE to remote server

## 0.0.1
- Initial release of the Grab Agent CLI + server + browser bundle.
- Published under the package name `grab-agent` with bin aliases `grab-agent` and `grab-it`.
- Provides client integration via `grab-agent/client` and browser bundle `dist/client.global.js`.
- Default local server on port `5678`; CLI starts the server as a detached process.

