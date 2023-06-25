# kbmsmash

Rendering:
- 480x480
- Draw one character (start at center, move based character pos)
- Draw a grid?
- Draw bombs
- Timer

Game logic:
- character position based on mouse movement
- keyboard keypresses mapped to bomb positions
- game loop (handling ticks, deciding when bombs explode and handling character velocity)

Event handling:
- Build an input object.
- keyboard keypresses -> update state
- mouse movement -> update state

## start

```
cd src && python -m http.server
```
