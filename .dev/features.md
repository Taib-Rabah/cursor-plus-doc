- Add a command to update `cursorPlus.savedCommands` without using `settings.json`. (very optional)

- Add a command to remember the next command (to re-run using `cursorPlus.last`): `cursorPlus.remember.nextCommand`.

- Add commands to remember and get the cursor position:

```json
{
  "key": "",
  "command": "cursorPlus.runCommands",
  "args": {
    "commands": [
      // delete last character of the prev line and, then back to the start position
      "cursorPlus.remember.cursorPosition",
      "cursorPlus.move.upLineEnd",
      "cursorLeft",
      "cursorPlus.delete.lineEnd",
      "cursorPlus.move.remembered" // go back to where we started
    ]
  }
}
```
