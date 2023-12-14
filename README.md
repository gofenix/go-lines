# go-lines

<a href="https://marketplace.visualstudio.com/items?itemName=gofenix.go-lines" target="__blank"><img src="https://img.shields.io/visual-studio-marketplace/v/gofenix.go-lines.svg?color=eee&amp;label=VS%20Code%20Marketplace&logo=visual-studio-code" alt="Visual Studio Marketplace Version" /></a>

Go-lines is a golang formatter that shortens long lines, in addition to all of the formatting fixes done by gofmt.

## Why Format your code?

Everyone loves clean readable and beautifully organized code using tabs/spaces (whatever you like), short lines etc. As a developer, while writing code, you should not spend time counting the tabs/spaces, instead let the tools handle your code formatting for you and that too automatically.

The standard golang formatting tools (gofmt, goimports, etc.) are great, but deliberately don't shorten long lines; instead, this is an activity left to developers.

While there are different tastes when it comes to line lengths in go, we've generally found that very long lines are more difficult to read than their shortened alternatives. As an example:

```go
myMap := map[string]string{"first key": "first value", "second key": "second value", "third key": "third value", "fourth key": "fourth value", "fifth key": "fifth value"}
```

vs.

```go
myMap := map[string]string{
	"first key": "first value",
	"second key": "second value",
	"third key": "third value",
	"fourth key": "fourth value",
	"fifth key": "fifth value",
}
```

Thanks [golines](https://arc.net/l/quote/mmvldnly), we built a vscode extension to solve this problem.


## Usage

First, install the tool. If you're using golang 1.18 or newer, run:

```
go install github.com/segmentio/golines@latest
```

Then, install this extension in Visual Studio Code:

1. Open the Extensions view by clicking on the extensions icon in the sidebar or by navigating to View > Extensions.
2. Search for "go-lines" in the search box.
3. Click the Install button.
4. Click the Reload button.

## Q&A

1. **How to use this extension?**

   This extension is designed to be used with the go tooling in Visual Studio Code. It will automatically format your code when you save a file.

2. **How many width can I format at once?**

	150 characters is the default limit, but you can change it in the settings.

## License

[MIT](./LICENSE) License © 2023 [Fenix](https://github.com/gofenix)
