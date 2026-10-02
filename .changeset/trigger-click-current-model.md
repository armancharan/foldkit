---
'@foldkit/ui': patch
---

A click on a Popover, Menu, or Listbox trigger is decided from the Model at the moment the click arrives. A fast click no longer opens the overlay a second time, so a modal overlay takes the scroll lock once and the panel still closes when focus leaves.
