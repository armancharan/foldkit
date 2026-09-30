---
'@foldkit/ui': patch
---

Opening a modal Popover, Menu, Listbox, or Combobox that is already open is a no-op. A second open used to take the scroll lock and the inert isolation again, so one close left the page scroll-locked.
