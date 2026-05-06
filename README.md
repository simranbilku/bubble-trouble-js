# Bubble Trouble Game

## Overview

A stickman stands at the bottom of the screen. Bubbles fall from the top. If one lands on the stickman, the game ends. The player can move left and right using left and right buttons on screen for mobile, or left and right arrow keys for desktop. When the stickman is underneath a bubble, the player can shoot a laser upward by pressing the shoot button or by pressing space. If the laser hits a bubble, it splits into two smaller bubbles that bounce away. The player keeps splitting bubbles to score points. The game ends when a bubble touches the stickman, or all bubbles are cleared (win).

## HTML

- [x] Set up a canvas element
- [x] Viewport meta tag
- [x] Shoot button
- [x] Left movement button
- [x] Right movement button
- [x] Restart button
- [x] Start Button
- [x] Bubble Trouble Title

## CSS

- [ ] Dark background
- [ ] Centered canvas
- [ ] Buttons positioned at the bottom of screen
- [ ] Button Styling
- [ ] White Text

## JS Logic

- [x] Render canvas
  - [x] Adjust canvas to window size
- [x] Set up Game Loop
  - [x] Create player object with x, y, width and height
  - [x] Draw a rectangle on canvas
    - [ ] Later, change to stickman drawn with circle and lines.
  - [x] Player object moves left and right within canvas bounds using left/right button or left/right keyboard arrow keys
  - [x] Create an array of bubble objects. Each has x, y, radius and an x/y speed
    - [x] Bubbles start at the top at a random x position
    - [x] Bubbles move downwards each frame
    - [x] Bubble objects bounce off the left and right walls, and off the floor (reverse y direction)
    - [x] Starts with one large bubble
  - [x] When shoot button/space is pressed, create a laser at player's x position that travels upwards
    - [x] Remove laser when space is released
    - [x] Player can only have one laser at a time
  - [x] Each frame, check if the laser overlaps any bubble circle
    - [x] If it does, remove that bubble and replace it with two smaller bubbles bouncing in opposite directions
    - [x] Add a point
    - [x] Set minimum bubble size (small)
      - [x] When a bubble below that size is hit, the bubble disappears
      - [x] Large bubble -> hits laser -> two mediums
      - [x] Medium bubble -> hits laser -> two smalls
      - [x] Small bubble -> hits laser -> gone
  - [x] Check if any bubble's circle overlaps the player's rectangle.
    - [x] If so, display "Game over!" text
    - [x] Player movement is stopped
    - [x] Player shooting is stopped
    - [x] Bubbles no longer fall
  - [x] Display the score as text on the canvas each frame
  - [x] If the bubbles array is empty, the player has cleared the screen
    - [x] Display "You Won!" text
    - [x] Player movement is stopped
    - [x] Player shooting is stopped
    - [x] Bubbles no longer fall
  - [x] Restart button resets all variables and starts the loop again
  - [x] Start button begins gameloop
