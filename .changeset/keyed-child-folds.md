---
'foldkit': minor
---

`Update.foldChildAt` folds one child in a collection by key. `readAt` returning `None` leaves the parent unchanged. For child OutMessages, `foldOutMessage` takes the key, can use the `FoldContext`, and returns a matcher; `toParentOutMessage` takes the key and returns a forwarding matcher. `Update.reconcileChildren` is a pure array helper that keeps entries whose keys remain, calls `makeEntry` for arriving keys, and drops entries whose keys are no longer present. Fold a child's `init` or `boot` result separately when it returns Commands or an OutMessage.
