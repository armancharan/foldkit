---
foldkit: patch
---

A click on an SVG link goes through `onUrlRequest` the same way an HTML link does. A chart bar or a map region no longer loads a new document, and the click listener no longer throws when that link's `href` is not a string.
