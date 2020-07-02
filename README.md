cmd-a
=====



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/cmd-a.svg)](https://npmjs.org/package/cmd-a)
[![Downloads/week](https://img.shields.io/npm/dw/cmd-a.svg)](https://npmjs.org/package/cmd-a)
[![License](https://img.shields.io/npm/l/cmd-a.svg)](https://github.com/albovieira/cmd-a/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g cmd-a
$ cmd-a COMMAND
running command...
$ cmd-a (-v|--version|version)
cmd-a/0.0.0 linux-x64 node-v10.19.0
$ cmd-a --help [COMMAND]
USAGE
  $ cmd-a COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`cmd-a hello [FILE]`](#cmd-a-hello-file)
* [`cmd-a help [COMMAND]`](#cmd-a-help-command)

## `cmd-a hello [FILE]`

describe the command here

```
USAGE
  $ cmd-a hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ cmd-a hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/albovieira/cmd-a/blob/v0.0.0/src/commands/hello.ts)_

## `cmd-a help [COMMAND]`

display help for cmd-a

```
USAGE
  $ cmd-a help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.1.0/src/commands/help.ts)_
<!-- commandsstop -->
