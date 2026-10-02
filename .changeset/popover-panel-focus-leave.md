---
'@foldkit/ui': patch
---

A default Popover stays open when focus moves from the panel into a control inside it. Tab can reach that control. The panel still closes when focus leaves it. `contentFocus: true` is unchanged: the panel is not focusable and does not close when focus leaves.
