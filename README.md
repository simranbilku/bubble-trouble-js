# Bubble Trouble Game

## Overview

A stickman stands at the bottom of the screen. Bubbles fall from the top. If one lands on the stickman, the game ends. The player can move left and right using left and right buttons on screen for mobile, or left and right arrow keys for desktop. When the stickman is underneath a bubble, the player can shoot a laser upward by pressing the shoot button or by pressing space. If the laser hits a bubble, it splits into two smaller bubbles that bounce away. The player keeps splitting bubbles to score points. The game ends when a bubble touches the stickman, or all bubbles are cleared (win).

## HTML

- [ ] Set up a <canvas> element
- [ ] Viewport meta tag
- [ ] Shoot button
- [ ] Left movement button
- [ ] Right movement button
- [ ] Restart button
- [ ] Bubble Trouble Title

## CSS

- [ ] Dark background
- [ ] Centered canvas
- [ ] Buttons positioned at the bottom of screen
- [ ] Button Styling
- [ ] White Text

## JS Logic

- [ ] Render canvas
  - [ ] Adjust canvas to window size
- [ ] Set up Game Loop
  - [ ] Create player object with x, y, width and height
  - [ ] Draw a rectangle on canvas
    - [ ] Later, change to stickman drawn with circle and lines.
  - [ ] Player object moves left and right within canvas bounds using left/right button or left/right keyboard arrow keys
  - [ ] Create an array of bubble objects. Each has x, y, radius and an x/y speed
    - [ ] Bubbles start at the top at a random x position
    - [ ] Bubbles move downwards each frame
    - [ ] Bubble objects bounce off the left and right walls, and off the floor (reverse y direction)
    - [ ] Starts with one large bubble
  - [ ] When shoot button/space is pressed, create a laser at player's x position that travels upwards
    - [ ] Remove laser when it hits the top
    - [ ] Player can only have one laser at a time
  - [ ] Each frame, check if the laser overlaps any bubble circle
    - [ ] If it does, remove that bubble and replace it with two smaller bubbles bouncing in opposite directions
    - [ ] Add a point
    - [ ] Set minimum bubble size (small)
      - [ ] When a bubble below that size is hit, the bubble disappears
      - [ ] Large bubble -> hits laser -> two mediums
      - [ ] Medium bubble -> hits laser -> two smalls
      - [ ] Small bubble -> hits laser -> gone
  - [ ] Check if any bubble's circle overlaps the player's rectangle.
    - [ ] If so, display "Game over!" text
    - [ ] Player movement is stopped
    - [ ] Player shooting is stopped
    - [ ] Bubbles no longer fall
  - [ ] Display the score as text on the canvas each frame
  - [ ] If the bubbles array is empty, the player has cleared the screen
    - [ ] Display "You Won!" text
    - [ ] Player movement is stopped
    - [ ] Player shooting is stopped
    - [ ] Bubbles no longer fall
  - [ ] Restart button resets all variables and starts the loop again
