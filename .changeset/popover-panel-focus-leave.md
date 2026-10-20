---
'@foldkit/ui': minor
---

A default Popover stays open when focus moves from the panel into a control inside it, so Tab can reach the panel's controls. The panel closes when focus leaves it, including when focus moves into DevTools. `contentFocus: true` leaves focus and closing behavior to the consumer.

The panel now handles focus leave instead of blur. Replace `Scene.blur(panel)` with `Scene.focusLeave(panel)` in Scene tests.
