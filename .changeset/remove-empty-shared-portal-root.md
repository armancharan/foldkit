---
'@foldkit/ui': patch
---

A modal Popover, Menu, Listbox, or Combobox stays usable on the second open. Closing the overlay removes the shared `foldkit-portal-root` once it is empty, the same way a dialog portal root is already removed. Before, that empty root stayed in the page, the next open marked it inert, and the panel was portaled into it, so focus, clicks, and assistive technology could not reach it.
