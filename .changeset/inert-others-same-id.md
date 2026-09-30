---
'foldkit': patch
---

Replace an existing `Dom.inertOthers` isolation when the same id is used again. The previous cleanup runs first, so one `Dom.restoreInert` for that id returns the page to its original state. A second call used to drop the first cleanup and leave `inert` and `aria-hidden` on the page after restore.
